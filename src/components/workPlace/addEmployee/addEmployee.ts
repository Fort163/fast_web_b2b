import Component from "vue-class-component";
import Vue from "vue";
import {Inject} from "vue-property-decorator";
import {FastWebWS} from "@/components/api/ws/fastWebWS";
import {ClaimCompanyRequestModel, PermissionModel, State} from "@/store/model";
import {FastWebApi} from "@/components/api/fastWebApi";

@Component({
    components: {

    }
})
export default class AddEmployee extends Vue {
    @Inject('socket') socketMain: FastWebWS | undefined;
    @Inject('state') state: State | undefined;
    @Inject('api') api: FastWebApi | undefined;

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

    public selectConfig(request : ClaimCompanyRequestModel){
        this.selectRequest = request;
    }

    public selectNoConfig(request : ClaimCompanyRequestModel){
        this.selectRequest = request;
    }

}