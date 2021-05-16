import Component from "vue-class-component";
import Vue from "vue";
import {State} from "@/store/model";
import CreateRole from "@/components/workPlace/createRole/CreateRole.vue";
import CreatePermission from "@/components/workPlace/createPermission/CreatePermission.vue";
import CreateCompany from "@/components/workPlace/createCompany/CreateCompany.vue";
import CreateActivity from "@/components/workPlace/createActivity/CreateActivity.vue";
import ClaimCompany from "@/components/workPlace/claimCompany/ClaimCompany.vue";
import {EmptyCombobox} from "@/components/selectBoxFilter/selectBoxFilter";
import {Inject} from "vue-property-decorator";
import {Client, Frame} from "webstomp-client";
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
    private item1 : string = '';
    private item2 : string = '';

    mounted(){
        this.socket?.subscribe('/socket/message/test', message => {
            this.item2 = JSON.parse(message.body).name
        })
    }

    get socket(){
        return this.socketMain?.socket
    }

    get state():State{
        return this.$store.state
    }

    get currentFrame() : String | undefined{
        return this.state.currentMenuItem?.permission;
    }

    public send(){
        //https://www.baeldung.com/websockets-spring
        //https://www.baeldung.com/spring-security-websockets
        //https://www.baeldung.com/spring-websockets-send-message-to-user
        const emptyCombobox = new EmptyCombobox();
        emptyCombobox.name = this.item1;
        this.socket?.send('/b2b/socket/test',JSON.stringify(emptyCombobox));
    }

}