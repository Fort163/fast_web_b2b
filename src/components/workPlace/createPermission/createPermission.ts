import Component from "vue-class-component";
import Vue from "vue";
import {
    ColumnTypes, ComboboxModel,
    DefaultTableColumnItem,
    DefaultTableSettings,
    Handler,
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
const item2 = new PermissionColumnItem("name","ИМЯ",true);
const item3 = new PermissionColumnItem("age","Возраст",true);
const item4 = new PermissionColumnItem("work","Работа",false);
const item5 = new PermissionColumnItem("bool","Логическое",false);
const item6 = new PermissionColumnItem('combo','ComboBox',true);
item1.width = '5%';
item1.itemType = ColumnTypes.number;
item2.errorMessage = "Необходимо указать имя"
item3.itemType = ColumnTypes.number;
item3.errorMessage = 'Возраст должен быть указан в диапазоне от 18 до 50 лет'
item3.restriction = new class extends Handler<any, undefined, boolean> {
    function(val1: any): boolean {
        if(val1) {
            const number = Number.parseFloat(val1.toString());
            return number > 18 && number < 50;
        }
        else{
            return false;
        }
    }
}
item4.width = '20%';
item4.itemType = ColumnTypes.textarea;
item5.itemType = ColumnTypes.checkbox;
item6.itemType = ColumnTypes.combo;
item6.comboData = [
    new class implements ComboboxModel {
        id: Number = 1;
        name : String = "item 1"
    },
    new class implements ComboboxModel {
        id: Number = 2;
        name : String = "item 2"
    },
    new class implements ComboboxModel {
        id: Number = 3;
        name : String = "item 3"
    },
    new class implements ComboboxModel {
        id: Number = 4;
        name : String = "item 4"
    },
    new class implements ComboboxModel {
        id: Number = 5;
        name : String = "item 5"
    },
]


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


