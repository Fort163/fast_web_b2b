import Vue from 'vue'
import {createStore} from '@/store/store.ts'
import Vuex from "vuex";
import Component from "vue-class-component";
import Login from '@/components/login/Login.vue'
import TopPanel from "@/components/topMenu/topPanel/TopPanel.vue";
import {State, UserInfoModel} from "@/store/model.ts";
import {Provide} from "vue-property-decorator";
import {FastWebApi} from "@/components/api/fastWebApi.ts"
import WorkPlace from "@/components/workPlace/WorkPlace.vue";
import ModalMask from "@/components/modal/mask/ModalMask.vue";
import {FastWebWS} from "@/components/api/ws/fastWebWS.ts";
import BottomMenu from "@/components/bottomMenu/BottomMenu.vue";

Vue.use(Vuex)
@Component({
    components: {
        ModalMask,
        Login,
        TopPanel,
        WorkPlace,
        BottomMenu
    },
    store:createStore()
})
export default class App extends Vue {
    @Provide('state') mainState: State = this.state;
    @Provide('isProd') isProd : boolean = false;
    @Provide('api') mainApi: FastWebApi = new FastWebApi("accessToken",this.isProd,this.$store);
    @Provide('socket') mainSocket: FastWebWS = new FastWebWS("accessToken",this.isProd,this.$store);

    mounted(){
        navigator.geolocation.getCurrentPosition((pos : GeolocationPosition) => {
            this.$store.commit('setCoords',pos.coords);
        }, err => {
            console.error("Position user not set");
        })
        const params :string = window.location.search
        const number :number = params.indexOf("?accessToken=");
        if (number > -1) {
            const accessToken = params.substring(params.indexOf("=") + 1);
            this.$store.commit('login',accessToken);
            this.api.accessToken = accessToken;
            const userPromise = this.api.getApi<UserInfoModel>('/user/me');
            userPromise.then((user:UserInfoModel)=> {
                this.$store.commit('setCurrentUser',user);
            });
            this.socket.accessToken = accessToken;
            this.socket.connect();
            if(this.isProd){
                window.history.replaceState({}, document.title, "https://quick-peter-b2c.ru/");
            }
            else {
                window.history.replaceState({}, document.title, "http://localhost:8081/");
            }

        }
    }

    set api( api : FastWebApi) {
        this.mainApi = api;
    }

    get api() : FastWebApi {
        return this.mainApi
    }

    set socket( api : FastWebWS) {
        this.mainSocket = api;
    }

    get socket() : FastWebWS {
        return this.mainSocket
    }

    get state() : State {
        return this.$store.state
    }

    get isAuthorized() : boolean {
        return this.state.loginModel.accessToken!=null;
    }

}