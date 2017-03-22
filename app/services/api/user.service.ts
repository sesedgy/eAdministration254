import {Injectable} from '@angular/core';
import {CookieService} from "../cookie.service";
import {HttpService} from "../http.service";

@Injectable()
export class UserService{

    constructor(private httpService: HttpService, private cookieService: CookieService) { }

    authorization(login: string, password: string) {
        return this.httpService.get('users/Authorization/' + login + '&' + password, null);
    }

    isLoginAndEmailFree(login: string, email: string) {
        return this.httpService.get('users/isLoginAndEmailFree/' + login + '&' + email, this.cookieService.createAuthorizationHeader());
    }

    checkCookie(cookie: string, rights: string) {
        return this.httpService.get('users/checkCookie/' + cookie + '&' + rights, this.cookieService.createAuthorizationHeader());
    }

}