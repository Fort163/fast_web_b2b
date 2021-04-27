import { Vue, Component, Prop } from 'vue-property-decorator'
import {ComboboxModel} from "@/store/model";

@Component({
})
export default class ComboBox extends Vue {
    @Prop() readonly title: string | undefined;
    @Prop() readonly items: ComboboxModel[] | undefined;
    @Prop() func: Function | undefined;
    private enter: boolean = false;
    public setEnter(value: boolean){
        this.enter = value;
    }

}