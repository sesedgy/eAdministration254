import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {HttpService} from "../services/http.service";
import {AppSettings} from "../appSettings";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private httpService: HttpService) { }
    rightsForLogIn: string[] = AppSettings.RIGHTS_FOR_LOGIN;

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let rights = "";
        this.rightsForLogIn.forEach(function (item) {
            // rights += item + ";";
        });
        let cookie = document.cookie.slice(7, 39);
        if (cookie != null)
        {
            this.httpService.get('users/authorization/' + cookie + '&' + rights).subscribe(body => {
                if (body) {
                    return true;
                }
            });
        }
        this.router.navigate(['/login']);
        return false;
    }
}