import {Injectable} from '@angular/core';
import {CookieService} from "../cookie.service";
import {HttpService} from "../http.service";

@Injectable()
export class FileService{

    constructor(private httpService: HttpService, private cookieService: CookieService) { }

    getFile(path: string) {
        return this.httpService.post('files/getFile/', path, this.cookieService.createAuthorizationHeader());
        // return this.httpService.get('files/getFile/' + path, this.cookieService.createAuthorizationHeader());
    }

    getImage(path: string) {
        return this.httpService.post('files/getImage/', path, this.cookieService.createAuthorizationHeader());
        // return this.httpService.get('files/getFile/' + path, this.cookieService.createAuthorizationHeader());
    }

}