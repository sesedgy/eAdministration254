import {Injectable} from '@angular/core';
import {RequestOptions, Headers} from "@angular/http";

@Injectable()
export class CookieService{

    /**
     * Создает Header Authorization для запроса
     *
     * @return {RequestOptions} header c Id токена.
     */
    createAuthorizationHeader(){
        let cookie = document.cookie.slice(8, 44);
        let headers = new Headers({ "Authorization": cookie});
        return new RequestOptions({ headers: headers });
    }

    /**
     * Добавляет куки с tokenId сроком жизни - 1 день
     *
     * @param {string} tokenId.
     */
    setCookie(tokenId: string){
        //Куки действительны втечении одного дня
        var date = new Date();
        date.setDate(date.getDate() + 1);
        document.cookie = "TokenId=" + tokenId + ";path=/;expires=" + date.toUTCString() + ";"
    }

    /**
     * Достает tokenId из кукисов
     *
     * @return {string} tokenId.
     */
    getTokenId(){
        return document.cookie.slice(8, 44);
    }

    /**
     * Удаляет куки с tokenId
     *
     */
    deleteCookie(){
        document.cookie = "TokenId" + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    }
}