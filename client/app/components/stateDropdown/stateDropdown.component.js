import './stateDropdown.styl';
import {StateDropdownComponent as controller} from './stateDropdown.component';
import {StateService as stateService} from '../common/state.service';
import * as util from '../common/utilities';
import template from './stateDropdown.html';

export const stateDropdownDirective = ()=> {
  return {
    controller,
    template,
    controllerAs: 'vm',
    scope: {
      componentId: '@',
      componentLabel: '@',
      clickListener: '&',
      selectedStateListener: '&'
    },
    replace: true,
    bindToController: true,    
    restrict: 'E'
  }
};

class StateDropdownComponent {
  
  constructor(stateService) {
    this.service = stateService;
    this.populatePageData();
    this.states = [];
    this.selectedState = {};
    console.log("StateDropdownComponent: " + this.toString());
  }

  /* Fill adjacentStates array and pick a random one to display in drop down */
  populatePageData() {
  	this.service.queryAdjacentStates()
		.then(result => {
      this.states = util.sortArrayByProperty(result.data, 'name');
      })
    .then(result => {
      //select a random state from array
      this.selectedState = util.randomArrayItem(this.states);
      this.selectedStateListener({state: this.selectedState});
      console.log("Selected state in StateDropdownComponent: ", this.selectedState);
    });
  }
  
  onClick() {
      this.selectedStateListener({state: this.selectedState});
      this.clickListener({state: this.selectedState});
  }
  
  toString() {
    return `
      componentId: ${this.componentId},
      componentLabel: ${this.componentLabel},
      selectedState: ${this.selectedState},
      states: ${this.states}
      `    
  }
}

StateDropdownComponent.$inject = ['stateService'];

export {StateDropdownComponent};
