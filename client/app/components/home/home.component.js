import './home.styl';
import {HomeComponent as controller} from './home.component';
import template from './home.html';
import _ from 'lodash';

export const homeDirective = ()=> {
  return {
    template,
    controller,
    controllerAs: 'vm',
    restrict: 'E',
    replace: true,
    scope: {}
  };
};

class HomeComponent {
  // bind to this and not $scope
  // because of controllerAs.
  constructor() {
    this.title = 'Welcome to the State of States app!';
    this.subtitle = "Let's see what you know about states";
  }
}
// could also just export the class up top as well
export {HomeComponent};
