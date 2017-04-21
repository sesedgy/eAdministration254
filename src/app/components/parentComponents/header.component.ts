import {Component} from "@angular/core";
import {CookieService} from "../../services/cookie.service";
import {Router} from "@angular/router";

@Component({
    selector: 'header',
    templateUrl: './../../views/header.html'
})

export class HeaderComponent{

    constructor(private cookieService: CookieService,
                private router: Router){}

    logOut(){
        this.cookieService.deleteAllCookie();
        this.router.navigate(['Login']);
    }
}
