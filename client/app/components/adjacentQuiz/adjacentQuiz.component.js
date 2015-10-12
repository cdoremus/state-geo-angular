import './adjacentQuiz.styl';
import {AdjacentQuizComponent as controller} from './adjacentQuiz.component';
import {StateService as stateService} from '../common/state.service';
import * as util from '../common/utilities';
import template from './adjacentQuiz.html';

export const adjacentQuizDirective = () => {
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

class AdjacentQuizComponent {
  constructor(stateService) {
    this.service = stateService;
    this.greeting = 'AdjacentQuizComponent!';
    this.selectedState = {};
    this.answer = '';
    this.adjacentStates = [];
    this.resultMsg = '';
    this.missingPickedStates = [];
    this.wrongPickedStates = [];
    this.successMessage = '';
    this.pickedStates = [];
    
  }

  setSelectedState(state) {
    console.log("setSelectedState() called with argument: " + state);
    this.selectedState = state;
  }

  submitAnswer() {
    console.log('submitAnswer() called with answer ' + this.answer);
    this.resultMsg = this.answer + ' is NOT an Adjacent State';
    
    let adjacents = this.service.getAdjacentState(this.selectedState.name, this.adjacentStates);
    console.log("Adjacents: " + adjacents);
    for (let j = 0; j < adjacents.length; j++) {
      if (this.answer == adjacents[j]) {
        this.resultMsg = this.answer + ' IS an Adjacent State!!';
        break;
      }
    }
  }

  clearSelections(state) {
    console.log("clearSelections() called with argument: " + state);
  }

  clearResultsMessages() {
      this.wrongPickedStates = [];
      this.missingPickedStates = [];
      this.successMessage = '';        
  }

  setResultMessage(message) {
    console.log("setResultMessage called: ", message);
    this.resultMsg = message;
  }
}

AdjacentQuizComponent.$inject = ['stateService'];

export {AdjacentQuizComponent};
