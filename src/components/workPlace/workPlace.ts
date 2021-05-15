import Component from "vue-class-component";
import Vue from "vue";
import {State} from "@/store/model";
import CreateRole from "@/components/workPlace/createRole/CreateRole.vue";
import CreatePermission from "@/components/workPlace/createPermission/CreatePermission.vue";
import CreateCompany from "@/components/workPlace/createCompany/CreateCompany.vue";
import CreateActivity from "@/components/workPlace/createActivity/CreateActivity.vue";
import ClaimCompany from "@/components/workPlace/claimCompany/ClaimCompany.vue";

@Component({
    components: {
        CreateRole,
        CreatePermission,
        CreateCompany,
        CreateActivity,
        ClaimCompany
    }
})
export default class WorkPlace extends Vue {
    get state():State{
        return this.$store.state
    }

    get currentFrame() : String | undefined{
        return this.state.currentMenuItem?.permission;
    }
}