import {Injectable} from '@angular/core';
import {CookieService} from "../cookie.service";
import {HttpService} from "../http.service";
import {Teacher} from "../../models/teacher";

@Injectable()
export class TeacherService{

    constructor(private httpService: HttpService, private cookieService: CookieService) { }

    get(id: string) {
        return this.httpService.get('teachers/get/' + id, this.cookieService.createAuthorizationHeader());
    }

    getByUser(id: string) {
        return this.httpService.get('teachers/getByUser/' + id, this.cookieService.createAuthorizationHeader());
    }

    getAll() {
        return this.httpService.get('teachers/getAll/', this.cookieService.createAuthorizationHeader());
    }

    update(teacher: Teacher) {
        return this.httpService.post('teachers/update/', teacher, this.cookieService.createAuthorizationHeader());
    }

    create(teacher: Teacher) {
        return this.httpService.post('teachers/create/', teacher, this.cookieService.createAuthorizationHeader());
    }

    delete(id: string, userId: string) {
        return this.httpService.get('teachers/delete/' + id + '&' + userId, this.cookieService.createAuthorizationHeader());
    }

    uploadPhoto(uploadFile: any, id: string) {
        let object = [uploadFile, id];
        return this.httpService.postFile('teachers/uploadPhoto/', object, this.cookieService.createAuthorizationHeader());
    }

    uploadWorkVolume(file) {
        return this.httpService.postFile('teachers/uploadWorkVolume', file, this.cookieService.createAuthorizationHeader());
    }

    /////TeachersWorks

    getTeachersWorks(id: string) {
        return this.httpService.get('teachers/getTeachersWorks/' + id, this.cookieService.createAuthorizationHeader());
    }


}