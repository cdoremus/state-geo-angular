import './login.styl';
import {LoginComponent as controller} from './login.component';
import {UserService as userService} from '../common/user.service';
import template from './login.html';

export const loginDirective = ()=> {
  return {
    controller,
    template,
    controllerAs: 'vm',
    scope: {},
    replace: true,
    restrict: 'E'
  }
};

class LoginComponent {
  constructor(userService) {
    this.greeting = 'LoginComponent!';
    this.service = userService;
    this.serviceData = [];
    this.username = '';
    this.password = '';
    this.currentUser = {};
  }

  login() {
    this.currentUser = this.service.login(this.username, this.password);
    console.log("Current User: ", this.currentUser);
  }

}

LoginComponent.$inject = ['userService'];

export {LoginComponent};
