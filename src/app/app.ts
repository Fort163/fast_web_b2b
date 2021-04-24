import Vue from 'vue'
import {AppState} from '../store/model'
import Vuex, {mapState} from "vuex";

function createStore(){
    const storeApp = new Vuex.Store({
        state: new AppState(),
        mutations: {
            login (state,value) {
                state.loginModel.accessToken = value;
                console.log("Set accessToken")
            },
            setCurrentUser (state,value) {
                state.loginModel.currentUser = value;
                console.log("Set currentUser")
            }
        }
    });
    storeApp.state.loginModel.accessToken = '12312312';
    return storeApp;
}

const appComponent = Vue.extend( {
    name:'app',
    store:createStore(),
    computed: mapState({
        message : state => state
    })
});
export default appComponent;