import Component from "vue-class-component";
import Vue from "vue";
import {Inject} from "vue-property-decorator";
import {FastWebWS} from "@/components/api/ws/fastWebWS";
import {ClaimCompanyRequestModel, PermissionModel, State} from "@/store/model";
import {FastWebApi} from "@/components/api/fastWebApi";
import WithConfig from "@/components/workPlace/addEmployee/withConfig/WithConfig.vue";
import WithOutConfig from "@/components/workPlace/addEmployee/withOutConfig/WithOutConfig.vue";

@Component({
    components: {
        WithConfig,
        WithOutConfig
    }
})
export default class AddEmployee extends Vue {
    @Inject('socket') socketMain: FastWebWS | undefined;
    @Inject('state') state: State | undefined;
    @Inject('api') api: FastWebApi | undefined;

    public static MAIN = 'MAIN';
    public static WITH_CONFIG = 'WITH_CONFIG';
    public static WITH_OUT_CONFIG = 'WITH_OUT_CONFIG';

    public frame : String = AddEmployee.MAIN;

    private claimCompanyRequest : Array<ClaimCompanyRequestModel> = new Array<ClaimCompanyRequestModel>();
    private selectRequest : ClaimCompanyRequestModel | null = null;

    mounted(){
        const claimCompanyRequestPromise : Promise<Array<ClaimCompanyRequestModel>> = <Promise<Array<ClaimCompanyRequestModel>>>this.api?.postApi<Array<ClaimCompanyRequestModel>>("/company/get/claims");
        claimCompanyRequestPromise.then((items:Array<ClaimCompanyRequestModel>)=> {
            items.forEach(item =>{
                this.claimCompanyRequest.push(item);
            })
        });
    }

    get claims(){
        return this.claimCompanyRequest;
    }

    public refuse(request : ClaimCompanyRequestModel){

    }

    public selectWithConfig(request : ClaimCompanyRequestModel){
        this.selectRequest = request;
        this.currentFrame = AddEmployee.WITH_CONFIG;
    }

    public selectWithOutConfig(request : ClaimCompanyRequestModel){
        this.selectRequest = request;
        this.currentFrame = AddEmployee.WITH_OUT_CONFIG;
    }

    get currentFrame() : String {
        return this.frame;
    }

    set currentFrame(frame : String){
        this.frame = frame;
    }

    public backFrame(){
        console.log("Тут")
        this.frame = AddEmployee.MAIN;
    }

}