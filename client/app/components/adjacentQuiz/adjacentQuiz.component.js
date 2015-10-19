import './adjacentQuiz.styl';
import {AdjacentQuizComponent as controller} from './adjacentQuiz.component';
import {StateService as stateService} from '../common/state.service';
import {PicklistService as picklistService} from '../picklist/picklist.service';
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
  constructor(stateService, picklistService) {
    this.service = stateService;
    this.picklistService = picklistService;
    this.selectedState = {};
    /**
     * Get notified when selected state is changed using
     * RxJs
     */
    this.service.selectedStateSubject.subscribe((newSelectedState) => {
      this.selectedStateChanged(newSelectedState);      
    });
    
    this.resultsMessages = [];

    /**
     * Get notified when results messages are changed using
     * RxJs
     */
    this.picklistService.resultsMessageSubject.subscribe((newResultsMessages) => {
      this.resultsMessages = newResultsMessages;
    });
  }

  clearResultsMessages() {
      this.resultsMessages = [];      
  }

  selectedStateChanged(newSelectedState) {
    this.selectedState = newSelectedState;          
    this.clearResultsMessages();
  }
}

AdjacentQuizComponent.$inject = ['stateService', 'picklistService'];

export {AdjacentQuizComponent};
