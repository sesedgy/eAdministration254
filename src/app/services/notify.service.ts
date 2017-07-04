import {Injectable} from '@angular/core';
declare let $: any;

@Injectable()
export class NotifyService{

    private switchOn: boolean = false;

    showLoading() {
        $.LoadingOverlaySetup({
            image           : "assets/DoubleRing.gif",
            maxSize         : "200px",
            minSize         : "100px",
            resizeInterval  : 0,
            size            : "100%"
        });
        $.LoadingOverlay("show");
        this.switchOn = true;
    }

    stopShowLoading(){
        $.LoadingOverlay("hide");
        this.switchOn = false;
    }

    getSwitchOn(){
        return this.switchOn;
    }


}