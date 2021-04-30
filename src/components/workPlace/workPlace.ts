import Component from "vue-class-component";
import Vue from "vue";
import {State} from "@/store/model";
import CreateRole from "@/components/workPlace/createRole/CreateRole.vue";
import CreatePermission from "@/components/workPlace/createPermission/CreatePermission.vue";

@Component({
    components: {
        CreateRole,
        CreatePermission
    }
})
export default class WorkPlace extends Vue {
    get state():State{
        return this.$store.state
    }

    get currentFrame() : String | undefined{
        return this.state.currentMenuItem?.name;
    }
}