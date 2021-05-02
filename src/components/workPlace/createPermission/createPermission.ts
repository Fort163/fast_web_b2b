import Component from "vue-class-component";
import Vue from "vue";
import {
    ColumnTypes,
    DefaultTableColumnItem,
    DefaultTableSettings, Handler,
    State,
    TableColumnItem,
    TableData
} from "@/store/model";
import TableCustom from "@/components/table/TableCustom.vue";

class PermissionColumnItem extends DefaultTableColumnItem{
    itemName: String;
    title: String;
    mandatory: boolean;
    constructor(itemName : String,title : String,mandatory: boolean) {
        super();
        this.itemName = itemName;
        this.title = title;
        this.mandatory = mandatory;
    }
}

const item1 = new PermissionColumnItem("id","ИД",true);
const item2 = new PermissionColumnItem("name","ИМЯ",false);
const item3 = new PermissionColumnItem("age","Возраст",true);
const item4 = new PermissionColumnItem("work","Работа",true);
const item5 = new PermissionColumnItem("bool","Логическое",true);
item3.errorMessage = 'Возраст должен быть не более 50 лет'
item3.restriction = new class extends Handler<any, undefined, boolean> {
    function(val1: any): boolean {
        const number = Number.parseFloat(val1.toString());
        return number<50;
    }
}
item1.width = '5%';
item1.itemType = ColumnTypes.number;
item3.itemType = ColumnTypes.number;
item4.width = '20%';
item4.itemType = ColumnTypes.textarea;
item5.itemType = ColumnTypes.checkbox;

const column : TableColumnItem[] = [item1,item2,item3,item4,item5];
const data = [{id:1,name:'Nik',age:40,work:'Builder ваыва ыв выаываыв аываываыва ываываываываыв аыв',bool:true},
    {id:2,name:'Ted',age:40,work:'Builder',bool:false},
    {id:3,name:'Bill',age:40,work:'Builder',bool:true},
    {id:4,name:'Jone',age:40,work:'Builder',bool:false}];

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


