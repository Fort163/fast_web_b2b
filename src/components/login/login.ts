import Component from "vue-class-component";
import Vue from "vue";

@Component({
    components: {
    }
})
export default class Login extends Vue {

    public tryLoginGoogle() {
        window.location.href = this.createUrl(process.env.VUE_APP_OAUTH_GOOGLE);
    }

    public tryLoginYandex() {
        window.location.href = this.createUrl(process.env.VUE_APP_OAUTH_YANDEX);
    }

    private createUrl(oauthUrl: string): string {
        return process.env.VUE_APP_BASE_URL_SERVER_B2B + oauthUrl + '?redirect_uri=' + process.env.VUE_APP_BASE_URL_B2B + process.env.VUE_APP_REDIRECT_URL;
    }

}
