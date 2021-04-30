import Component from "vue-class-component";
import Vue from "vue";
import {
    DefaultTableColumnItem,
    DefaultTableSettings,
    Role,
    State,
    TableColumnItem,
    TableData,
    TableSettings
} from "@/store/model";
import TableCustom from "@/components/table/TableCustom.vue";

class PermissionColumnItem extends DefaultTableColumnItem{
    itemName: String;
    title: String;
    constructor(itemName : String,title : String) {
        super();
        this.itemName = itemName;
        this.title = title;
    }
}

const item1 = new PermissionColumnItem("id","ИД");
const item2 = new PermissionColumnItem("name","ИМЯ");
const item3 = new PermissionColumnItem("age","Возраст");
const item4 = new PermissionColumnItem("work","Работа");
item1.width = '5%';
item4.width = '20%';

const column : TableColumnItem[] = [item1,item2,item3,item4];
const data = [{id:1,name:'Nik',age:40,work:'Builder ваыва ыв выаываыв аываываыва ываываываываыв аыв'},{id:2,name:'Ted',age:40,work:'Builder'},{id:3,name:'Bill',age:40,work:'Builder'},{id:4,name:'Jone',age:40,work:'Builder'}];

class PermissionTable extends DefaultTableSettings{
    columns: TableColumnItem[];
    data: TableData[];
    constructor(columns: TableColumnItem[],data: any[]) {
        super();
        this.columns = columns;
        this.data = data;
    }
}

@Component({
    components: {
        TableCustom
    }
})
export default class CreatePermission extends Vue {
    
    get state():State{
        return this.$store.state
    }

    get settings(){
        return new PermissionTable(column,data);
    }

}


