import {Injectable} from '@angular/core';
import {CookieService} from "../cookie.service";
import {HttpService} from "../http.service";
import {Discipline} from "../../models/dicipline";

@Injectable()
export class DisciplineService{

    constructor(private httpService: HttpService, private cookieService: CookieService) { }

    get(id: string) {
        return this.httpService.get('disciplines/get/' + id, this.cookieService.createAuthorizationHeader());
    }

    getAll() {
        return this.httpService.get('disciplines/getAll/', this.cookieService.createAuthorizationHeader());
    }

    update(discipline: Discipline) {
        return this.httpService.post('disciplines/update/', discipline, this.cookieService.createAuthorizationHeader());
    }

    create(discipline: Discipline) {
        return this.httpService.post('disciplines/create/', discipline, this.cookieService.createAuthorizationHeader());
    }

    delete(id: string) {
        return this.httpService.get('disciplines/delete/' + id, this.cookieService.createAuthorizationHeader());
    }
}