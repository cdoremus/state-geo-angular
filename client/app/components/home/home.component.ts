import {Component} from '@angular/core';

@Component({
    selector: 'home',
    templateUrl:  './home.html',
    styleUrls: ['./home.css']
})
export default class HomeComponent {
  title: string;
  subtitle: string;
  constructor() {
    this.title = 'Welcome to the US States Quiz!';
    this.subtitle = "Let's see what you know about the states";
  }
}
