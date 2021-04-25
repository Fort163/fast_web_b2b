import Component from "vue-class-component";
import Vue from "vue";
import {State, UserInfoModel} from "@/store/model";

@Component({
    components: {
    }
})
export default class TopMenu extends Vue {
    get state():State{
        return this.$store.state
    }

    get user() : UserInfoModel{
        return this.state.loginModel.currentUser
    }
}