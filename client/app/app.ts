/// <reference path="../../typings/browser.d.ts"/>
import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import HomeComponent from './components/home/home.component';
import AdjacentComponent from './components/adjacent/adjacent.component';
import AdjacentQuizComponent from './components/adjacentQuiz/adjacentQuiz.component';
import CapitalQuizComponent  from './components/capitalQuiz/capitalQuiz.component';

@Component ({
    selector: 'app',
    templateUrl: 'app/app.html',
    styleUrls: ['app/app.css'],
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  {path: '/home', name: 'Home', component: HomeComponent, useAsDefault: true },
  {path: '/capitalQuiz', name: 'CapitalQuiz', component: CapitalQuizComponent },
  {path: '/adjacentQuiz', name: 'AdjacentQuiz', component: AdjacentQuizComponent }
])
export default class AppComponent {
}

