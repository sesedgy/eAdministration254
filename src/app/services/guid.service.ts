import {Injectable} from '@angular/core';

@Injectable()
export class GuidService{

    /**
     * Создает GUID
     *
     * @return {string} Guid.
     */
    createGuid(){
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
            this.s4() + '-' + this.s4() + this.s4() + this.s4();
    }

    private s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
}