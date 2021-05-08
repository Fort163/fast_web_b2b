import Vuex, {Store} from "vuex";
import {ComboboxModel, LoginInfoModel, MapInfo, ModalWindow, State, UserInfoModel} from "@/store/model";
import {ComboboxTopMenu} from "@/components/topMenu/topMenu/topMenuMapHelper";

function emptytLoginInfoModel() : LoginInfoModel{
    return {
        accessToken : null,
        currentUser : null
    }
}

function defaultMapInfo() : MapInfo{
    return {
        settings : {
            apiKey: 'e8f7c134-5dcd-4af9-be0d-f53bce9e8a0a',
            lang: 'ru_RU',
            coordorder: 'latlong',
            version: '2.1'
        },
        coords : null
    }
}

class AppState implements State{
    loginModel: LoginInfoModel;
    mapInfo : MapInfo;
    currentMenuItem : ComboboxTopMenu | null;
    modalWindow : ModalWindow | null;
    constructor() {
        this.loginModel = emptytLoginInfoModel();
        this.currentMenuItem = null;
        this.modalWindow = null;
        this.mapInfo = defaultMapInfo();
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
            setCurrentMenuItem (state : State,value : ComboboxTopMenu) {
                state.currentMenuItem = value;
                console.log("Set currentMenuItem : "+value.name )
            },
            setModalWindow (state : State,value : ModalWindow) {
                state.modalWindow = value;
                console.log("Modal window : " + value.show)
            },
            setCoords(state : State,value : GeolocationCoordinates){
                state.mapInfo.coords = value;
                console.log("Set position")
            }
        }
    });
    return storeApp;
}