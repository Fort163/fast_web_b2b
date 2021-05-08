import axios from "axios";

interface LoginApi {
    accessToken: string,
    getApi<T>(uri:string):Promise<T>,
    postApi<T>(uri:string,data?:any):Promise<T>,
}

export class FastWebApi implements LoginApi{
    private _URL : string;
    private _accessToken: string;
    constructor(accessToken:string,URL:string) {
        this._accessToken = accessToken;
        this._URL = URL;
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
        return axios.get(this._URL + uri,
            {headers: {"Authorization": "Bearer " + this._accessToken}}
        )
            .then((response:any)  => {
                    return response.data;
                }
            )
            .catch(function (error) {
                console.log('Ошибка! Не могу связаться с API. ' + error);
            })
    }

    postApi<T>(uri:string,data?:any): Promise<T> {
        return axios.post(this._URL + uri,data,
            {headers: {"Authorization": "Bearer " + this._accessToken}}
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