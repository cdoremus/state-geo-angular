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
    this.greeting = 'AdjacentQuizComponent!';
    this.selectedState = {};
    this.answer = '';
    this.service = stateService;
    this.adjacentStates = [];
    this.populatePageData();
    this.resultMsg = '';
    this.pickedStates = [];
    
  }

  /* Fill adjacentStates array and pick a random one to display in drop down */
  populatePageData() {
  	this.service.queryAdjacentStates()
		.then(result => {
      this.adjacentStates = util.sortAdjacentStateArray(result.data);
      })
    //select a random state from array
    .then(result => {
      let len = this.adjacentStates.length;
      this.selectedState = this.adjacentStates[Math.floor(Math.random()*len)];
      console.log("Selected state: ", this.selectedState);
    });
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

  setResultMessage(message) {
    console.log("setResultMessage called: ", message);
    this.resultMsg = message;
  }
}

AdjacentQuizComponent.$inject = ['stateService'];

export {AdjacentQuizComponent};
