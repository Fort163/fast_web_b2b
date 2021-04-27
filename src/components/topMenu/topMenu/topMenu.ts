import Component from "vue-class-component";
import Vue from "vue";
import ComboBox from "@/components/comboBox/ComboBox.vue";
import {ComboboxModel} from "@/store/model";

@Component({
    components: {
        ComboBox
    }
})
export default class TopMenu extends Vue {
    private currentItem: ComboboxModel | undefined;
    private adminMenu = [
        {
            id:1,
            name: "Пункт 1"
        },
        {
            id:2,
            name:"Пункт 2"
        },
        {
            id:3,
            name:"Пункт 3"
        },
        {
            id:4,
            name:"Пункт 4"
        },
        {
            id:5,
            name:"Пункт 5"
        }

    ]

    public item(): String | undefined{
        return this.currentItem?.name;
    }
    public setItem(item : ComboboxModel|undefined){
        this.currentItem = item;
        this.$store.commit('setCurrentMenuItem',item);
    }
}