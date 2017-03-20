import { Component} from '@angular/core';
import {HttpService} from "../services/http.service";
import {AppSettings} from "../appSettings";
import {CookieService} from "../services/cookie.service";
import {Router} from "@angular/router";

@Component({
    selector: 'logIn',
    templateUrl: 'app/views/logIn.html',
    providers: [HttpService],
    styles: [`
        body {
          padding-top: 40px;
          padding-bottom: 40px;
          background-color: #eee;
        }
        
        .form-signin {
          max-width: 330px;
          padding: 15px;
          margin: 0 auto;
        }
        .form-signin .form-signin-heading,
        .form-signin .checkbox {
          margin-bottom: 10px;
        }
        .form-signin .checkbox {
          font-weight: normal;
        }
        .form-signin .form-control {
          position: relative;
          height: auto;
          -webkit-box-sizing: border-box;
             -moz-box-sizing: border-box;
                  box-sizing: border-box;
          padding: 10px;
          font-size: 16px;
        }
        .form-signin .form-control:focus {
          z-index: 2;
        }
        .form-signin input[type="text"] {
          margin-bottom: -1px;
          border-bottom-right-radius: 0;
          border-bottom-left-radius: 0;
        }
        .form-signin input[type="password"] {
          margin-bottom: 10px;
          border-top-left-radius: 0;
          border-top-right-radius: 0;
        }
    `]
})

export class LogInComponent {

    constructor(private httpService: HttpService, private router: Router){}
    rightsForLogIn: string[] = AppSettings.RIGHTS_FOR_LOGIN;
    isIncorrectLoginOrPassword: boolean = false;
    isWrongRights: boolean = false;
    isError: boolean = false;
    login: string;
    password: string;

    //TODO Шифрование пароля на стороне клиента
    logIn(){
        this.isIncorrectLoginOrPassword = false;
        this.isWrongRights = false;
        this.isError = false;
        try {
            let response = new CookieService().createAuthorizationHeader();
            if (response) {
                let cookieService = new CookieService();
                cookieService.setCookie(response[0]);
                this.router.navigate(['/']);
            }else{
                this.isIncorrectLoginOrPassword = true;
                return;
            }
        }catch (exception){
            this.isError = true;
        }
    }

}