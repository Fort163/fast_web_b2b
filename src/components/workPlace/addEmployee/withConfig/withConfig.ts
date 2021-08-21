import Component from "vue-class-component";
import Vue from "vue";
import {
    ClaimCompanyRequestModel, ColumnTypes,
    ComboboxModel,
    CompanyModel, DayOfWeek, DefaultTableColumnItem, DefaultTableSettings, DtoWhitLong,
    EmployeeModel,
    Handler, MapDto,
    ModalWindow,
    ScheduleModel, ServiceModel, ServiceTypeModel, SimpleValue,
    State, TableColumnItem, TableData, TableSettings,
    TransientValue
} from "@/store/model";
import {FastWebApi} from "@/components/api/fastWebApi";
import {Store} from "vuex";
import {Inject, Prop} from "vue-property-decorator";
import ButtonFooter from "@/components/buttonFooter/ButtonFooter.vue";
import SelectBox from "@/components/selectBox/SelectBox.vue";
import TableCustom from "@/components/table/TableCustom.vue";
import {GeocoderResult} from "@/structure/map/ymapsModel";
import {FastWebWS} from "@/components/api/ws/fastWebWS";
import {Client} from "webstomp-client";

class Employee implements EmployeeModel{
    id : number | null = null;
    name : string | null = null;
    serviceList: Array<ServiceModel> | null = null;
    showClient: boolean = true;
    company: CompanyModel | null = null;
    vacationFrom: string | null = null;
    vacationTo: string | null = null;
    schedulesList : Array<ScheduleModel> = new Array<ScheduleModel>();
    serviceTypeList : Array<ServiceTypeModel> = new Array<ServiceTypeModel>();
    constructor() {}
}

class Schedule implements ScheduleModel{
    id : number | null = null;
    dayOfWeek : string;
    clockFrom : string;
    clockTo : string;
    clockCompanyFrom : string;
    clockCompanyTo : string;
    work : boolean = true;
    constructor(model : ScheduleModel) {
        // @ts-ignore
        this.dayOfWeek  = (<string>DayOfWeek[model.dayOfWeek]).toString()
        this.clockFrom = model.clockFrom
        this.clockTo = model.clockTo
        this.clockCompanyFrom = model.clockFrom
        this.clockCompanyTo = model.clockTo
    }
}

class SaveEmployee extends Handler<undefined, undefined, void> {
    private api: FastWebApi;
    private store: Store<State>;
    private employee : EmployeeModel;
    private socketMain: FastWebWS | undefined;
    private requestId : Number | undefined;
    constructor(api: FastWebApi,socketMain: FastWebWS | undefined,store: Store<State>,employee : EmployeeModel,requestId : Number | undefined) {
        super();
        this.api = api;
        this.store = store;
        this.employee = employee;
        this.requestId = requestId;
        this.socketMain = socketMain;
    }
    function(val1: undefined, val2: undefined): void {
        const data = new DtoWhitLong(this.employee,<number>this.requestId);
        const flag : Promise<Number> = <Promise<Number>>this.api?.postApi<Number>("/company/create/employee/noConfig",data);
        flag.then((item : Number)=> {
            if(item){
                const simpleValue = new SimpleValue();
                simpleValue.valueLong = item.valueOf();
                this.socket?.send('/b2b/socket/addEmployee',JSON.stringify(simpleValue));
                this.store.commit('setModalWindow', new class implements ModalWindow {
                    message: string | null = 'Информация о сотруднике успешно сохранена';
                    show : boolean = true;
                });
                this.store.commit('setCurrentMenuItem',null);
            }
            else{
                this.store.commit('setModalWindow', new class implements ModalWindow {
                    message: string | null = 'Произошла ошибка';
                    show : boolean = true;
                });
            }
        });
    }

    get socket() : Client | null | undefined {
        return this.socketMain?.socket
    }

}

class ScheduleColumnItem extends DefaultTableColumnItem{
    itemName: String;
    title: String;
    mandatory: boolean;
    constructor(itemName : String,title : String,mandatory: boolean,type : ColumnTypes,width : String) {
        super();
        this.itemName = itemName;
        this.title = title;
        this.mandatory = mandatory;
        super.itemType = type;
        super.width = width;
    }
}

class DisableStep extends Handler<string, undefined, boolean> {
    private employee : EmployeeModel = new Employee();
    constructor(employee : EmployeeModel) {
        super();
        this.employee = employee;
    }
    function(value: String | undefined, val2: undefined): boolean {
        const step = value?.toString();
        if(step === 'Step_1'){
            if((<Array<ComboboxModel>>this.employee.serviceTypeList).length > 0 && this.employee.name){
                return false;
            }
        }
        if(step === 'Step_2'){
            let flag = false;
            (<Array<Schedule>>this.employee.schedulesList).forEach(item => {
                if(!this.checkFrom(item.clockFrom,item.clockCompanyFrom) ||
                    !this.checkTo(item.clockTo,item.clockCompanyTo)){
                    flag = true;
                }
            })
            return flag;
        }
        if(step === 'Step_3'){
            return false;
        }
        return true;
    }
    checkFrom(from : string,fromCompany : string):boolean{
        return from >= fromCompany
    }
    checkTo(to : string,toCompany : string):boolean{
        return to <= toCompany
    }
}

