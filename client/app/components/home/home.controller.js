// create our controller using the
// highly controversial class
import _ from 'lodash';

class HomeController {
  // bind to this and not $scope
  // because of controllerAs.
  constructor() {
    this.title = 'Welcome to the State of States app!';
    this.subtitle = "Let's see what you know about states";
  }
}
// could also just export the class up top as well
export {HomeController};
