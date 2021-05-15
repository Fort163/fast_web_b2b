import Component from "vue-class-component";
import Vue from "vue";
import {CompanyModel, EmployeeModel, State, UserInfoModel} from "@/store/model";

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

    get employee() : EmployeeModel | undefined{
        return this.user?.employee;
    }

    get company() : CompanyModel | undefined{
        return this.employee?.company;
    }

    get userpic() : String | undefined{
        return this.user?.userpic;
    }

    get welcome() : String | undefined{
        return "Добро пожаловать, "+this.user?.firstName;
    }

    get companyName(){
        return this.company?.name;
    }

    get employeeName(){
        return this.employee?.name;
    }

    public logout() {
        this.$store.commit('login',null);
        this.$store.commit('setCurrentUser',null);
    }

    public settings() {
        alert('todo')
    }

}