class ScheduleTable extends DefaultTableSettings{
    columns: Array<TableColumnItem>;
    data: Array<ScheduleModel>;
    saveFunc : undefined;
    constructor(columns: Array<TableColumnItem>,data: Array<ScheduleModel>) {
        super();
        this.columns = columns;
        this.data = data;
        this.saveFunc = undefined;
        super.deleteButton = false;
        super.addButton = false;
        super.saveButton = false;
    }
}

@Component({
    components: {
        ButtonFooter,
        SelectBox,
        TableCustom
    }
})
export default class WithConfig extends Vue {
    @Inject('state') state: State | undefined;
    @Inject('api') api: FastWebApi | undefined;
    @Inject('socket') socketMain: FastWebWS | undefined;
    @Prop() selectRequest : ClaimCompanyRequestModel | undefined;

    public currentStep : TransientValue<string> = new TransientValue<string>("Step_1");
    private currentEmployee : EmployeeModel = new Employee();
    private serviceTypeData : Array<ComboboxModel> = new Array<ComboboxModel>();
    private scheduleColumn : Array<ScheduleColumnItem> = new Array<ScheduleColumnItem>();

    created(){
        this.initScheduleColumn();
        const simpleValue = new SimpleValue();
        simpleValue.valueLong = this.$store.getters.company?.id;
        const serviceTypes : Promise<Array<ServiceTypeModel>> = <Promise<Array<ServiceTypeModel>>>this.api?.postApi<Array<ServiceTypeModel>>("/company/get/serviceType",simpleValue);
        const schedules : Promise<Array<ScheduleModel>> = <Promise<Array<ScheduleModel>>>this.api?.postApi<Array<ScheduleModel>>("/company/get/schedule/byCompany",simpleValue);
        serviceTypes.then((items:Array<ComboboxModel>)=> {
            items.forEach(item =>{
                this.serviceTypeData.push(item);
            })
        });
        schedules.then((items:Array<ScheduleModel>)=> {
            items.forEach(item =>{
                this.schedulesList.push(new Schedule(item));
            })
        });

    }

    get employee() : EmployeeModel{
        return this.currentEmployee;
    }

    get employeeName() : string | null{
        return this.employee.name;
    }

    set employeeName(value : string | null){
        this.employee.name = value;
    }

    get serviceTypeString() : string{
        let value = ''
        this.employee.serviceTypeList?.forEach((item ,index)=>{
            value += item.name
            if(index === (<Array<ComboboxModel>>this.employee.serviceTypeList).length-2){
                value += ' и '
            }
            else{
                if(index !== (<Array<ComboboxModel>>this.employee.serviceTypeList).length-1){
                    value += ', '
                }
            }
        })
        return value;
    }

    get comboData() : Array<ComboboxModel>{
        return this.serviceTypeData;
    }

    get employeeServiceType() : Array<ComboboxModel>{
        return <Array<ComboboxModel>>this.employee.serviceTypeList;
    }

    get requestName() : String | undefined{
        return this.selectRequest?.user.fullName;
    }

    get step() : string{
        return this.currentStep.value;
    }

    public save() : Handler<undefined, undefined, void>{
        return new SaveEmployee(<FastWebApi>this.api,this.socketMain,this.$store,this.employee,this.selectRequest?.id);
    }

    public isDisabled() : Handler<string, undefined, boolean>{
        return new DisableStep(this.employee);
    }

    get schedulesList() : Array<Schedule>{
        return <Array<Schedule>>this.employee.schedulesList;
    }

    get scheduleTable() : TableSettings {
        return new ScheduleTable(this.scheduleColumn,this.schedulesList);
    }

    private initScheduleColumn() : void{
        const dayOfWeek = new ScheduleColumnItem("dayOfWeek","День",true,ColumnTypes.noEditable,'25%' );
        const clockFrom = new ScheduleColumnItem("clockFrom","С",true,ColumnTypes.time,'10%' );
        clockFrom.restriction = new class extends Handler<any, TableData, boolean> {
            function(val: any,dataItem : Schedule): boolean {
                return dataItem.clockFrom >= dataItem.clockCompanyFrom;
            }
        }
        clockFrom.errorMessage = 'Компания не работает в это время'
        const clockTo = new ScheduleColumnItem("clockTo","По",true,ColumnTypes.time,'10%' );
        clockTo.restriction = new class extends Handler<any, TableData, boolean> {
            function(val: any,dataItem : Schedule): boolean {
                return dataItem.clockTo <= dataItem.clockCompanyTo;
            }
        }
        clockTo.errorMessage = 'Компания не работает в это время'
        const work = new ScheduleColumnItem("work","Рабочий день",true,ColumnTypes.checkbox,'15%' );
        this.scheduleColumn.push(dayOfWeek,clockFrom,clockTo,work);
    }

}