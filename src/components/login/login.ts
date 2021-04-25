import Component from "vue-class-component";
import FastWebApi from '@/components/api/FastWebApi.vue'
import Vue from "vue";
import {State, UserInfoModel} from "@/store/model";

@Component({
    components: {
        FastWebApi
    }
})
export default class Login extends Vue {
    get state():State{
        return  this.$store.state
    }

    get user() : UserInfoModel{
        return this.state.loginModel.currentUser
    }
    public tryLogin(url : string) {
        window.location.href = url;
    }
}
