import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

// To use toPromise on an Observable
// An Observable is a stream of events we can process with array-like operators
// The RxJS Observables library augments support for observables
import 'rxjs/add/operator/toPromise';


import { Hero } from './hero';

@Injectable()
export class HeroService{
    
    private heroesUrl = 'app/heroes'; // URL to our web api
    private headers = new Headers({'Content-Type': 'application/json'});// for use in the http put method in update()
    
    constructor(private http: Http){}
    
    /** Simulates network latency */
    getHeroes(): Promise<Hero[]> {
        return new Promise<Hero[]>(resolve => setTimeout(resolve, 2000)).then(() => this.getHeroesFast());
    }
    
    getHeroesFast(): Promise<Hero[]> {
        //return Promise.resolve(HEROES); HEROES array defined in mock-heroes
        
        // using HTTP instead of mock-heroes
    return this.http.get(this.heroesUrl)    // Angular http.get (and other http service methods) returns an RxJS Observable
            .toPromise()                        // convert Observable to Promise (importing the toPromise operator required)
            .then(response => response.json().data as Hero[])   // then callback extracts data within the Http Response; in-memory web API returns an object with data property
            .catch(this.handleError);
    }
    
    getHero(id: number): Promise<Hero>{
        return this.getHeroes().then(heroes => heroes.find(hero => hero.id === id));
    }
    
    private handleError(error: any): Promise<any>{
        console.error('An error occured', error); // for debugging or demo purposes
        return Promise.reject(error.message || error);
    }
    
    // update uses HTTP put to persist changes server-side
    update(hero: Hero): Promise<Hero>{
        const url = `${this.heroesUrl}/${hero.id}`; // must be back-ticks (why?)
        
        return this.http
            .put(url, JSON.stringify(hero), {headers: this.headers})
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }
    
    // add a hero from user input
    create(name: string): Promise<Hero> {
        return this.http
        .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
        .toPromise()
        .then(res => res.json().data)
        .catch(this.handleError);
    }
    
    // delete a hero
delete(id: number): Promise<void>{
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
}
    
}