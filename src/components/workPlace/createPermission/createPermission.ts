import Component from "vue-class-component";
import Vue from "vue";
import {
    ColumnTypes, ComboboxModel, DefaultSelectBox,
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
const dataCombo = [
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
    }
]

class RoleSelect extends DefaultSelectBox{
    constructor(item : Array<ComboboxModel>) {
        super(item);
    }
}
item6.comboData = new RoleSelect(dataCombo);
item6.width = '30%';
item6.restriction = new class extends Handler<any, undefined, boolean> {
    function(val1: any): boolean {
        if(val1) {
            const value : Array<ComboboxModel> = <Array<ComboboxModel>>val1;
            const valueId = new Array<Number>();
            value.forEach(itemValue =>{
                valueId.push(itemValue.id);
            })

            return value.length > 2 && valueId.indexOf(3) > -1;
        }
        else{
            return false;
        }
    }
}
item6.errorMessage = 'Должно быть выбрано не меньше трех элементов и один из них Item 3'

const column : TableColumnItem[] = [item1,item2,item3,item4,item5,item6];
const data = [{id:1,name:'Nik',age:40,work:'Builder ваыва ыв выаываыв аываываыва ываываываываыв аыв',bool:true,combo:new Array<ComboboxModel>()},
    {id:2,name:'Ted',age:40,work:'Builder',bool:false,combo:new Array<ComboboxModel>(new class implements ComboboxModel {
                id: Number = 3;
                name : String = "item 3"
            },
            new class implements ComboboxModel {
                id: Number = 4;
                name : String = "item 4"
            },)},
    {id:3,name:'Bill',age:40,work:'Builder',bool:true,combo:new Array<ComboboxModel>()},
    {id:4,name:'Jone',age:40,work:'Builder',bool:false,combo:new Array<ComboboxModel>()}];

class PermissionSave extends Handler<undefined, undefined, void>{
    private show : boolean = false
    constructor() {
        super();
    }
    function(): void {
        this.show = true;
        alert('Сохранено!');
    }

    get isShow(): boolean{
        return this.show;
    }
}

class PermissionTable extends DefaultTableSettings{
    columns: TableColumnItem[];
    data: TableData[];
    saveFunc : Handler<undefined, undefined, void>;
    constructor(columns: TableColumnItem[],data: any[],save: Handler<undefined, undefined, void> ) {
        super();
        this.columns = columns;
        this.data = data;
        this.saveFunc = save;
    }
}

@Component({
    components: {
        TableCustom
    }
})
export default class CreatePermission extends Vue {

    private saveHandler : PermissionSave = new PermissionSave();

    get state():State{
        return this.$store.state
    }

    get settings(){
        return new PermissionTable(column,data,this.saveHandler);
    }

    get isShow() : boolean{
        return this.saveHandler.isShow;
    }

}


