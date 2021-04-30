import {Component, Inject, Prop, Vue} from "vue-property-decorator";
import {TableColumnItem, TableData, TableSettings} from "@/store/model";
import TdCustom from "@/components/table/tdCustom/TdCustom.vue";

@Component({
    components:{
        TdCustom
    }
})
export default class TrCustom extends Vue{
    @Inject('settings') settings: TableSettings | undefined;
    @Prop() dataItem: TableData | undefined;
    @Prop() isTitle: Boolean | undefined;

    get tableSettings():TableSettings | undefined{
        return <TableSettings>this.settings;
    }

    get columns(): TableColumnItem[] | undefined{
        return this.tableSettings?.columns;
    }

    get deleteFunc(): Function | null  | undefined{
        return this.tableSettings?.deleteFunc;
    }

    get defaultButtons(): Boolean | undefined{
        return this.tableSettings?.defaultButtons;
    }

    get dataTable(): TableData[] | undefined{
        return this.tableSettings?.data;
    }

    set dataTable(data: TableData[] | undefined){
        // @ts-ignore
        this.tableSettings.data = data;
    }

    public deleteDefault(){
        const clearMass = this.dataTable?.filter(item => {
            if(item.id != this.dataItem?.id){
                return item;
            }
        });
        this.dataTable = clearMass;
    }

    public selectFunc(){
        if(this.deleteFunc){
            this.deleteFunc();
        }
        else {
            this.deleteDefault();
        }
    }

}