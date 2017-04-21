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
import {TeachersListComponent} from "./components/teachersList.component";
import {AccountSettingsComponent} from "./components/account/accountSettings.component";
import {DisciplinesListComponent} from "./components/settings/disciplinesList.component";
import {SettingsComponent} from "./components/settings.component";
import {TeachersComponent} from "./components/teachers.component";
import {DisciplineService} from "./services/api/discipline.service";
import {FacultyService} from "./services/api/faculty.service";
import {FacultiesListComponent} from "./components/settings/facultiesList.component";
import {NgSpinningPreloader} from "ng2-spinning-preloader";
import {DataTableModule} from "primeng/components/datatable/datatable";
import {InputTextModule} from "primeng/components/inputtext/inputtext";
import {ButtonModule} from "primeng/components/button/button";
import {GuidService} from "./services/guid.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DropdownModule} from "primeng/components/dropdown/dropdown";

//Маршруты
const settingsRoutes: Routes =[
    {path: '', component: DisciplinesListComponent},
    {path: 'disciplines', component: DisciplinesListComponent},
    {path: 'faculties', component: FacultiesListComponent}
];

const teachersRoutes: Routes =[
    {path: '', component: TeachersListComponent},
    {path: 'list', component: TeachersListComponent}
];

const mainRoutes: Routes =[
    { path: '', component: MainPageComponent},
    { path: 'account_settings', component: AccountSettingsComponent},
    { path: 'Teachers', component: TeachersComponent, children: teachersRoutes},
    { path: 'settings', component: SettingsComponent, children: settingsRoutes},

];

const appRoutes: Routes =[
    { path: 'Login', component: SignInComponent, canActivate:[IsAuthGuard]},
    { path: '', component: MainComponent, canActivate: [AuthGuard], children: mainRoutes}
];

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forRoot(appRoutes),
        HttpModule,
        BrowserAnimationsModule,
        DataTableModule,InputTextModule,ButtonModule,DropdownModule],
    declarations: [
        AppComponent,
        MainComponent,
        SignInComponent,
        HeaderComponent,
        SidebarComponent,
        MainPageComponent,
        SettingsComponent,
        TeachersComponent,
        TeachersListComponent,
        DisciplinesListComponent,
        FacultiesListComponent,
        AccountSettingsComponent
    ],
    providers: [
        NgSpinningPreloader,
        AuthGuard,
        IsAuthGuard,
        HttpService,
        GuidService,
        UserService,
        CookieService,
        DisciplineService,
        FacultyService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }