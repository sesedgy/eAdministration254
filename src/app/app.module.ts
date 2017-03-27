import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import {SignInComponent} from "./components/parentComponents/signIn.component";
import {MainPageComponent} from "./components/mainPage.component";
import {AuthGuard} from "./_guards/auth.guard";
import {HeaderComponent} from "./components/parentComponents/header.component";
import {HttpService} from "./services/http.service";
import {UserService} from "./services/api/user.service";
import {CookieService} from "./services/cookie.service";
import {IsAuthGuard} from "./_guards/isAuth.guard";
import {MainComponent} from "./components/parentComponents/main.component";
import {SidebarComponent} from "./components/parentComponents/sidebar.component";

//Маршруты
const mainRoutes: Routes =[
    { path: '', component: MainPageComponent}
];

const appRoutes: Routes =[
    { path: 'login', component: SignInComponent, canActivate:[IsAuthGuard]},
    { path: '', component: MainComponent, canActivate: [AuthGuard], children: mainRoutes}
];


@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forRoot(appRoutes),
        HttpModule],
    declarations: [
        AppComponent,
        MainComponent,
        SignInComponent,
        HeaderComponent,
        SidebarComponent,
        MainPageComponent
    ],
    providers: [
        AuthGuard,
        IsAuthGuard,
        HttpService,
        UserService,
        CookieService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }