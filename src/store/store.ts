import Vuex, {Store} from "vuex";
import {ComboboxModel, LoginInfoModel, State, UserInfoModel} from "@/store/model";

function emptytLoginInfoModel() : LoginInfoModel{
    return {
        accessToken : null,
        currentUser : null,
        currentMenuItem : null
    }
}

class AppState implements State{
    loginModel: LoginInfoModel;
    constructor() {
        this.loginModel = emptytLoginInfoModel();
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
            },
            setCurrentMenuItem (state : State,value : ComboboxModel) {
                state.loginModel.currentMenuItem = value;
                console.log("Set currentMenuItem : "+value.name )
            }
        }
    });
    return storeApp;
}