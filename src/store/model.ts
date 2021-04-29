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