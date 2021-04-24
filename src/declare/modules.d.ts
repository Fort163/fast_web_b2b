import Vue from "vue";
import InjectionKey from "vue";
import {State} from "../store/model";

declare module '*.vue' {
    import Vue from 'vue'
    export default Vue
}
/*declare module "vuex" {
    function createStore<T = State>(store?:T):void
    // @ts-ignore
    function mapState(value:any):void
}*/
declare module "vue" {
    function createApp<T = any>(key?: { render: (h: any) => any }): T
}