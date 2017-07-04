import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {AppSettings} from "../appSettings";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {NotifyService} from "./notify.service";
declare let $:any;

@Injectable()
export class HttpService{

    constructor(private http: Http,
                private notifyService: NotifyService){ }
    urlServer: string = AppSettings.API_SRC;

    /**
     * Отправляет GET запрос
     *
     * @param {string} urlApi адрес запроса.
     * @param {RequestOptions} requestOptions запроса.
     * @return {Observable<Response>}
     */
    get(urlApi, requestOptions){
        return this.http.get(this.urlServer + urlApi, requestOptions)
            .catch((err: any) => {
                if (err.status === 401)
                {
                    window.location.replace('/Login');
                }
                this.error(err); return null;
        });
    }

    /**
     * Отправляет POST запрос
     *
     * @param {string} urlApi адрес запроса.
     * @param {object} object запроса.
     * @param {RequestOptions} requestOptions запроса.
     * @return {Observable<Response>}
     */
    post(urlApi, object, requestOptions){
        const body = JSON.stringify(object);
        requestOptions.headers.append('Content-Type', 'application/json;charset=utf-8;');
        return this.http.post(this.urlServer + urlApi, body, requestOptions)
            .catch((err: any) => {
                if (err.status === 401)
                {
                    window.location.replace('/Login');
                }
                this.error(err); return null;
        });
    }

    postFile(urlApi, object, requestOptions){
        // // requestOptions.headers.append('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        // requestOptions.headers.append('Accept', 'application/vnd.ms-excel');
        return this.http.post(this.urlServer + urlApi, object, requestOptions)
            .catch((err: any) => {
                if (err.status === 401)
                {
                    window.location.replace('/Login');
                }
                this.error(err); return null;
        });
    }

    error(error){
        $.gritter.add({
            title: 'Ошибка запроса к серверу',
            text: error,
            class_name: 'gritter-error'
        });
        if(this.notifyService.getSwitchOn()){
            this.notifyService.stopShowLoading();
        }
    }
}