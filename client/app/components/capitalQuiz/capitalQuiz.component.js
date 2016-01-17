import './capitalQuiz.styl';
import {CapitalQuizComponent as controller} from './capitalQuiz.component';
import {StateService as stateService} from '../common/state.service';
import {ResultsMessage, ResultsMessageType} from '../quizResultsMessage/resultsMessage';
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

export class CapitalQuizComponent {
  constructor(stateService) {
    this.title = 'Do you know the state capitals?';
    this.service = stateService;
    this.selectedState = {};
    this.states = [];
    this.selectedCapital = {};
    this.populatePageData();
    /**
     * Register as an RxJs observer of selectedState changes
     */
    this.service.selectedStateSubject.subscribe((newSelectedState) => {
      this.selectedStateChanged(newSelectedState);      
    });
    
    this.resultsMessages = [];
 }

  populatePageData() {
  	this.service.queryStates()
		.then(result => {
      this.states = result.data;
      })
    //select a random state from array
    .then(result => {
      this.selectedState = util.randomArrayItem(this.states);
      console.log("Selected state for capitals quiz: ", this.selectedState);
    });
  }

  selectedStateChanged(newSelectedState) {
    //Set selectedState to new value
    this.selectedState = newSelectedState;
    this.resetSelectedCapital();
  }

  /**
   * Check selected capital against the selected state 
   *  
   */
  checkSelected() {
    let resultsMessages = [];
    try {
      let selectedCapitalCorrect = this.service.checkSelectedCapital(this.selectedState, this.selectedCapital);

      if (selectedCapitalCorrect) {
        resultsMessages.push(new ResultsMessage('Selected capital is correct', ResultsMessageType.success));        
      } else {
        resultsMessages.push(new ResultsMessage('Selected capital is NOT correct', ResultsMessageType.failure));
      }

    } catch(error) {
      console.log("Error in CapitalQuizComponent.checkSelected(): ", error);
        resultsMessages.push(new ResultsMessage('Error in CapitalQuizComponent.checkSelected(): ', ResultsMessageType.failure, error.message));        
    }
    
    this.resultsMessages = resultsMessages;
  }

  resetSelectedCapital() {
    this.selectedCapital = {};
    this.resultsMessages = [];
  }
  
}

CapitalQuizComponent.$inject = ['stateService'];
