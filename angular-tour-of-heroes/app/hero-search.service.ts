import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import {Hero} from './hero';

// A user will type a name into a search box, and this will make repeated HTTP requests for heroes filtered by the name
// Sends search queries to our server's web api

@Injectable()
export class HeroSearchService{

    constructor(private http: Http){}
    
search(term: string): Observable<Hero[]>{
    return this.http.get(`app/heroes/?name=${term}`)
        .map((r: Response) => r.json().data as Hero[]); // don't convert to promise; return observable directly
}
}