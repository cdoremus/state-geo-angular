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
    bindToController: true, //assures that selectedState becomes a PicklistComponent property
    restrict: 'E'
  }
};

class PicklistComponent {
  constructor($scope, picklistService) {
    this.greeting = 'Select state(s) from left list';
    this.scope = $scope;
    this.service = picklistService;
    /**
     * List of states fetched from the server
     */
    this.states = [];
    /**
     * All items in the right list
     */
    this.rightSelections = [];
    /**
     * Selected items in the right list
     */
    this.rightSelected = [];
    /**
     * Selected items in the left list
     */
    this.leftSelected = [];
    /**
     * States selected that are not adjacent states
     */
    this.extraPickedStates = [];
    /**
     * Adjacent states NOT selected 
     */
    this.missingPickedStates = [];
    this.queryService();
    this.watchSelectedState();
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
    let rightSel = this.rightSelected;
    rightSel.forEach(right => {
      this.rightSelections = util.removeElementFromArray(this.rightSelections, right);
    });   
  }

  /**
   * Delete all items from the right select list of candidate
   * adjacent states.
   */
  allStatesDeleted() {
    this.rightSelections = [];
  }

  /**
   * Check candidate adjacent states against the real adjacent states 
   * noting ones are are erroneously selected or are missing. 
   */
  checkSelected() {
    try {
      //clear previous values
      this.clearParentMessages();
      this.extraPickedStates = this.service.checkForExtraPickedStates(this.selectedState, this.rightSelections);
      this.missingPickedStates = this.service.checkForMissingPickedStates(this.selectedState, this.rightSelections);
      if (this.extraPickedStates.length != 0) {
        this.scope.$parent.vm.wrongPickedStates = this.extraPickedStates;
      }  
      if (this.missingPickedStates.length != 0) {
        this.scope.$parent.vm.missingPickedStates = this.missingPickedStates;
      } 
      if (this.extraPickedStates.length === 0 && this.missingPickedStates.length === 0) {
        this.scope.$parent.vm.successMessage = 'All adjacent states you selected are correct';
      }
    } catch(error) {
      console.log("Error in checkSelected(): ", error);
        this.scope.$parent.vm.successMessage = error.message;
    }
  }


  clearParentMessages() {
      this.scope.$parent.vm.wrongPickedStates = [];
      this.scope.$parent.vm.missingPickedStates = [];
      this.scope.$parent.vm.successMessage = ''; 
  }
  
  /**
   * Observe the selectedState property in the parent scope. When its
   * value changes, reset all the right selections to an empty array.
   */
  watchSelectedState() {
    this.scope.$parent.$watch('vm.selectedState', (newValue, oldValue) => {
      this.rightSelections = [];
    });  
  }
  
}



  PicklistComponent.$inject = ['$scope', 'picklistService'];

export {PicklistComponent};
