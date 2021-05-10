import Component from "vue-class-component";
// @ts-ignore
import {loadYmap, yandexMap, ymapMarker} from 'vue-yandex-maps'
import Vue from "vue";
import {Inject} from "vue-property-decorator";
import {
    ColumnTypes,
    ComboboxModel,
    CompanyModel,
    DayOfWeek,
    DefaultSchedule, DefaultTableColumnItem,
    DefaultTableSettings,
    Handler, ModalWindow,
    ScheduleModel,
    State,
    TableColumnItem,
    TableData,
    TableSettings
} from "@/store/model";
import {GeocoderResult, GeocoderResultDefault} from "@/structure/map/ymapsModel";
import {FastWebApi} from "@/components/api/fastWebApi";
import SelectBox from "@/components/selectBox/SelectBox.vue";
import TableCustom from "@/components/table/TableCustom.vue";

class Company implements CompanyModel{
    name : string | null = null;
    activityList : Array<ComboboxModel> | null = new Array<ComboboxModel>();
    schedulesList : Array<ScheduleModel> | null = new Array<ScheduleModel>();
    geoPosition : GeocoderResult | null = null;
    constructor() {}
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
        yandexMap,
        ymapMarker,
        loadYmap,
        SelectBox,
        TableCustom
    }
})
export default class CreateCompany extends Vue {
    @Inject('state') state: State | undefined;
    @Inject('api') api: FastWebApi | undefined;

    private activityData : Array<ComboboxModel> = new Array<ComboboxModel>();
    private currentCompany : CompanyModel = new Company();
    private currentStep : string = "Step_1";
    private scheduleColumn : Array<TableColumnItem> = new Array<TableColumnItem>();

    created(){
        this.initScheduleColumn();
        this.initScheduleData();
        const activities : Promise<Array<ComboboxModel>> = <Promise<Array<ComboboxModel>>>this.api?.getApi<Array<ComboboxModel>>("/admin/get/activity");
        activities.then((items:Array<ComboboxModel>)=> {
            items.forEach(item =>{
                this.activityData.push(item);
            })
        });

    }

    async mounted() {
        // @ts-ignore
        await loadYmap({...settings,debug:true});
    }

    get step() : string{
        return this.currentStep;
    }

    set step(value : string){
        this.currentStep = value;
    }

    get comboData() : Array<ComboboxModel>{
        return this.activityData;
    }

    get company() : CompanyModel{
        return this.currentCompany;
    }

    get companyName() : string | null{
        return this.company.name;
    }

    set companyName(value : string | null){
        this.company.name = value;
    }

    get companyActivity() : Array<ComboboxModel>{
        return <Array<ComboboxModel>>this.company.activityList;
    }

    get companyActivityString() : string{
        let value = ''
        this.company.activityList?.forEach((item ,index)=>{
            value += item.name
            if(index === (<Array<ComboboxModel>>this.company.activityList).length-2){
                value += ' и '
            }
            else{
                if(index !== (<Array<ComboboxModel>>this.company.activityList).length-1){
                    value += ', '
                }
            }
        })
        return value;
    }


    get schedulesList() : Array<ScheduleModel>{
        return <Array<ScheduleModel>>this.company.schedulesList;
    }

    get scheduleTable() : TableSettings {
        return new ScheduleTable(this.scheduleColumn,this.schedulesList);
    }


    get settings(){
        return this.state?.mapInfo.settings;
    }

    get coords(){
        const coords = this.state?.mapInfo.coords;
        if(coords){
            return [coords.latitude,coords.longitude]
        }
        return [37.611106671875,55.749346930602925];
    }

    get companyCoords() : [number,number] | undefined{
        const geocoderResult = this.geocoderResult;
        if(geocoderResult) {
            return [geocoderResult.latitude,geocoderResult.longitude];
        }
        return undefined;
    }

    get address(){
        return this.geocoderResult?.name;
    }


    get geocoderResult(): GeocoderResult | null{
        return this.company.geoPosition;
    }

    set geocoderResult(geocoderResult: GeocoderResult | null){
        this.company.geoPosition = geocoderResult;
    }

