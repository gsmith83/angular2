import {ModuleWithProviders } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HeroesComponent} from './heroes.component';
import {DashboardComponent} from './dashboard.component';
import {HeroDetailComponent} from './hero-detail.component';

/** Routes are an array of route definitions */
const appRoutes: Routes = [
    {
        path: 'heroes', /** router matches the path to the relative URL in the browser address bar (heroes) */
        component: HeroesComponent /** the component the router should create  */
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {/** Redirect route to allow Dashboard to be displayed immediately */
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {/** For hero detail, we must tell the HeroDetailComponent which hero using 'id' */
        path: 'detail/:id', /** : means :id is a placeholder */
        component: HeroDetailComponent
    },
];

/** export the routing module that we'll add to our root AppModule */
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);