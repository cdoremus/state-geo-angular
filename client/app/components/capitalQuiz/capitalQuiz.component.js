import './capitalQuiz.styl';
import {CapitalQuizComponent as controller} from './capitalQuiz.component';
import {StateService as stateService} from '../common/state.service';
import * as util from '../common/utilities';
import template from './capitalQuiz.html';

export const capitalQuizDirective = ()=> {
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

class CapitalQuizComponent {
  constructor(stateService) {
    this.title = 'Do you know the state capitals?';
    this.service = stateService;
    this.selectedState = {};
    this.states = [];
    this.selectedCapital = {};
    this.uiMessage = '';
    this.populatePageData();
    
  }

  populatePageData() {
  	this.service.queryStates()
		.then(result => {
      // this.states = util.sortArrayByProperty(result.data, 'name');
      this.states = result.data;
      })
    //select a random state from array
    .then(result => {
      this.selectedState = util.randomArrayItem(this.states);
      console.log("Selected state for capitals quiz: ", this.selectedState);
    });
  }

  /**
   * Check selected capital against the selected state 
   *  
   */
  checkSelected() {
    try {
      //clear previous values
      // this.clearParentMessages();
      let selectedCapitalCorrect = this.service.checkSelectedCapital(this.selectedState, this.selectedCapital);
      console.log("Correct capital: " +  this.selectedCapitalCorrect);
      if (selectedCapitalCorrect) {
        this.uiMessage = 'Selected capital is correct';
      } else {
        this.uiMessage = 'Selected capital is NOT correct';        
      }
    } catch(error) {
      console.log("Error in CapitalQuizComponent.checkSelected(): ", error);
        this.uiMessage = error.message;
    }
  }

  setSelectedState(state) {
    this.selectedState = state;
  }

  resetSelectedCapital() {
    this.selectedCapital = {};
    this.uiMessage = '';
  }
  
}

CapitalQuizComponent.$inject = ['stateService'];

export {CapitalQuizComponent};
