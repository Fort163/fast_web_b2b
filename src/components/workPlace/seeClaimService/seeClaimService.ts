import Component from "vue-class-component";
import Vue from "vue";
import {Inject} from "vue-property-decorator";
import {
    ColumnTypes,
    DefaultTableColumnItem,
    DefaultTableSettings,
    Handler,
    SearchServiceDto, ServiceModel, ServiceTypeModel,
    State,
    TableColumnItem,
    TableData, TableSettings
} from "@/store/model";
import SearchService from "@/components/searchService/SearchService.vue";
import {FastWebApi} from "@/components/api/fastWebApi";
import TableCustom from "@/components/table/TableCustom.vue";

class ServiceColumnItem extends DefaultTableColumnItem{
    itemName: String;
    title: String;
    mandatory: boolean;
    constructor(itemName : String,title : String,width : String) {
        super();
        this.itemName = itemName;
        this.title = title;
        this.mandatory = false;
        super.itemType = ColumnTypes.noEditable;
        super.width = width;
    }
}

class ServiceTable extends DefaultTableSettings{
    columns: TableColumnItem[];
    data: TableData[];
    saveFunc: Handler<undefined, undefined, void> | undefined;
    constructor(columns: TableColumnItem[],data: any[]) {
        super();
        this.columns = columns;
        this.data = data;
        super.deleteButton = false;
        this.saveFunc = undefined;
    }
}

@Component({
    components: {
        SearchService,
        TableCustom
    }
})
export default class SeeClaimService extends Vue {
    @Inject('api') api: FastWebApi | undefined;
    @Inject('state') state: State | undefined;

    private columns : Array<TableColumnItem> = new Array<TableColumnItem>();
    private serviceData : Array<ServiceModel> = new Array<ServiceModel>();
    private currentSearch = this.$store.getters.searchService.id;

    get settings() : TableSettings{
        if(this.currentSearch != this.$store.getters.searchService.id) {
            const services: Promise<Array<ServiceModel>> = <Promise<Array<ServiceModel>>>this.api?.postApi<Array<ServiceModel>>("/employee/service",this.$store.getters.searchService);
            services.then((items: Array<ServiceModel>) => {
                items.forEach(item => {
                    this.serviceData.push(item);
                    return new ServiceTable(this.columns, this.serviceData);
                })
            });
            this.currentSearch = this.$store.getters.searchService.id;
        }
        return new ServiceTable(this.columns, this.serviceData);
    }

    private initColumn() : void{
        const name = new ServiceColumnItem("name","Название",'50%' );
        const workClock = new ServiceColumnItem("workClock","Время на работу",'25%' );
        const showClient = new ServiceColumnItem("showClient","Показывать клиенту",'25%' );
        this.columns.push(name);
        this.columns.push(workClock);
        this.columns.push(showClient);
    }

}