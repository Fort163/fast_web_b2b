import Vue from "vue";
import {Inject, Watch} from "vue-property-decorator";
import {FastWebWS} from "@/components/api/ws/fastWebWS";
import Component from "vue-class-component";

@Component({
    components: {
    }

})
export default class BottomMenu extends Vue {
    @Inject('socket') socketMain: FastWebWS | undefined;

    @Watch('connect')
    socketConnect(val: boolean, oldVal: boolean) {
        this.socket?.subscribe('/b2b/user/b2b/message/test', message => {
            alert('a');
        });
    }

    get connect() {
        return this.socketMain?.isConnect;
    }

    get socket() {
        return this.socketMain?.socket
    }
}