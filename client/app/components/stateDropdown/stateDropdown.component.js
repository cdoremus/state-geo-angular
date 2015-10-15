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
      componentLabel: '@'
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
  }

  /** Fill states array, pick a random one to display in drop down
   * and notify Rx Observable in StateService that the selected
   * state has changed.
   */
  populatePageData() {
  	this.service.queryStates()
		.then(result => {
      this.states = util.sortArrayByProperty(result.data, 'name');
      })
    .then(result => {
      //select a random state from array
      this.selectedState = util.randomArrayItem(this.states);
      //notify StateService RxObservable 
      this.service.selectedStateChanged(this.selectedState);
    });
  }
  
  /**
   * Notify Rx Observable in StateService that the selected
   * state has changed.
   */
  onClick() {
    this.service.selectedStateChanged(this.selectedState);
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
