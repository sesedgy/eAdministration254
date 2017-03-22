System.register(['@angular/core', '@angular/platform-browser', '@angular/forms', '@angular/router', '@angular/http', './app.component', "./components/parentComponents/logIn.component", "./components/mainPage.component", "./_guards/auth.guard", "./components/parentComponents/header.component", "./services/http.service", "./services/api/user.service", "./services/cookie.service", "./_guards/isAuth.guard", "./components/parentComponents/main.component"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, platform_browser_1, forms_1, router_1, http_1, app_component_1, logIn_component_1, mainPage_component_1, auth_guard_1, header_component_1, http_service_1, user_service_1, cookie_service_1, isAuth_guard_1, main_component_1;
    var mainRoutes, appRoutes, AppModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (logIn_component_1_1) {
                logIn_component_1 = logIn_component_1_1;
            },
            function (mainPage_component_1_1) {
                mainPage_component_1 = mainPage_component_1_1;
            },
            function (auth_guard_1_1) {
                auth_guard_1 = auth_guard_1_1;
            },
            function (header_component_1_1) {
                header_component_1 = header_component_1_1;
            },
            function (http_service_1_1) {
                http_service_1 = http_service_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (cookie_service_1_1) {
                cookie_service_1 = cookie_service_1_1;
            },
            function (isAuth_guard_1_1) {
                isAuth_guard_1 = isAuth_guard_1_1;
            },
            function (main_component_1_1) {
                main_component_1 = main_component_1_1;
            }],
        execute: function() {
            //Маршруты
            mainRoutes = [
                { path: '', component: mainPage_component_1.MainPageComponent }
            ];
            appRoutes = [
                { path: 'login', component: logIn_component_1.LogInComponent, canActivate: [isAuth_guard_1.IsAuthGuard] },
                { path: '', component: main_component_1.MainComponent, canActivate: [auth_guard_1.AuthGuard], children: mainRoutes }
            ];
            AppModule = (function () {
                function AppModule() {
                }
                AppModule = __decorate([
                    core_1.NgModule({
                        imports: [
                            platform_browser_1.BrowserModule,
                            forms_1.ReactiveFormsModule,
                            forms_1.FormsModule,
                            router_1.RouterModule.forRoot(appRoutes),
                            http_1.HttpModule],
                        declarations: [
                            app_component_1.AppComponent,
                            main_component_1.MainComponent,
                            logIn_component_1.LogInComponent,
                            header_component_1.HeaderComponent,
                            mainPage_component_1.MainPageComponent
                        ],
                        providers: [
                            auth_guard_1.AuthGuard,
                            isAuth_guard_1.IsAuthGuard,
                            http_service_1.HttpService,
                            user_service_1.UserService,
                            cookie_service_1.CookieService
                        ],
                        bootstrap: [app_component_1.AppComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppModule);
                return AppModule;
            }());
            exports_1("AppModule", AppModule);
        }
    }
});
//# sourceMappingURL=app.module.js.map