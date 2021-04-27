import axios from "axios";

interface LoginApi {
    accessToken: string,
    getApi<T>(uri:string):Promise<T>,
    postApi<T>(uri:string):Promise<T>,
}

export class FastWebApi implements LoginApi{
    URL : string;
    accessToken: string;
    constructor(accessToken:string,URL:string) {
        this.accessToken = accessToken;
        this.URL = URL;
    }
    getApi<T>(uri:string): Promise<T> {
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

    postApi<T>(uri:string): Promise<T> {
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