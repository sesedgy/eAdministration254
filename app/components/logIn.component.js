System.register(['@angular/core', "../services/http.service", "../appSettings", "../services/cookie.service", "@angular/router"], function(exports_1, context_1) {
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
    var core_1, http_service_1, appSettings_1, cookie_service_1, router_1;
    var LogInComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_service_1_1) {
                http_service_1 = http_service_1_1;
            },
            function (appSettings_1_1) {
                appSettings_1 = appSettings_1_1;
            },
            function (cookie_service_1_1) {
                cookie_service_1 = cookie_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            LogInComponent = (function () {
                function LogInComponent(httpService, router) {
                    this.httpService = httpService;
                    this.router = router;
                    this.rightsForLogIn = appSettings_1.AppSettings.RIGHTS_FOR_LOGIN;
                    this.isIncorrectLoginOrPassword = false;
                    this.isWrongRights = false;
                    this.isError = false;
                }
                //TODO Шифрование пароля на стороне клиента
                LogInComponent.prototype.logIn = function () {
                    this.isIncorrectLoginOrPassword = false;
                    this.isWrongRights = false;
                    this.isError = false;
                    try {
                        var response = new cookie_service_1.CookieService().createAuthorizationHeader();
                        if (response) {
                            var cookieService = new cookie_service_1.CookieService();
                            cookieService.setCookie(response[0]);
                            this.router.navigate(['/']);
                        }
                        else {
                            this.isIncorrectLoginOrPassword = true;
                            return;
                        }
                    }
                    catch (exception) {
                        this.isError = true;
                    }
                };
                LogInComponent = __decorate([
                    core_1.Component({
                        selector: 'logIn',
                        templateUrl: 'app/views/logIn.html',
                        providers: [http_service_1.HttpService],
                        styles: ["\n        body {\n          padding-top: 40px;\n          padding-bottom: 40px;\n          background-color: #eee;\n        }\n        \n        .form-signin {\n          max-width: 330px;\n          padding: 15px;\n          margin: 0 auto;\n        }\n        .form-signin .form-signin-heading,\n        .form-signin .checkbox {\n          margin-bottom: 10px;\n        }\n        .form-signin .checkbox {\n          font-weight: normal;\n        }\n        .form-signin .form-control {\n          position: relative;\n          height: auto;\n          -webkit-box-sizing: border-box;\n             -moz-box-sizing: border-box;\n                  box-sizing: border-box;\n          padding: 10px;\n          font-size: 16px;\n        }\n        .form-signin .form-control:focus {\n          z-index: 2;\n        }\n        .form-signin input[type=\"text\"] {\n          margin-bottom: -1px;\n          border-bottom-right-radius: 0;\n          border-bottom-left-radius: 0;\n        }\n        .form-signin input[type=\"password\"] {\n          margin-bottom: 10px;\n          border-top-left-radius: 0;\n          border-top-right-radius: 0;\n        }\n    "]
                    }), 
                    __metadata('design:paramtypes', [http_service_1.HttpService, router_1.Router])
                ], LogInComponent);
                return LogInComponent;
            }());
            exports_1("LogInComponent", LogInComponent);
        }
    }
});
//# sourceMappingURL=logIn.component.js.map