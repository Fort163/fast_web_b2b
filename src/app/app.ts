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
    //WORK
    /*@Provide('api') mainApi: FastWebApi = new FastWebApi("accessToken",'https://quick-peter-b2b.ru',this.$store);
    @Provide('socket') mainSocket: FastWebWS = new FastWebWS("accessToken",'https://quick-peter-b2b.ru/b2b/fast-web-websocket',this.$store);*/
    //TEST
    @Provide('api') mainApi: FastWebApi = new FastWebApi("accessToken",'http://localhost:8080',this.$store);
    @Provide('socket') mainSocket: FastWebWS = new FastWebWS("accessToken",'http://localhost:8080/b2b/fast-web-websocket',this.$store);

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
            //window.history.replaceState({}, document.title, "https://quick-peter-b2c.ru/");
            window.history.replaceState({}, document.title, "http://localhost:8081/");
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