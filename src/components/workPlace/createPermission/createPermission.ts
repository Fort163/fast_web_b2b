import Component from "vue-class-component";
import Vue from "vue";
import {Role, State} from "@/store/model";

@Component({
    components: {
    }
})
export default class CreatePermission extends Vue {
    
    get state():State{
        return this.$store.state
    }

}