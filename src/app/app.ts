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


Vue.use(Vuex)
@Component({
    components: {
        Login,
        TopPanel,
        WorkPlace
    },
    store:createStore()
})
export default class App extends Vue {
    created(){
        const params :string = window.location.search
        const number :number = params.indexOf("?accessToken=");
        if (number > -1) {
            const accessToken = params.substring(params.indexOf("=") + 1);
            this.$store.commit('login',accessToken);
            this.api = new FastWebApi(accessToken,'http://localhost:8080');
            const userPromise = this.api.getApi<UserInfoModel>('/user/me');
            userPromise.then((user:UserInfoModel)=> {
                this.$store.commit('setCurrentUser',user);
            })
            window.history.replaceState({}, document.title, "http://localhost:8081/");
        }
    }

    apiMain:FastWebApi|null = null;

    set api(api:FastWebApi|null){
        this.apiMain = api;
    }

    get api():FastWebApi|null{
        return this.apiMain
    }

    get state():State{
        return this.$store.state
    }

    get isAuthorized():boolean{
        return this.state.loginModel.accessToken!=null;
    }

    @Provide('state') private mainState: State = this.state;
    @Provide('api') private mainApi: FastWebApi|null = this.api;

}