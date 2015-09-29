import './stateDropdown.styl';
import {StateDropdownComponent as controller} from './stateDropdown.component';
import {StateDropdownService as stateDropdownService} from './stateDropdown.service';
import template from './stateDropdown.html';

export const stateDropdownDirective = ()=> {
  return {
    controller,
    template,
    controllerAs: 'vm',
    scope: {},
    replace: true,
    restrict: 'E'
  }
};

class StateDropdownComponent {
  constructor(stateDropdownService) {
    this.greeting = 'StateDropdownComponent!';
    this.service = stateDropdownService;
    this.serviceData = [];
  }

  queryService() {
  	/* The this.service.query() call returns a promise. 
  		Using an arrow function points 'this' to the class
  		context not the function context in ES5 */
  	// this.service.query()
		// .then(result => this.serviceData = result.data);
  }

}

StateDropdownComponent.$inject = ['stateDropdownService'];

export {StateDropdownComponent};
