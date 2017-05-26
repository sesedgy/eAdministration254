import {Injectable} from '@angular/core';
import {CookieService} from "../cookie.service";
import {HttpService} from "../http.service";
import {Department} from "../../models/department";

@Injectable()
export class DepartmentService{

    constructor(private httpService: HttpService, private cookieService: CookieService) { }

    get(id: string) {
        return this.httpService.get('departments/get/' + id, this.cookieService.createAuthorizationHeader());
    }

    getAll() {
        return this.httpService.get('departments/getAll/', this.cookieService.createAuthorizationHeader());
    }

    update(department: Department) {
        return this.httpService.post('departments/update/', department, this.cookieService.createAuthorizationHeader());
    }

    create(department: Department) {
        return this.httpService.post('departments/create/', department, this.cookieService.createAuthorizationHeader());
    }

    delete(id: string) {
        return this.httpService.get('departments/delete/' + id, this.cookieService.createAuthorizationHeader());
    }
}