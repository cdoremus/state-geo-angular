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
    this.populatePageData();
    
  }

  populatePageData() {
  	this.service.queryAdjacentStates()
		.then(result => {
      this.states = util.sortAdjacentStateArray(result.data);
      })
    //select a random state from array
    .then(result => {
      let len = this.states.length;
      this.selectedState = this.states[Math.floor(Math.random()*len)];
      console.log("Selected state for capitals quiz: ", this.selectedState);
    });
  }


}

CapitalQuizComponent.$inject = ['stateService'];

export {CapitalQuizComponent};
