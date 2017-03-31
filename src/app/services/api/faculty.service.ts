import {Injectable} from '@angular/core';
import {CookieService} from "../cookie.service";
import {HttpService} from "../http.service";
import {Faculty} from "../../models/faculty";

@Injectable()
export class FacultyService{

    constructor(private httpService: HttpService, private cookieService: CookieService) { }

    get(id: string) {
        return this.httpService.get('faculties/get/' + id, this.cookieService.createAuthorizationHeader());
    }

    getAll() {
        return this.httpService.get('faculties/getAll/', this.cookieService.createAuthorizationHeader());
    }

    update(faculty: Faculty) {
        return this.httpService.post('faculties/update/', faculty, this.cookieService.createAuthorizationHeader());
    }

    create(faculty: Faculty) {
        return this.httpService.post('faculties/create/', faculty, this.cookieService.createAuthorizationHeader());
    }

    delete(id: string) {
        return this.httpService.get('faculties/delete/' + id, this.cookieService.createAuthorizationHeader());
    }
}