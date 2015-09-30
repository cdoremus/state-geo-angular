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
    restrict: 'E',
    bindToController: true,    
    transclude: true
  }
};

class StateDropdownComponent {
  constructor(stateDropdownService) {
    this.greeting = 'StateDropdownComponent!';
    this.service = stateDropdownService;
    this.selectedState = {};
    this.states = [];
  }

  populateDropdown() {
    
  }

  clickHandler() {
    
  }

}

StateDropdownComponent.$inject = ['stateDropdownService'];

export {StateDropdownComponent};