    get markerCompany(){
        return {
            layout: 'default#imageWithContent',
            imageSize: [43, 43],
            imageOffset: [-15, -43],
            content: 'Моя компания',
            contentOffset: [0, 45],
            contentLayout: '<div style="background: #1E98FF; width: 65px; color: #000000; font-weight: bold; border-radius: 10px">$[properties.iconContent]</div>'
        }
    }

    public onClick(event: any) {
        ymaps.geocode(event.get('coords')).then(
            (res : any) => {
                this.geocoderResult = new GeocoderResultDefault(res,event.get('coords'));
            },
            (err : any) => {
                alert(err);
            }
        )
    }

    public next() : void{
        const current = this.step;
        const strings = current.split('_');
        const number = Number.parseInt(strings[1])+1;
        this.step = strings[0]+'_'+number;
    }

    public previous() : void{
        const current = this.step;
        const strings = current.split('_');
        const number = Number.parseInt(strings[1])-1;
        this.step = strings[0]+'_'+number;
    }

    public save() : void{
        const flag : Promise<boolean> = <Promise<boolean>>this.api?.postApi<boolean>("/company/create/company",this.company);
        flag.then((item : boolean)=> {
            if(item){
                this.$store.commit('setModalWindow', new class implements ModalWindow {
                    message: string | null = 'Компания успешно сохранена. Зайдите в систему повторно чтобы изменения вступили в силу.';
                    show : boolean = true;
                });
                this.$store.commit('login',null);
                this.$store.commit('setCurrentUser',null);
            }
        });
    }

    public isDisabled(step : string) : boolean{
        if(step === 'Step_1'){
            if(this.companyActivity.length > 0 && this.company.name){
                return false;
            }
        }
        if(step === 'Step_2'){
            if(this.company.schedulesList){
                let flag = true;
                this.schedulesList.forEach(item => {
                    if(item.work && this.checkClock(item.clockFrom,item.clockTo)){
                        flag = false;
                    }
                })
                return flag;
            }
        }
        if(step === 'Step_3'){
            if(this.geocoderResult){
                return false;
            }
        }
        return true;
    }

    initScheduleData(){
        this.schedulesList.push(new DefaultSchedule(DayOfWeek.monday))
        this.schedulesList.push(new DefaultSchedule(DayOfWeek.tuesday))
        this.schedulesList.push(new DefaultSchedule(DayOfWeek.wednesday))
        this.schedulesList.push(new DefaultSchedule(DayOfWeek.thursday))
        this.schedulesList.push(new DefaultSchedule(DayOfWeek.friday))
        this.schedulesList.push(new DefaultSchedule(DayOfWeek.saturday))
        this.schedulesList.push(new DefaultSchedule(DayOfWeek.sunday))
    }

    private initScheduleColumn() : void{
        const dayOfWeek = new ScheduleColumnItem("dayOfWeek","День",true,ColumnTypes.noEditable,'25%' );
        const clockFrom = new ScheduleColumnItem("clockFrom","С",true,ColumnTypes.time,'10%' );
        clockFrom.restriction = new class extends Handler<any, TableData, boolean> {
            function(val: any,dataItem : ScheduleModel): boolean {
                const clockFrom = val;
                const clockTo = dataItem.clockTo;
                if(!clockFrom){
                    return false;
                }
                return clockFrom < clockTo;
            }
        }
        clockFrom.errorMessage = 'Неверный диапазон времени'
        const clockTo = new ScheduleColumnItem("clockTo","По",true,ColumnTypes.time,'10%' );
        clockTo.restriction = new class extends Handler<any, TableData, boolean> {
            function(val: any,dataItem : ScheduleModel): boolean {
                const clockFrom = dataItem.clockFrom;
                const clockTo = val;
                if(!clockTo){
                    return false;
                }
                return clockFrom < clockTo;
            }
        }
        clockTo.errorMessage = 'Неверный диапазон времени'
        const work = new ScheduleColumnItem("work","Рабочий день",true,ColumnTypes.checkbox,'15%' );
        this.scheduleColumn.push(dayOfWeek,clockFrom,clockTo,work);
    }

    checkClock(from : string,to : string):boolean{
        if(!from && !to){
            return false;
        }
        return from < to;
    }

}