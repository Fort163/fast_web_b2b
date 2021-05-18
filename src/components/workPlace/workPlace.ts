import Component from "vue-class-component";
import Vue from "vue";
import {State} from "@/store/model";
import CreateRole from "@/components/workPlace/createRole/CreateRole.vue";
import CreatePermission from "@/components/workPlace/createPermission/CreatePermission.vue";
import CreateCompany from "@/components/workPlace/createCompany/CreateCompany.vue";
import CreateActivity from "@/components/workPlace/createActivity/CreateActivity.vue";
import ClaimCompany from "@/components/workPlace/claimCompany/ClaimCompany.vue";
import {EmptyCombobox} from "@/components/selectBoxFilter/selectBoxFilter";
import {Inject, Watch} from "vue-property-decorator";
import {FastWebWS} from "@/components/api/ws/fastWebWS";

@Component({
    components: {
        CreateRole,
        CreatePermission,
        CreateCompany,
        CreateActivity,
        ClaimCompany
    }

})
export default class WorkPlace extends Vue {
    @Inject('socket') socketMain: FastWebWS | undefined;
    @Inject('state') state: State | undefined;
    @Watch('connect')
    socketConnect(val: boolean, oldVal: boolean) {
        this.socket?.subscribe('/b2b/user/b2b/message/test', message => {
            this.item2 = JSON.parse(message.body).name
        });
    }

    private item1 : string = '';
    private item2 : string = '';

    get connect(){
         return this.socketMain?.isConnect;
    }

    get socket(){
        return this.socketMain?.socket
    }

    get currentFrame() : String | undefined{
        return this.state?.currentMenuItem?.permission;
    }

    public send(){
        const emptyCombobox = new EmptyCombobox();
        emptyCombobox.name = this.item1;
        this.socket?.send('/b2b/socket/test',JSON.stringify(emptyCombobox));
    }

}