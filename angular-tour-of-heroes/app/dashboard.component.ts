import {Component, OnInit} from '@angular/core';
import {Hero} from './hero';
import {HeroService} from './hero.service';
import {Router} from '@angular/router';

@Component({
        moduleId: module.id,
        selector: 'my-dashboard',
        /** template: '<h3>My Dashboard</h3>' use template file instead */
        templateUrl: 'dashboard.component.html',
        styleUrls: ['dashboard.component.css'],
})

export class DashboardComponent implements OnInit{
    heroes: Hero[] = [];
    
    constructor(
        private router: Router, /** inject router */
        private heroService: HeroService){}/** inject the HeroService in constructor and hold in in a private field */
    
    ngOnInit(): void{ /** Inside ngOnInit lifecycle hook, call the service to get heroes */
        this.heroService.getHeroes().then(heroes => this.heroes = heroes.slice(1,5));
    }
    
    gotoDetail(hero: Hero): void {
        let link = ['/detail', hero.id]; /** set a route link parameters array */
        this.router.navigate(link);     /** pass array to the router's navigate method */
    }
}