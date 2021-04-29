import {Vue, Component, Prop} from 'vue-property-decorator';
import {ComboboxModel} from "@/store/model";

@Component({

})
export class Table extends Vue{
    @Prop() readonly title: string | undefined;
    @Prop() readonly items: ComboboxModel[] | undefined;
}