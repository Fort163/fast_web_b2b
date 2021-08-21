import Component from "vue-class-component";
import Vue from "vue";

@Component({
    components: {

    }
})
export default class Statistic extends Vue {

    get companyId(){
        return "http://localhost:8082?companyId="+this.$store.getters.company?.id;
    }

}