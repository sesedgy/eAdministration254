import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {CookieService} from "../cookie.service";

@Injectable()
export class UserService{

    constructor(private http: Http) { }
    cookieService: CookieService;

    authorization(login: string, password: string) {
        return this.http.get('/users/Authorization/' + login + '&' + password, this.cookieService.createAuthorizationHeader())
            .subscribe(body => {return body;});
    }

    isLoginAndEmailFree(login: string, email: string) {
        return this.http.get('/users/isLoginAndEmailFree/' + login + '&' + email, this.cookieService.createAuthorizationHeader())
            .subscribe(body => {return body;});
    }

    checkCookie(cookie: string, rights: string) {
        return this.http.get('/users/checkCookie/' + cookie + '&' + rights, this.cookieService.createAuthorizationHeader())
            .subscribe(body => {return body;});
    }

}