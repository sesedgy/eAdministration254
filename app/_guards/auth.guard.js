System.register(['@angular/core', '@angular/router', "../services/http.service", "../appSettings"], function(exports_1, context_1) {
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
    var core_1, router_1, http_service_1, appSettings_1;
    var AuthGuard;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_service_1_1) {
                http_service_1 = http_service_1_1;
            },
            function (appSettings_1_1) {
                appSettings_1 = appSettings_1_1;
            }],
        execute: function() {
            AuthGuard = (function () {
                function AuthGuard(router, httpService) {
                    this.router = router;
                    this.httpService = httpService;
                    this.rightsForLogIn = appSettings_1.AppSettings.RIGHTS_FOR_LOGIN;
                }
                AuthGuard.prototype.canActivate = function (route, state) {
                    var rights = "";
                    this.rightsForLogIn.forEach(function (item) {
                        // rights += item + ";";
                    });
                    var cookie = document.cookie.slice(7, 39);
                    if (cookie != null) {
                        this.httpService.get('users/authorization/' + cookie + '&' + rights).subscribe(function (body) {
                            if (body) {
                                return true;
                            }
                        });
                    }
                    this.router.navigate(['/login']);
                    return false;
                };
                AuthGuard = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [router_1.Router, http_service_1.HttpService])
                ], AuthGuard);
                return AuthGuard;
            }());
            exports_1("AuthGuard", AuthGuard);
        }
    }
});
//# sourceMappingURL=auth.guard.js.map