import { Vue, Component, Prop } from 'vue-property-decorator'
import {ComboboxModel} from "@/store/model";

@Component({
})
export default class ComboBox extends Vue {
    @Prop() readonly title: string | undefined;
    @Prop() readonly items: ComboboxModel[] | undefined;
    @Prop() func: Function | undefined;
    private enter: boolean = false;
    private comboItem: ComboboxModel[] = [];
    public setEnter(value: boolean){
        if(this.enter == value){
            return;
        }
        this.enter = value;
        if(value && this.comboItem.length == 0)
            this.addItems();
        else
            this.dropItems();
    }

    public addItems(){
        this.items?.forEach(item=>{
            this.comboItem.push(item);
        })
    }

    public dropItems(){
        this.items?.forEach(item=>{
            this.comboItem.pop();
        })
    }

}