import Vuex, {Store} from "vuex";
import {ComboboxModel, LoginInfoModel, State, UserInfoModel} from "@/store/model";

function emptytLoginInfoModel() : LoginInfoModel{
    return {
        accessToken : null,
        currentUser : null
    }
}

class AppState implements State{
    loginModel: LoginInfoModel;
    currentMenuItem : ComboboxModel | null;
    constructor() {
        this.loginModel = emptytLoginInfoModel();
        this.currentMenuItem = null;
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
                state.currentMenuItem = value;
                console.log("Set currentMenuItem : "+value.name )
            }
        }
    });
    return storeApp;
}