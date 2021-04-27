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

    get user() : UserInfoModel | null{
        return this.state.loginModel.currentUser
    }

    get userpic() : String | undefined{
        return this.user?.userpic;
    }

    get welcome() : String | undefined{
        return "Добро пожаловать, "+this.user?.firstName;
    }

    get companyName(){
        return "ООО \"FastWeb\"";
    }

    get employee(){
        return "Главный разработчик FW";
    }

    public logout() {
        this.$store.commit('login',null);
        this.$store.commit('setCurrentUser',null);
    }

    public settings() {
        alert('todo')
    }

}