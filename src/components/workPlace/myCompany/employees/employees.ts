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
export default class Employees extends Vue {
    @Inject('api') api: FastWebApi | undefined;

    get frame(){
        //return "http://localhost:8082?companyId="+this.$store.getters.company?.id;
        return '<iframe width="100%" height="60%" src="https://quick-peter-calendar.ru/?companyId='+this.$store.getters.company?.id+'"></iframe>';
    }

}