import {Injectable} from '@angular/core';
import {RequestOptions, Headers} from "@angular/http";

@Injectable()
export class CookieService{

    //Куки действительны втечении одного дня
    /**
     * Создает Header Authorization для запроса
     *
     * @return {RequestOptions} header c Id токена.
     */
    createAuthorizationHeader(){
        let headers = new Headers({ "Authorization": this.getCookie("TokenId")});
        return new RequestOptions({ headers: headers });
    }

    /**
     * Добавляет куки с tokenId сроком жизни - 1 день
     *
     * @param {string} tokenId.
     */
    setTokenId(tokenId: string){
        this.setCookie("TokenId", tokenId, {expires: 86400});
    }

    /**
     * Достает tokenId из кукисов
     *
     * @return {string} tokenId.
     */
    getTokenId(){
        return this.getCookie("TokenId");
    }

    /**
     * Удаляет куки с tokenId
     *
     */
    deleteAllCookie(){
        this.deleteCookie("TokenId");
        this.deleteCookie("UserName");
    }

    getCurrentUserLogin(){
        return this.getCookie("UserName");
    }

    setCurrentUserLogin(userName: string){
        this.setCookie("UserName", userName, {expires: 86400});
    }


    getCookie(name: string){
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? matches[1] : undefined;
    }

    //Время в секундах
    setCookie(name, value, options) {

        options = options || {};

        let d = new Date();
        d.setTime(d.getTime() + options.expires * 1000);
        options.expires = d;

        let updatedCookie = name + "=" + value;
        for (let propName in options) {
            updatedCookie += "; " + propName;
            let propValue = options[propName];
            if (propValue !== true) {
                updatedCookie += "=" + propValue;
            }
        }

        document.cookie = updatedCookie;
    }

    deleteCookie(name) {
        this.setCookie(name, "", {
            expires: -86400
        })
    }

}