import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import {HeroSearchService} from './hero-search.service';
import {Hero} from './hero';

@Component({
    moduleId: module.id,
    selector: 'hero-search',
    templateUrl: 'hero-search.component.html',
    styleUrls: ['hero-search.component.css'],
    providers: [HeroSearchService]
})

export class HeroSearchComponent implements OnInit{
    heroes: Observable<Hero[]>; // going to turn the stream of search terms into a stream of Hero arrays
    private searchTerms = new Subject<string>();    // A subject is a producer of an observable; searchTerms produces an Observable of strings
    // A subject is also an Observable
    
    constructor(private heroSearchService: HeroSearchService, private router: Router) { }
    
    // Push a search term into the observable stream
    // Each call to search puts a new string into this subject's observable string by calling next
    search(term: string): void{
        this.searchTerms.next(term);
    }
    
    ngOnInit(): void{
        this.heroes = this.searchTerms
            .debounceTime(300)      //wait for .3 seconds to reduce requests
            .distinctUntilChanged()  // ignore if next search term is same as previous
            // switchMap calls our search service for each search term
            // switchMap preserves the original request order
            .switchMap(term => term 
            // return the http search observable or the observable of empty heroes
            ? this.heroSearchService.search(term) : Observable.of<Hero[]>([]))
            .catch(error => {
            // TODO: real error handling
                console.log(error);
                return Observable.of<Hero[]>([]);
            });
    }
    
    gotoDetail(hero: Hero): void {
        let link = ['/detail', hero.id];
        this.router.navigate(link);
    }
    
}