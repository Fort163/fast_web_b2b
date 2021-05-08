import Component from "vue-class-component";
// @ts-ignore
import { yandexMap, ymapMarker, loadYmap } from 'vue-yandex-maps'
import Vue from "vue";
import {Inject} from "vue-property-decorator";
import {State} from "@/store/model";
import {GeocoderResult, GeocoderResultDefault} from "@/structure/map/ymapsModel";
@Component({
    components: {
        yandexMap,
        ymapMarker,
        loadYmap
    }
})
export default class CreateCompany extends Vue {
    @Inject('state') state: State | undefined;

    private companyCoords : [number,number] | null = null;
    private geocoderResult : GeocoderResult | null = null;

    async mounted() {
        await loadYmap();
    }

    get settings(){
        return this.state?.mapInfo.settings;
    }

    get coords(){
        const coords = this.state?.mapInfo.coords;
        if(coords){
            return [coords.latitude,coords.longitude]
        }
        return [54, 39];
    }

    get company(){
        return this.companyCoords;
    }

    get address(){
        return this.companyAddress?.text;
    }

    get addressList(){
        return this.companyAddress?.geoObjects;
    }


    get companyAddress(): GeocoderResult | null{
        return this.geocoderResult;
    }

    set companyAddress(geocoderResult: GeocoderResult | null){
        this.geocoderResult = geocoderResult;
    }

    get markerCompany(){
        return {
            layout: 'default#imageWithContent',
            imageHref: '',
            imageSize: [43, 43],
            imageOffset: [0, 0],
            content: '123 v12',
            contentOffset: [0, 15],
            contentLayout: '<div style="background: red; width: 50px; color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        }
    }

    public onClick(event: any) {
        ymaps.geocode(event.get('coords')).then(
            (res : any) => {
                this.companyAddress = new GeocoderResultDefault(res);
            },
            (err : any) => {
                alert(err);
            }
        )
        this.companyCoords = event.get('coords');
    }

}