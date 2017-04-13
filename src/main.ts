import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import {environment} from "./environments/environment";
import {enableProdMode} from "@angular/core";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);

