import {Vue, Component, Prop, Provide} from 'vue-property-decorator';
import {TableColumnItem, TableData, TableSettings} from "@/store/model";
import TrCustom from "@/components/table/trCustom/TrCustom.vue";


@Component({
    components: {TrCustom}
})
export default class TableCustom extends Vue{
    @Prop() tableSettings: TableSettings | undefined;
    @Provide( 'settings' ) setting: TableSettings | undefined = this.settings;

    get settings(): TableSettings | undefined{
        return this.tableSettings
    }

    get tableData() : TableData[]| undefined{
        return this.settings?.data
    }

    get tableColumn() : TableColumnItem[]| undefined {
        return this.settings?.columns
    }

    public addItem() : void{
        this.tableData?.push(new class implements TableData {
            id = null;
        })
    }

}