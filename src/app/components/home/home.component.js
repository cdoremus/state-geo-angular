import './home.styl';
import {HomeComponent as controller} from './home.component';
import template from './home.html';

export class HomeComponent {
  constructor() {
    this.title = 'Welcome to the US States Quiz!';
    this.subtitle = "Let's see what you know about the states";
  }
}

export const homeComponent = {
    template,
    controller,
    controllerAs: 'vm'
};

