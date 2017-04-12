import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {AppSettings} from "../appSettings";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
declare let $:any;

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
        return this.http.get(this.urlServer + urlApi, header)
            .catch((err: any) => {this.error(err); return null;});
    }

    /**
     * ПРОТЕСТИТЬ
     *
     * @param {string} tokenId.
     */
    post(urlApi, obj, header){
        const body = JSON.stringify(obj);
        header.append('Content-Type', 'application/json;charset=utf-8');
        return this.http.post(this.urlServer + urlApi, body, header)
            .catch((err: any) => {this.error(err); return null;});
    }

    error(error){
        $.gritter.add({
            title: 'Ошибка запроса к серверу',
            text: error,
            class_name: 'gritter-error'
        });
    }
}