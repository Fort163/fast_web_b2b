import Component from "vue-class-component";
import Vue from "vue";
import {SimpleValue, State} from "@/store/model";
import CreateRole from "@/components/workPlace/createRole/CreateRole.vue";
import CreatePermission from "@/components/workPlace/createPermission/CreatePermission.vue";
import CreateCompany from "@/components/workPlace/createCompany/CreateCompany.vue";
import CreateActivity from "@/components/workPlace/createActivity/CreateActivity.vue";
import ClaimCompany from "@/components/workPlace/claimCompany/ClaimCompany.vue";
import {Inject} from "vue-property-decorator";
import {FastWebWS} from "@/components/api/ws/fastWebWS";
import AddEmployee from "@/components/workPlace/addEmployee/AddEmployee.vue";

@Component({
    components: {
        CreateRole,
        CreatePermission,
        CreateCompany,
        CreateActivity,
        ClaimCompany,
        AddEmployee
    }

})
export default class WorkPlace extends Vue {
    @Inject('socket') socketMain: FastWebWS | undefined;
    @Inject('state') state: State | undefined;

    get socket(){
        return this.socketMain?.socket
    }

    get currentFrame() : String | undefined{
        return this.state?.currentMenuItem?.permission;
    }

    public send(){
        const simpleValue = new SimpleValue();
        simpleValue.valueLong = 1;
        this.socket?.send('/b2b/socket/claimCompany',JSON.stringify(simpleValue));
    }

}