import Component from "vue-class-component";
import Vue from "vue";
import {State} from "@/store/model";
import {Inject} from "vue-property-decorator";
import {FastWebApi} from "@/components/api/fastWebApi";

@Component({
    components: {
    }

})
export default class WarningWindow extends Vue {
    @Inject('api') api: FastWebApi | undefined;
    @Inject('state') state: State | undefined;


    get noPhone() : string | undefined{
        return this.$store.getters.user?.phoneNumber
    }

}