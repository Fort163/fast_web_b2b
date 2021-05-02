import {Component, Inject, Prop, Vue, Watch} from "vue-property-decorator";
import {ColumnTypes, TableColumnItem, TableSettings} from "@/store/model";

@Component({

})
export default class TdCustom extends Vue{
    @Inject('settings') settings: TableSettings | undefined;
    @Prop() index: Number | undefined;
    @Prop() column: TableColumnItem | undefined;
    @Prop() isTitle: Boolean | undefined;

    get dataItem() : any{
        // @ts-ignore
        return this.settings?.data[this.index];
    }

    get value() : any{
        if(this.isTitle)
            return  this.column?.title;
        else {
            let name : String = '';
            if(this.column){
                name = this.column.itemName;
            }
            const result = Object.prototype.hasOwnProperty.call(this.dataItem, name.toString());
            if(result)
                return this.dataItem[name.toString()];
        }
    }

    set value(val : any|undefined){
            let name : String = '';
            if(this.column){
                name = this.column.itemName;
            }
            const result = Object.prototype.hasOwnProperty.call(this.dataItem, name.toString());
            if(result)
                this.dataItem[name.toString()] = val;
    }


    get width() : String | null | undefined{
        const width = this.column?.width;
        if(width){
            return width;
        }
        else {
            return '10%'
        }
    }

    get type() : ColumnTypes | undefined {
        return this.column?.itemType;
    }

    public setVal(val: any){
        this.value = val;
    }

}