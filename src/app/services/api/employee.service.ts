import {Injectable} from '@angular/core';
import {CookieService} from "../cookie.service";
import {HttpService} from "../http.service";
import {Employee} from "../../models/employee";
import {User} from "../../models/user";

@Injectable()
export class EmployeeService{

    constructor(private httpService: HttpService, private cookieService: CookieService) { }

    get(id: string) {
        return this.httpService.get('employees/get/' + id, this.cookieService.createAuthorizationHeader());
    }

    getByUser(id: string) {
        return this.httpService.get('employees/getByUser/' + id, this.cookieService.createAuthorizationHeader());
    }

    getAll() {
        return this.httpService.get('employees/getAll/', this.cookieService.createAuthorizationHeader());
    }

    update(employee: Employee) {
        return this.httpService.post('employees/update/', employee, this.cookieService.createAuthorizationHeader());
    }

    create(employee: Employee) {
        return this.httpService.post('employees/create/', employee, this.cookieService.createAuthorizationHeader());
    }

    delete(id: string, userId: string) {
        return this.httpService.get('employees/delete/' + id + '&' + userId, this.cookieService.createAuthorizationHeader());
    }

    uploadPhoto(uploadFile: any, id: string) {
        let object = [uploadFile, id];
        return this.httpService.post('employees/uploadPhoto/', object, this.cookieService.createAuthorizationHeader());
    }
}