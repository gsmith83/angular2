import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {Location } from '@angular/common';

import { Hero } from './hero';
import {HeroService } from './hero.service';

@Component({
    moduleId: module.id,
    selector: 'my-hero-detail',
    templateUrl: 'hero-detail.component.html',
    styleUrls: ['hero-detail.component.css'],
})

export class HeroDetailComponent implements OnInit{
    constructor(private heroService: HeroService, private route: ActivatedRoute, private location: Location){} /** Have services injected, and save their values */
    
    hero: Hero;
    
    ngOnInit(): void{
        this.route.params.forEach((params: Params) => { /** use Params to extract the id from the ActivateRoute and use HeroService to fetch the hero with that id */
            let id = +params['id']; /** Javascript + operator converts id from string to a number */
            this.heroService.getHero(id).then(hero => this.hero = hero);
        })
    }
    
    /** for future link; navigates backward one step in browser's history using Location service */
    goBack(): void{
        this.location.back();
    }
    
    /** To persist changes to hero details */
    save(): void{
        this.heroService.update(this.hero).then(() => this.goBack());
    }
}    