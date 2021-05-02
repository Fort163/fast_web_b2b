import {Component, Inject, Prop, Vue} from "vue-property-decorator";
import {ColumnTypes, TableColumnItem, TableSettings} from "@/store/model";

@Component({

})
export default class TdCustom extends Vue{
    @Inject('settings') settings: TableSettings | undefined;
    @Prop() index: Number | undefined;
    @Prop() column: TableColumnItem | undefined;
    @Prop() isTitle: Boolean | undefined;
    private isOk: boolean = true;

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
            this.checkValue(val);
            if(result)
                this.dataItem[name.toString()] = val;
    }

    get errorMessage() : String | undefined{
        const errorMessage = this.column?.errorMessage;
        if(errorMessage){
            return errorMessage;
        }
        return 'Ошибка заполнения';
    }

    get width() : String | undefined{
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

    get check() :boolean{
        return this.isOk;
    }

    get mandatory() : boolean | undefined{
        return this.column?.mandatory;
    }

    public checkValue(val: any) : void{
        if(this.column?.restriction){
            this.isOk = this.column?.restriction.function(val);
        }
        else {
            this.isOk = this.defaultCheckValue(val)
        }
    }

    public defaultCheckValue(val: any): boolean {
        if(this.type === ColumnTypes.checkbox || !this.mandatory){
            return true;
        }
        return !!val;
    }

}