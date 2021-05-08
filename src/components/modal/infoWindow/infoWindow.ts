import {Component, Inject, Vue} from "vue-property-decorator";
import {ModalWindow, State} from "@/store/model";

@Component({
    components:{

    }
})
export default class InfoWindow extends Vue{

    get message() : string | undefined | null{
        return this.$store.state?.modalWindow?.message;
    }

    public close(){
        this.$store.commit('setModalWindow',new class implements ModalWindow{
            message: string | null = null
            show: boolean = false;
        });
    }

}