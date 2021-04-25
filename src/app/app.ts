import Vue from 'vue'
import {createStore} from '../store/store'
import Vuex from "vuex";
import Component from "vue-class-component";
import Login from '@/components/login/Login.vue'
import FastWebApi from '@/components/api/FastWebApi.vue'
import TopPanel from "@/components/topMenu/topPanel/TopPanel.vue";
import {State, UserInfoModel} from "@/store/model";


Vue.use(Vuex)
@Component({
    components: {
        Login,
        TopPanel,
        FastWebApi
    },
    store:createStore(),
    created() {
        const params :string = window.location.search
        const number :number = params.indexOf("?accessToken=");
        if (number > -1) {
            const accessToken = params.substring(params.indexOf("=") + 1);
            this.$store.commit('login',accessToken);
            const user = FastWebApi.methods.getApi('/user/me');
            this.$store.commit('setCurrentUser',user);
            window.history.replaceState({}, document.title, "http://localhost:8081/");
        }
    }
})
export default class App extends Vue {
    get state():State{
        return this.$store.state
    }

    get isAuthorized():boolean{
        return this.state.loginModel.accessToken!='';
    }

}