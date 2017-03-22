System.register(['@angular/core', "@angular/http"], function(exports_1, context_1) {
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
    var core_1, http_1;
    var CookieService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            CookieService = (function () {
                function CookieService() {
                }
                /**
                 * Создает Header Authorization для запроса
                 *
                 * @return {RequestOptions} header c Id токена.
                 */
                CookieService.prototype.createAuthorizationHeader = function () {
                    var cookie = document.cookie.slice(8, 44);
                    var headers = new http_1.Headers({ "Authorization": cookie });
                    return new http_1.RequestOptions({ headers: headers });
                };
                /**
                 * Добавляет куки с tokenId сроком жизни - 1 день
                 *
                 * @param {string} tokenId.
                 */
                CookieService.prototype.setCookie = function (tokenId) {
                    //Куки действительны втечении одного дня
                    var date = new Date();
                    date.setDate(date.getDate() + 1);
                    document.cookie = "TokenId=" + tokenId + ";path=/;expires=" + date.toUTCString() + ";";
                };
                /**
                 * Достает tokenId из кукисов
                 *
                 * @return {string} tokenId.
                 */
                CookieService.prototype.getTokenId = function () {
                    return document.cookie.slice(8, 44);
                };
                /**
                 * Удаляет куки с tokenId
                 *
                 */
                CookieService.prototype.deleteCookie = function () {
                    document.cookie = "TokenId" + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                };
                CookieService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], CookieService);
                return CookieService;
            }());
            exports_1("CookieService", CookieService);
        }
    }
});
//# sourceMappingURL=cookie.service.js.map