import Component from "vue-class-component";
import Vue from "vue";
import {Role, State, UserInfoModel} from "@/store/model";

@Component({
    components: {
    }
})
export default class WorkPlace extends Vue {
    get state():State{
        return this.$store.state
    }

    get roleList() : Role[] | undefined{
        return this.state.loginModel.currentUser?.roleList
    }
}