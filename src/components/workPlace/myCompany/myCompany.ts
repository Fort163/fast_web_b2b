import Component from "vue-class-component";
import Vue from "vue";
import Statistic from "@/components/workPlace/myCompany/statistic/Statistic.vue";

@Component({
    components: {
        Statistic
    }
})
export default class MyCompany extends Vue {

    private frame : String = 'STATISTIC';

    get currentFrame() : String | undefined{
        return this.frame;
    }

}