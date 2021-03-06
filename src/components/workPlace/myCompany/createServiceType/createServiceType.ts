import Component from "vue-class-component";
import Vue from "vue";
import TableCustom from "@/components/table/TableCustom.vue";
import {Inject} from "vue-property-decorator";
import {FastWebApi} from "@/components/api/fastWebApi";
import {
    ColumnTypes, ComboboxModel,
    DefaultTableColumnItem,
    DefaultTableSettings, Handler, ListWhitLong, ModalWindow, ScheduleModel,
    ServiceTypeModel, SimpleValue,
    State,
    TableColumnItem, TableData, TableSettings
} from "@/store/model";
import {Store} from "vuex";


class ServiceTypeColumnItem extends DefaultTableColumnItem{
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

class ServiceTypeTable extends DefaultTableSettings{
    columns: TableColumnItem[];
    data: TableData[];
    saveFunc : Handler<undefined, undefined, void>;
    constructor(columns: TableColumnItem[],data: any[],save: Handler<undefined, undefined, void> ) {
        super();
        this.columns = columns;
        this.data = data;
        this.saveFunc = save;
        super.deleteButton = false;
    }
}

class ServiceTypeSave extends Handler<undefined, undefined, void>{
    private api: FastWebApi;
    private settings : TableSettings;
    private store : Store<State>;
    constructor(api: FastWebApi,settings : TableSettings,store : Store<any>) {
        super();
        this.api = api;
        this.settings = settings;
        this.store = store;
    }
    function(): void {
        const data = new ListWhitLong(this.settings.data,this.store.getters.company?.id);
        const result : Promise<boolean> = this.api.postApi<boolean>("/company/create/serviceType",data);
        result.then(res =>{
            if(res) {
                this.store.commit('setModalWindow', new class implements ModalWindow {
                    message: string | null = '???????? ?????????? ?????????????? ??????????????????';
                    show : boolean = true;
                });
            }
            else{
                this.store.commit('setModalWindow', new class implements ModalWindow {
                    message: string | null = '?????????????????? ????????????';
                    show : boolean = true;
                });
            }
        })
    }
}

@Component({
    components: {
        TableCustom
    }
})
export default class CreateServiceType extends Vue {
    @Inject('api') api: FastWebApi | undefined;
    @Inject('state') state: State | undefined;

    private serviceTypeData : Array<ServiceTypeModel> = new Array<ServiceTypeModel>();
    private columns : Array<TableColumnItem> = new Array<TableColumnItem>();
    // @ts-ignore
    private saveHandler : ServiceTypeSave = new ServiceTypeSave(this.api,this.settings,this.$store);

    mounted(){
        this.initColumn();
        const simpleValue = new SimpleValue();
        simpleValue.valueLong = this.$store.getters.company?.id;
        const serviceTypes : Promise<Array<ServiceTypeModel>> = <Promise<Array<ServiceTypeModel>>>this.api?.postApi<Array<ServiceTypeModel>>("/company/get/serviceType",simpleValue);
        serviceTypes.then((items:Array<ServiceTypeModel>)=> {
            items.forEach(item =>{
                this.serviceTypeData.push(item);
            })
        });
    }

    get settings() : TableSettings{
        return new ServiceTypeTable(this.columns,this.serviceTypeData,this.saveHandler);
    }

    private initColumn() : void{
        const name = new ServiceTypeColumnItem("name","????????????????",true,ColumnTypes.text,'50%' );
        name.errorMessage = '???????????????? ?????????????????????? ?????? ????????????????????';
        const workClock = new ServiceTypeColumnItem("workClock","?????????? ???? ????????????",true,ColumnTypes.time,'25%' );
        workClock.errorMessage = '?????????????? ?????????? ?????????????? ???????????????? ?????? ????????????';
        workClock.restriction = new class extends Handler<any, TableData, boolean> {
            function(val: any,dataItem : ServiceTypeModel): boolean {
                const clock = dataItem.workClock;
                return clock > '00:00';
            }
        }
        const showClient = new ServiceTypeColumnItem("showClient","???????????????????? ??????????????",true,ColumnTypes.checkbox,'25%' );
        this.columns.push(name);
        this.columns.push(workClock);
        this.columns.push(showClient);
    }

}