import {ComboboxTopMenu} from "@/components/topMenu/topMenu/topMenuMapHelper";
import {GeocoderResult} from "@/structure/map/ymapsModel";

export interface State{
    loginModel : LoginInfoModel,
    mapInfo : MapInfo,
    currentMenuItem: ComboboxTopMenu | null,
    mask : MaskModel
}

export interface LoginInfoModel{
    accessToken: string | null,
    currentUser: UserInfoModel | null
}

export interface MaskModel {
    modalWindow : ModalWindow | null
    loadMask : LoadMask | null
}

export interface LoadMask{
    show: boolean
}

export interface ModalWindow{
    message: string | null,
    show: boolean
}

export interface UserInfoModel{
    id: Number,
    fullName: String,
    firstName: String,
    lastName: String,
    userpic: String,
    email: String,
    locale: String,
    login: String,
    gender: String,
    phoneNumber: String,
    birthDay:DateModel,
    lastVisit:DateTimeModel,
    verified: Boolean,
    status: String,
    provider: String,
    roleList: Array<Role>
}

export interface Role{
    id: Number,
    name: String,
    permissionList: Array<PermissionModel> | Array<ComboboxModel>
}

export interface PermissionModel{
    id: Number,
    permission: String
    displayName: String
    admin:boolean,
    company:boolean,
    service:boolean,
    other:boolean
}

export interface MapInfo{
    settings : MapSettings,
    coords : GeolocationCoordinates | null
}

export interface MapSettings{
    apiKey: string,
    lang: string,
    coordorder: string,
    version: string
}

export interface DateModel{
    date: String,
    day: String
}

export interface DateTimeModel extends DateModel{
    time: String
}

export interface ComboboxModel{
    id: Number,
    name: String
}

export interface SelectBoxModel{
    item : Array<ComboboxModel>;
    currentItem : Array<ComboboxModel>;
}


export abstract class DefaultSelectBox implements SelectBoxModel{
    item : Array<ComboboxModel>;
    constructor(item : Array<ComboboxModel>) {
        this.item = item
    }
    currentItem : Array<ComboboxModel> = new Array<ComboboxModel>();
}

export interface TableData extends Object{
    id: Number | null;
}

export interface TableSettings {
    columns: TableColumnItem[],
    data: TableData[],
    paging : boolean,
    pagingSize : number,
    deleteButton : boolean,
    saveButton : boolean,
    addButton : boolean,
    saveFunc : Handler<undefined, undefined, void> | undefined,
    selectFunc : Handler<any, undefined, void> | undefined,
    deleteFunc : Handler<undefined, undefined, void> | undefined
}

export abstract class DefaultTableSettings implements TableSettings{
    deleteButton = true;
    saveButton = true;
    addButton = true;
    paging = false;
    pagingSize = 10;
    selectFunc = undefined;
    deleteFunc = undefined;
    abstract columns: TableColumnItem[];
    abstract data: Array<any>;
    abstract saveFunc: Handler<undefined, undefined, void> | undefined;

}

export abstract class Handler<F,S,R> {
    abstract function(val1?:F, val2?:S): R;
}

export abstract class DefaultTableColumnItem implements TableColumnItem{
    itemType : ColumnTypes = ColumnTypes.text;
    width : String | undefined =  undefined;
    restriction : Handler<any, TableData, boolean> | undefined = undefined;
    errorMessage: String | undefined = undefined;
    comboData: Array<ComboboxModel> | undefined = undefined;
    abstract mandatory : boolean;
    abstract itemName: String;
    abstract title: String;
}

export interface TableColumnItem {
    title: String,
    itemName: String,
    itemType: ColumnTypes,
    mandatory: boolean,
    errorMessage: String | undefined,
    restriction: Handler<any, TableData, boolean> | undefined,
    width: String | undefined,
    comboData: Array<ComboboxModel> | undefined,
}

export interface ScheduleModel extends TableData{
    dayOfWeek : string,
    clockFrom : string,
    clockTo : string,
    work : boolean
}

export class DefaultSchedule implements ScheduleModel{
    id = null
    clockFrom : string = '00:00';
    clockTo : string = '00:00';
    work : boolean = false;
    dayOfWeek: string;
    constructor(dayOfWeek: DayOfWeek) {
        this.dayOfWeek = dayOfWeek.toString();
    }
}

export interface CompanyModel {
    name : string | null
    activityList : Array<ComboboxModel> | null
    schedulesList : Array<ScheduleModel> | null
    geoPosition : GeocoderResult | null
}

export enum ColumnTypes{
    noEditable = "noEditable",
    text = "text",
    textarea = "textarea",
    date = "date",
    time = "time",
    email = "email",
    number = "number",
    checkbox = "checkbox",
    file = "file",
    radio = "radio",
    combo = "combobox"
}

export enum DayOfWeek{
    monday = "Понедельник",
    tuesday = "Вторник",
    wednesday = "Среда",
    thursday = "Четверг",
    friday = "Пятница",
    saturday = "Суббота",
    sunday = "Воскресенье"
}

