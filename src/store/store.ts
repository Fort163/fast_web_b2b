import Vuex, {Store} from "vuex";
import {DateModel, DateTimeModel, LoginInfoModel, State, UserInfoModel} from "@/store/model";

function convertLoginInfoModel() : LoginInfoModel{
    return {
        accessToken : '',
        currentUser : convertUserInfoModel()
    }
}

function convertUserInfoModel() : UserInfoModel{
    return {
        id: 0,
        fullName: '',
        firstName: '',
        lastName: '',
        userpic: '',
        email: '',
        locale: '',
        login: '',
        gender: '',
        phoneNumber: '',
        birthDay:convertDateModel(),
        lastVisit:convertDateTimeModel(),
        verified: false,
        status: '',
        provider: ''
    }
}
function convertDateModel() : DateModel{
    return {
        date:'',
        day:''
    }
}

function convertDateTimeModel() : DateTimeModel{
    return {
        date:'',
        day:'',
        time:''
    }
}

class AppState implements State{
    loginModel: LoginInfoModel;
    constructor() {
        this.loginModel = convertLoginInfoModel();
    }
}

export function createStore() : Store<State>{
    const storeApp = new Vuex.Store({
        state: new AppState(),
        mutations: {
            login (state : State,value : string) {
                state.loginModel.accessToken = value;
                console.log("Set accessToken")
            },
            setCurrentUser (state : State,value : UserInfoModel) {
                state.loginModel.currentUser = value;
                console.log("Set currentUser")
            }
        }
    });
    return storeApp;
}