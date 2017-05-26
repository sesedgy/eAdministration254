import {Injectable} from '@angular/core';
import {CookieService} from "../cookie.service";
import {HttpService} from "../http.service";
import {User} from "../../models/user";

@Injectable()
export class UserService{

    constructor(private httpService: HttpService, private cookieService: CookieService) { }

    getUserInfo(userName: string) {
        return this.httpService.get('users/getUserInfo/' + userName, this.cookieService.createAuthorizationHeader());
    }

    authorization(login: string, password: string) {
        return this.httpService.get('users/Authorization/' + login + '&' + password, null);
    }

    isLoginAndEmailFree(login: string, email: string) {
        return this.httpService.get('users/isLoginAndEmailFree/' + login + '&' + email, this.cookieService.createAuthorizationHeader());
    }

    checkCookie(cookie: string, rights: string) {
        return this.httpService.get('users/checkCookie/' + cookie + '&' + rights, this.cookieService.createAuthorizationHeader());
    }

    resetPassword(email: string) {
        return this.httpService.get('users/resetPassword/' + email, null);
    }

    changeEmail(login: string, newEmail: string) {
        return this.httpService.get('users/changeEmail/' + login + "&" + newEmail, this.cookieService.createAuthorizationHeader());
    }

    changeLogin(email: string, newLogin: string) {
        return this.httpService.get('users/changeLogin/' + email + "&" + newLogin, this.cookieService.createAuthorizationHeader());
    }

    changePassword(login: string, newPassword: string) {
        return this.httpService.get('users/changePassword/' + login + "&" + newPassword, this.cookieService.createAuthorizationHeader());
    }

}