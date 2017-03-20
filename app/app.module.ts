import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import {LogInComponent} from "./components/logIn.component";
import {MainPageComponent} from "./components/mainPage.component";
import {AuthGuard} from "./_guards/auth.guard";
import {HeaderComponent} from "./components/header.component";
import {HttpService} from "./services/http.service";

//Маршруты
const appRoutes: Routes =[
    { path: 'login', component: LogInComponent},
    { path: '', component: MainPageComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [ BrowserModule, ReactiveFormsModule, FormsModule, RouterModule.forRoot(appRoutes), HttpModule],
    declarations: [
        AppComponent,
        LogInComponent,
        MainPageComponent,
        HeaderComponent
    ],
    providers: [ AuthGuard, HttpService ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }