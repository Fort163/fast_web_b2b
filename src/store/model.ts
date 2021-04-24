
export interface State{
    loginModel : LoginInfoModel
}

export interface LoginInfoModel{
    accessToken: string,
    currentUser: UserInfoModel
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
    provider: String
}

export interface DateModel{
    date: String,
    day: String
}

export interface DateTimeModel extends DateModel{
    time: String
}

export class AppState implements State{
    loginModel: LoginInfoModel;
    constructor() {
        loginModel:{}
    }
}

