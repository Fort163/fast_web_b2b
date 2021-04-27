import Component from "vue-class-component";
import Vue from "vue";

@Component({
    components: {
    }
})
export default class Login extends Vue {

    public tryLogin(url : string) {
        window.location.href = url;
    }
}
