import {Component, OnInit} from "@angular/core";
import {Employee} from "../../models/employee";
import {User} from "../../models/user";
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
    private isChangeEmail: boolean;

    ngOnInit(){
        this.employee = new Employee;
        this.user = new User;
        $('.input-mask-phone').mask('+7(999)999-99-99');

    }

    changeEmail(){
    }

    changeLogin(){
    }

    changePassword(){
    }


    changeEmailSave(){

    }

    changePasswordSave(){

    }
}