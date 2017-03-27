import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {AppSettings} from "../appSettings";
import {UserService} from "../services/api/user.service";
import {Response} from "@angular/http";
import {CookieService} from "../services/cookie.service";
import {Observable} from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private cookieService: CookieService,
                private userService: UserService,
                private router: Router) {
    }

    rightsForLogIn: string[] = AppSettings.RIGHTS_FOR_LOGIN;

    canActivate(): Observable<boolean> | boolean {
        let rights = "";
        this.rightsForLogIn.forEach(function (item) {
            rights += item + ";";
        });
        let cookie = this.cookieService.getTokenId();
        if (cookie === "") {
            cookie = "0";
        }
        return this.userService.checkCookie(cookie, rights).map((response: Response) => {
            let responseBody = response.json();
            if (responseBody) {
                return true;
            } else {
                this.router.navigate(['login']);
                return false;
            }
        });
    }
}