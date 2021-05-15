import Vue from 'vue'
import {createStore} from '@/store/store.ts'
import Vuex from "vuex";
import Component from "vue-class-component";
import Login from '@/components/login/Login.vue'
import TopPanel from "@/components/topMenu/topPanel/TopPanel.vue";
import {ComboboxModel, State, UserInfoModel} from "@/store/model.ts";
import {Provide} from "vue-property-decorator";
import {FastWebApi} from "@/components/api/fastWebApi.ts"
import WorkPlace from "@/components/workPlace/WorkPlace.vue";
import ModalMask from "@/components/modal/mask/ModalMask.vue";
// @ts-ignore
import SockJS from "sockjs-client";
import Stomp, {Client} from "webstomp-client";
import {EmptyCombobox} from "@/components/selectBoxFilter/selectBoxFilter";

Vue.use(Vuex)
@Component({
    components: {
        ModalMask,
        Login,
        TopPanel,
        WorkPlace
    },
    store:createStore()
})
export default class App extends Vue {
    @Provide('state') mainState: State = this.state;
    @Provide('api') mainApi: FastWebApi = new FastWebApi("accessToken",'http://localhost:8080',this.$store);
    private sock : SockJS = new SockJS('http://localhost:8080/fast-web-websocket');
    @Provide('socket') socket : Client = Stomp.over(this.sock);
    private item1 : string = '';
    private item2 : string = '';

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
            })
            window.history.replaceState({}, document.title, "http://localhost:8081/");
        }
        this.socket.connect({},frame => {
            console.log('Connected: ' + frame);
            this.socket.subscribe('/message/test',message => {
                this.item2=JSON.parse(message.body).name
            });
        })

    }

    public send(){
        //https://www.baeldung.com/websockets-spring
        //https://www.baeldung.com/spring-security-websockets
        //https://www.baeldung.com/spring-websockets-send-message-to-user
        const emptyCombobox = new EmptyCombobox();
        emptyCombobox.name = this.item1;
        this.socket.send('/b2b/socket/test',JSON.stringify(emptyCombobox));
    }

    set api( api : FastWebApi) {
        this.mainApi = api;
    }

    get api() : FastWebApi {
        return this.mainApi
    }

    get state() : State {
        return this.$store.state
    }

    get isAuthorized() : boolean {
        return this.state.loginModel.accessToken!=null;
    }

}