import {Injectable} from '@angular/core';
import {CookieService} from "../cookie.service";
import {HttpService} from "../http.service";
import {Discipline} from "../../models/dicipline";

@Injectable()
export class DisciplineService{

    constructor(private httpService: HttpService, private cookieService: CookieService) { }

    get(id: string) {
        return this.httpService.get('Disciplines/get/' + id, this.cookieService.createAuthorizationHeader());
    }

    getAll() {
        return this.httpService.get('Disciplines/getAll/', this.cookieService.createAuthorizationHeader());
    }

    update(discipline: Discipline) {
        return this.httpService.post('Disciplines/update/', discipline, this.cookieService.createAuthorizationHeader());
    }

    create(discipline: Discipline) {
        return this.httpService.post('Disciplines/create/', discipline, this.cookieService.createAuthorizationHeader());
    }

    delete(id: string) {
        return this.httpService.get('Disciplines/delete/' + id, this.cookieService.createAuthorizationHeader());
    }
}