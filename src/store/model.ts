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
    deleteFunc : Function | null
}

export abstract class DefaultTableSettings implements TableSettings{
    defaultButtons = true;
    paging = false;
    pagingSize = 10;
    selectFunc = null;
    deleteFunc = null;
    abstract columns: TableColumnItem[];
    abstract data: any[];

}

export abstract class DefaultTableColumnItem implements TableColumnItem{
    itemType : ColumnTypes = ColumnTypes.text;
    width : String | null =  null;
    abstract itemName: String;
    abstract title: String;
}

export interface TableColumnItem {
    title: String,
    itemName: String,
    itemType: ColumnTypes,
    width: String | null
}

export enum ColumnTypes{
    text,
    date,
    datetime,
    email,
    number,
}