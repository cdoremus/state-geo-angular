import './picklist.styl';
import {PicklistComponent as controller} from './picklist.component';
import {PicklistService as picklistService} from './picklist.service';
import * as util from '../common/utilities';
import {$inject, $scope} from 'angular';
import template from './picklist.html';

export const picklistDirective = ()=> {
  return {
    controller,
    template,
    controllerAs: 'vm',
    scope: {
      selectedState: '@'
    },
    replace: true,
    bindToController: true,
    restrict: 'E'
  }
};

class PicklistComponent {
  constructor($scope, picklistService) {
    this.greeting = 'Select state(s) from left list';
    this.scope = $scope;
    /**
     * State selected whose adjacent states
     * are the subject of the quiz. 
     */
    this.selectedState = $scope.vm.selectedState;
    this.service = picklistService;
    this.states = [];
    this.rightSelections = [];
    this.rightSelected = [];
    this.leftSelected = [];
    this.adjacentStates = [];
    this.queryService();
    this.extraPickedStates = [];
    this.missingPickedStates = [];
  }

  /**
   * Query to get the list of adjacent states and put them
   * in the states array.
   */
  queryService() {
    if(this.states.length === 0) {
    	this.service.queryStates()
  		  .then(result => this.states = result.data)
        .catch(error => console.log("ERROR: ", error));
    }
  }

  /**
   * Copy an item from the left list of possible selections
   * to the right list of candidate adjacent states.
   */
  statePicked() {
    let left = this.leftSelected;
    left.forEach((state) => this.rightSelections.push(state));
  }

  /**
   * Delete item from the right select list of candidate
   * adjacent states.
   */
  stateDeleted() {
    //TODO: fix and finish
    let rightSel = this.rightSelected;
    rightSel.forEach(right => {
      this.rightSelections = util.removeElementFromArray(this.rightSelections, right);
    });   
  }

  /**
   * Check candidate adjacent states against the real adjacent states 
   * noting ones are are erroneously selected or are missing. 
   */
  checkSelected() {
    let message = '';
    try {
      this.extraPickedStates = this.service.checkForExtraPickedStates(this.selectedState, this.rightSelections);
      this.missingPickedStates = this.service.checkForMissingPickedStates(this.selectedState, this.rightSelections);
      if (this.extraPickedStates.length != 0) {
        message += 'These are not an adjacent state: ' + this.extraPickedStates;
      }  
      if (this.missingPickedStates.length != 0) {
        if (message.length != 0) {
          message += '. ';
        }
        message += 'You missed these adjacent states: ' + this.missingPickedStates;  
      } 
      if (this.extraPickedStates.length === 0 && this.missingPickedStates.length === 0) {
        message += 'All adjacent states you selected are correct';
      }
    } catch(error) {
      console.log("Error in checkSelected(): ", error);
      message = error.message;
    }
    console.log("checkSelected() Message: " + message);
    this.scope.$parent.vm.resultMsg = message;
  }

}

  PicklistComponent.$inject = ['$scope', 'picklistService'];

export {PicklistComponent};
