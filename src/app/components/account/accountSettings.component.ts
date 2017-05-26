import {Component, OnInit} from "@angular/core";
import {Employee} from "../../models/employee";
import {User} from "../../models/user";
import {UserService} from "../../services/api/user.service";
import {Response} from "@angular/http";
import {EmployeeService} from "../../services/api/employee.service";
import {CookieService} from "../../services/cookie.service";
declare let $: any;

@Component({
    selector: 'accountSettings',
    templateUrl: './../../views/account/accountSettings.html'
})

export class AccountSettingsComponent implements OnInit{

    private employee: Employee;
    private userName: string;
    private email: string;
    private role: string;
    private name: string;
    private photoSrc: string;
    private modalHeader: string;
    private newPassword: string;
    private newPasswordRepeat: string;
    private isPasswordsSame: boolean;
    private isChangeEmail: boolean;

    constructor(private userService: UserService,
                private employeeService: EmployeeService,
                private cookieService: CookieService){}

    ngOnInit(){
        this.employee = new Employee();
        this.employeeService.getByUser(this.cookieService.getCurrentUserLogin()).subscribe((response: Response) => {
            if(response != null) {
                this.employee = response.json();
                this.name = this.employee.LastName + " " + this.employee.FirstName + " " + this.employee.MiddleName;
            }
        });
        this.userService.getUserInfo(this.cookieService.getCurrentUserLogin()).subscribe((response: Response) => {
            if(response != null) {
                this.userName = response[0];
                this.email = response[1];
                this.role = response[2];
            }
        });
        $('.input-mask-phone').mask('+7(999)999-99-99');

    }

    saveChanges(){
        this.employeeService.update(this.employee).subscribe((response:Response) =>
        {
            if(response.status === 200) {
                $.gritter.add({
                    title: 'Данные успешно изменены',
                    class_name: 'gritter-success'
                });
            }
        });
    }

    changeEmail(){
        this.userService.isLoginAndEmailFree(null, this.email).subscribe((response:Response) =>
        {
            if(response.json()[1]) {
                this.userService.changeEmail(this.userName, this.email).subscribe((response: Response) => {
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
        this.userService.isLoginAndEmailFree(this.userName, null).subscribe((response:Response) =>
        {
            if(response.json()[0]) {
                this.userService.changeLogin(this.email, this.userName).subscribe((response: Response) => {
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
            this.userService.changePassword(this.userName, this.newPassword).subscribe((response: Response) => {
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