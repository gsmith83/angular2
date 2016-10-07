"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
// To use toPromise on an Observable
// An Observable is a stream of events we can process with array-like operators
// The RxJS Observables library augments support for observables
require('rxjs/add/operator/toPromise');
var HeroService = (function () {
    function HeroService(http) {
        this.http = http;
        this.heroesUrl = 'app/heroes'; // URL to our web api
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' }); // for use in the http put method in update()
    }
    /** Simulates network latency */
    HeroService.prototype.getHeroes = function () {
        var _this = this;
        return new Promise(function (resolve) { return setTimeout(resolve, 2000); }).then(function () { return _this.getHeroesFast(); });
    };
    HeroService.prototype.getHeroesFast = function () {
        //return Promise.resolve(HEROES); HEROES array defined in mock-heroes
        // using HTTP instead of mock-heroes
        return this.http.get(this.heroesUrl) // Angular http.get (and other http service methods) returns an RxJS Observable
            .toPromise() // convert Observable to Promise (importing the toPromise operator required)
            .then(function (response) { return response.json().data; }) // then callback extracts data within the Http Response; in-memory web API returns an object with data property
            .catch(this.handleError);
    };
    HeroService.prototype.getHero = function (id) {
        return this.getHeroes().then(function (heroes) { return heroes.find(function (hero) { return hero.id === id; }); });
    };
    HeroService.prototype.handleError = function (error) {
        console.error('An error occured', error); // for debugging or demo purposes
        return Promise.reject(error.message || error);
    };
    // update uses HTTP put to persist changes server-side
    HeroService.prototype.update = function (hero) {
        var url = this.heroesUrl + "/" + hero.id; // must be back-ticks (why?)
        return this.http
            .put(url, JSON.stringify(hero), { headers: this.headers })
            .toPromise()
            .then(function () { return hero; })
            .catch(this.handleError);
    };
    // add a hero from user input
    HeroService.prototype.create = function (name) {
        return this.http
            .post(this.heroesUrl, JSON.stringify({ name: name }), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    // delete a hero
    HeroService.prototype.delete = function (id) {
        var url = this.heroesUrl + "/" + id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    HeroService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], HeroService);
    return HeroService;
}());
exports.HeroService = HeroService;
//# sourceMappingURL=hero.service.js.map