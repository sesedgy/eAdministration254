import {Component, OnInit} from "@angular/core";
import {Employee} from "../../models/employee";
import {User} from "../../models/user";
import {UserService} from "../../services/api/user.service";
import {Response} from "@angular/http";
declare let $: any;

@Component({
    selector: 'accountSettings',
    templateUrl: './../../views/account/accountSettings.html'
})

export class AccountSettingsComponent implements OnInit{

    private employee: Employee;
    private user: User;
    private photoSrc: string;
    private modalHeader: string;
    private newEmail: string;
    private newPassword: string;
    private newPasswordRepeat: string;
    private isPasswordsSame: boolean;
    private isChangeEmail: boolean;

    constructor(private userService: UserService){}

    ngOnInit(){
        this.employee = new Employee;
        this.user = new User;
        $('.input-mask-phone').mask('+7(999)999-99-99');

    }

    changeEmail(){
        this.userService.isLoginAndEmailFree(null, this.user.Email).subscribe((response:Response) =>
        {
            if(response.json()[1]) {
                this.userService.changeEmail(this.user.Login, this.user.Email).subscribe((response: Response) => {
                    if (response.status === 200) {
                        $.gritter.add({
                            title: 'Ваш email успешно изменен',
                            class_name: 'gritter-success'
                        });
                    }
                });
            }
        });
    }

    changeLogin(){
        this.userService.isLoginAndEmailFree(null, this.user.Email).subscribe((response:Response) =>
        {
            if(response.json()[0]) {
                this.userService.changeLogin(this.user.Email, this.user.Login).subscribe((response: Response) => {
                    if (response.status === 200) {
                        $.gritter.add({
                            title: 'Ваш логин успешно изменен',
                            class_name: 'gritter-success'
                        });
                    }
                });
            }
        });
    }

    changePassword(){
        if(this.newPassword === this.newPasswordRepeat) {
            this.isPasswordsSame = false;
            this.userService.changePassword(this.user.Login, this.newPassword).subscribe((response: Response) => {
                if(response.status === 200) {
                    $.gritter.add({
                        title: 'Ваш пароль успешно изменен',
                        class_name: 'gritter-success'
                    });
                }
            });
        }else{
            this.isPasswordsSame = true;
        }
    }

}