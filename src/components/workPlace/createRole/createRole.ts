import Component from "vue-class-component";
import Vue from "vue";
import {ComboboxModel, DefaultSelectBox, Role, SelectBoxModel, State} from "@/store/model";
import TableCustom from "@/components/table/TableCustom.vue";
import SelectBox from "@/components/selectBox/SelectBox.vue";

const data = [
    new class implements ComboboxModel {
        id: Number = 1;
        name : String = "item 1"
    },
    new class implements ComboboxModel {
        id: Number = 2;
        name : String = "item 2"
    },
    new class implements ComboboxModel {
        id: Number = 3;
        name : String = "item 3"
    },
    new class implements ComboboxModel {
        id: Number = 4;
        name : String = "item 4"
    },
    new class implements ComboboxModel {
        id: Number = 5;
        name : String = "item 5"
    }
]

class RoleSelect extends DefaultSelectBox{
    constructor(item : Array<ComboboxModel>) {
        super(item);
    }
}

@Component({
    components: {
        SelectBox,
        TableCustom
    }
})
export default class CreateRole extends Vue {

    get comboData(): SelectBoxModel {
        data.pop();
        return new RoleSelect(data);
    }

    get state():State{
        return this.$store.state
    }

}