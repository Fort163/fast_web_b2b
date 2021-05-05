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
    @Prop() value: Array<ComboboxModel>| undefined;
    private storeRepository: Array<ComboboxModel> = new Array<ComboboxModel>();
    private storeItem: Array<ComboboxModel> = new Array<ComboboxModel>();
    private show : boolean = false;

    get comboModel():SelectBoxModel | undefined{
        return <SelectBoxModel>this.model;
    }

    mounted() {
        const valueId = new Array<Number>()
        if(this.value && this.value.length>0){
            this.value.forEach(itemValue =>{
                valueId.push(itemValue.id);
            })
        }
        this.comboModel?.item?.forEach(item=>{
            if(valueId.indexOf(item.id)===-1){
                this.storeRepository.push(item);
            }
            return
        });
    }

    get storeItems(): Array<ComboboxModel>{
        return this.storeItem;
    }

    get currentItems(): Array<ComboboxModel>{
        return <Array<ComboboxModel>>this.value;
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
        this.show = value;
        if(value){
            this.showStore();
        }
        else {
            this.closeStore();
        }
    }

    get selectWidth() : string{
        let width = 100;
        width = width/this.currentItems?.length;
        return width+'%';
    }

    get arrowPosition() : string{
        if(this.currentItems.length===0)
            return 'relative';
        else
            return 'initial';
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
        this.value?.push(slice);
    }

    public deleteCurrentItems(value:number){
        const slice = <ComboboxModel>this.value?.splice(value,1).pop();
        this.storeItems?.push(slice);
    }

}