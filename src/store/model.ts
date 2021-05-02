export interface State{
    loginModel : LoginInfoModel,
    currentMenuItem: ComboboxModel | null

}

export interface LoginInfoModel{
    accessToken: string | null,
    currentUser: UserInfoModel | null
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
    roleList: Role[]
}

export interface Role{
    id: Number,
    name: String,
    permissionList: PermissionModel[]
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

export interface TopMenuModel {
    admin: ComboboxModel[],
    company: ComboboxModel[],
    service: ComboboxModel[],
    other: ComboboxModel[]
}

export interface TableData extends Object{
    id: Number | null;
}

export interface TableSettings {
    columns: TableColumnItem[],
    data: TableData[],
    paging : boolean | false,
    pagingSize : number | 10,
    defaultButtons : boolean | true,
    selectFunc : Function | null,
    deleteFunc : Handler<undefined, undefined, void> | undefined
}

export abstract class DefaultTableSettings implements TableSettings{
    defaultButtons = true;
    paging = false;
    pagingSize = 10;
    selectFunc = null;
    deleteFunc = undefined;
    abstract columns: TableColumnItem[];
    abstract data: any[];

}

export abstract class Handler<F,S,R> {
    abstract function(val1?:F, val2?:S): R;
}

export abstract class DefaultTableColumnItem implements TableColumnItem{
    itemType : ColumnTypes = ColumnTypes.text;
    width : String | undefined =  undefined;
    restriction : Handler<any, undefined, boolean> | undefined = undefined;
    errorMessage: String | undefined = undefined;
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
    restriction: Handler<any, undefined, boolean> | undefined,
    width: String | undefined
}

export enum ColumnTypes{
    text = "text",
    textarea = "textarea",
    date = "date",
    datetime = "datetime",
    email = "email",
    number = "number",
    checkbox = "checkbox",
    file = "file",
    radio = "radio"
}