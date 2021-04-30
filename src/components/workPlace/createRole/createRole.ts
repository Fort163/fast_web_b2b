import Component from "vue-class-component";
import Vue from "vue";
import {Role, State} from "@/store/model";
import TableCustom from "@/components/table/TableCustom.vue";

@Component({
    components: {
        TableCustom
    }
})
export default class CreateRole extends Vue {

    get state():State{
        return this.$store.state
    }

}