import {Component} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {CookieService} from "../../services/cookie.service";
import {Router} from "@angular/router";
import {UserService} from "../../services/api/user.service";
import {Response} from "@angular/http";
import {AppSettings} from "./../../appSettings";
declare let $:any;

@Component({
    selector: 'logIn',
    templateUrl: '../../views/sign.in.html',
    providers: [HttpService, UserService, CookieService],
    styles: [`
        body {
          padding-top: 40px;
          padding-bottom: 40px;
          background-color: #F2F2F2;
        }
        
        .row {
            margin-right: 0;
            margin-right: 0;
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

export class SignInComponent {

    constructor(private userService: UserService,
                private cookieService: CookieService,
                private router: Router,
                ){}
    isIncorrectLoginOrPassword: boolean = false;
    isWrongRights: boolean = false;
    isError: boolean = false;
    isUnknownEmail: boolean = false;
    isSignIn:boolean = true;
    isForgotPassword:boolean = false;
    isResetPassword:boolean = false;
    is:boolean = false;
    login: string;
    password: string;
    email: string;

    ngOnInit(){
    }
    //TODO Шифрование пароля на стороне клиента
    logIn(){
        this.isIncorrectLoginOrPassword = false;
        this.isWrongRights = false;
        this.isError = false;
        try {
            this.userService.authorization(this.login, this.password).subscribe((response:Response) => {
                let responseBody = response.json();
                if (responseBody != null) {
                    this.cookieService.setCookie(responseBody[0]);
                    this.router.navigate(['']);
                    return;
                }else{
                    this.isIncorrectLoginOrPassword = true;
                    return;
                }
            });
        }catch (exception){
            this.isError = true;
        }
    }

    resetPassword(){
        this.userService.resetPassword(this.email).subscribe((response:Response) => {
            let responseBody = response.json();
            if(responseBody){
               this.isForgotPassword = false;
               this.isResetPassword = true;
            }else{
                this.isUnknownEmail = true;
            }
        });
    }

    forgetPassword(){
        this.isForgotPassword = true;
        this.isSignIn = false;
    }

    returnToSignIn(){
        this.isForgotPassword = false;
        this.isResetPassword = false;
        this.isSignIn = true;
    }

    returnToSite(){
        location.href = AppSettings.MAIN_SITE_URL;
    }

}