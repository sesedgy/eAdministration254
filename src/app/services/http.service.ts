import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {AppSettings} from "../appSettings";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpService{

    constructor(private http: Http){ }
    urlServer: string = AppSettings.API_SRC;

    /**
     * Отправляет GET запрос
     *
     * @param {string} urlApi адрес запроса.
     * @param {string} header запроса.
     * @return {Observable<Response>}
     */
    get(urlApi, header){
        return this.http.get(this.urlServer + urlApi, header);
    }

    /**
     * ПРОТЕСТИТЬ
     *
     * @param {string} tokenId.
     */
    post(urlApi, obj){
        const body = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        return this.http.post(this.urlServer + urlApi, body, { headers: headers })
            .map((resp:Response)=>resp.json());
            // .catch((error:any) =>{return Observable.throw(error);});
    }
}