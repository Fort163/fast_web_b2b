import Vuex, { mapState } from 'vuex';
import axios from 'axios';
import Vue from 'vue';
import Component from "vue-class-component";
import {State} from "@/store/model";

Vue.use(Vuex)
@Component({
    components: {
    }
})
export default class App extends Vue {
    private URL : string = 'http://localhost:8080';
    get state():State{
        return  this.$store.state
    }

    get accessToken() : string{
        return this.state.loginModel.accessToken
    }
    public getApi(uri : string): Promise<any> {
        return axios.get(this.URL + uri,
            {headers: {"Authorization": "Bearer " + this.accessToken}}
        )
            .then((response:any)  => {
                    return response.data;
                }
            )
            .catch(function (error) {
                console.log('Ошибка! Не могу связаться с API. ' + error);
            })
    }
    public postApi(uri : string) : Promise<any>{
        return axios.post(this.URL + uri,
            {headers: {"Authorization": "Bearer " + this.accessToken}}
        )
            .then((response:any) => {
                    return response.data;
                }
            )
            .catch(function (error:any) {
                console.log('Ошибка! Не могу связаться с API. ' + error);
            })
    }
}