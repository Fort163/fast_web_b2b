import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {ComboboxModel, SelectBoxModel, TableSettings} from "@/store/model";

@Component({
    components: {
    }
})
export default class SelectBox extends Vue {
    @Prop() model: SelectBoxModel | undefined;
    private storeRepository: Array<ComboboxModel> = new Array<ComboboxModel>();
    private storeItem: Array<ComboboxModel> = new Array<ComboboxModel>();
    private currentItem: Array<ComboboxModel> = new Array<ComboboxModel>();
    private show : boolean = false;

    get comboModel():SelectBoxModel | undefined{
        return <SelectBoxModel>this.model;
    }

    mounted() {
        this.comboModel?.item?.forEach(item=>{
            this.storeRepository.push(item);
        });
        this.comboModel?.currentItem?.forEach(item=>{
            this.currentItem.push(item);
        });
    }

    get storeItems(): Array<ComboboxModel>{
        return this.storeItem;
    }

    get currentItems(): Array<ComboboxModel>{
        return this.currentItem;
    }

    get repository(): Array<ComboboxModel>{
        return this.storeRepository;
    }

    set repository(value:Array<ComboboxModel>){
        this.storeRepository=value;
    }

    get isShow() : boolean{
        return this.show;
    }

    set isShow(value : boolean){
        if(this.show===value)
            return;
        if(value){
            this.showStore();
        }
        else {
            this.closeStore();
        }
        this.show = value;
    }

    fillStore() : void{
        this.repository.forEach(item=>{
            this.storeItem.push(item);
        })
    }

    dropStore() : void{
        const slice = this.storeItems.splice(0,this.storeItems.length);
        this.repository=slice;
    }

    public showStore(){
        this.fillStore();
    }

    public closeStore(){
        this.dropStore();
    }

    public addCurrentItems(value:number){
        const slice = <ComboboxModel>this.storeItems.splice(value,1).pop();
        this.currentItems?.push(slice);
        //this.closeStore();
    }

    public deleteCurrentItems(value:number){
        const slice = <ComboboxModel>this.currentItems.splice(value,1).pop();
        this.storeItems?.push(slice);
    }

}