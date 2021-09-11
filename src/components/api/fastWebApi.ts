import axios from "axios";
import {Store} from "vuex";
import {LoadMask, ModalWindow} from "@/store/model";

interface LoginApi {
    accessToken: string,
    getApi<T>(uri:string):Promise<T>,
    postApi<T>(uri:string,data?:any):Promise<T>,
}

export class FastWebApi implements LoginApi{
    private _URL : string;
    private _accessToken: string;
    private store: Store<any>
    constructor(accessToken:string,isProd:boolean,store: Store<any>) {
        this._accessToken = accessToken;
        if(isProd){
            this._URL = 'https://quick-peter-b2b.ru';
        }
        else {
            this._URL = 'http://localhost:8080';
        }
        this.store = store;
    }

    get URL(): string {
        return this._URL;
    }

    set URL(value: string) {
        this._URL = value;
    }

    get accessToken(): string {
        return this._accessToken;
    }

    set accessToken(value: string) {
        this._accessToken = value;
    }

    getApi<T>(uri:string): Promise<T> {
        this.loadMask(true);
        return axios.get(this._URL + uri,
            {headers: {"Authorization": "Bearer " + this._accessToken}}
        )
            .then((response:any)  => {
                    this.loadMask(false);
                    return response.data;
                }
            )
            .catch((error) => {
                this.loadMask(false);
                console.log('Ошибка! Не могу связаться с API. ' + error);
            })
    }

    postApi<T>(uri:string,data?:any): Promise<T> {
        this.loadMask(true);
        return axios.post(this._URL + uri,data,
            {headers: {"Authorization": "Bearer " + this._accessToken}}
        )
            .then((response:any) => {
                    this.loadMask(false);
                    return response.data;
                }
            )
            .catch((error: any) => {
                this.loadMask(false);
                console.log('Ошибка! Не могу связаться с API. ' + error);
            })

    }


    private loadMask(value: boolean){
        this.store.commit('setLoadMask', new class implements LoadMask {
            show : boolean = value;
        });
    }

}