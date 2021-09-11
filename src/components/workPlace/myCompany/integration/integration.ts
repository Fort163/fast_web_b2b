import Component from "vue-class-component";
import Vue from "vue";
import TableCustom from "@/components/table/TableCustom.vue";
import {Inject} from "vue-property-decorator";
import {FastWebApi} from "@/components/api/fastWebApi";

@Component({
    components: {
        TableCustom
    }
})
export default class Integration extends Vue {
    @Inject('isProd') isProd: boolean | undefined;
    @Inject('api') api: FastWebApi | undefined;
    private style : string = 'white';

    get currentStyle() :string{
        return this.style;
    }

    public setStyle(value :string){
        this.style = value;
    }

    get src(){
        if(this.isProd){
            //WORK
            return "https://quick-peter-calendar.ru?companyId="+this.$store.getters.company?.id+"&"+this.style;
        }
        else{
            //TEST
            return "http://localhost:8082?companyId="+this.$store.getters.company?.id+"&"+this.style;
        }
    }

    get frame(){
        return '<iframe width="100%" height="60%" src="'+this.src+'"/>';
    }

}