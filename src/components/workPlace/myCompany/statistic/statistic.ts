import Component from "vue-class-component";
import Vue from "vue";

@Component({
    components: {

    }
})
export default class Statistic extends Vue {

    get companyId(){
        //TEST
        return "http://localhost:8082?companyId="+this.$store.getters.company?.id;
        //WORK
        //return "https://quick-peter-calendar.ru?companyId="+this.$store.getters.company?.id;
    }

}