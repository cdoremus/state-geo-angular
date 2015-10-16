import './picklist.styl';
import {PicklistComponent as controller} from './picklist.component';
import {PicklistService as picklistService} from './picklist.service';
import {StateService as stateService} from '../common/state.service';
import * as util from '../common/utilities';
import {$inject, $scope} from 'angular';
import template from './picklist.html';

export const picklistDirective = ()=> {
  return {
    controller,
    template,
    controllerAs: 'vm',
    scope: {
      selectedState: '='
    },
    replace: true,
    bindToController: true, //assures that selectedState becomes a PicklistComponent property
    restrict: 'E'
  }
};

class PicklistComponent {
  constructor($scope, picklistService, stateService) {
    this.greeting = 'Select state(s) from left list';
    this.scope = $scope;
    this.service = picklistService;
    this.stateService = stateService;
    /**
     * List of states fetched from the server
     */
    this.states = [];
    
    /**
     * List of all states
     */
    this.allStates = [];
    
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
    /**
     * Query to fill left select list
     */
    this.queryService();
    /**
     * Register a subscriber to get notified of a new selected state
     */
    this.stateService.selectedStateSubject.subscribe((newSelectedState) => {
      this.selectedStateChanged(newSelectedState);      
    });
  
  }

  /**
   * Query to get the list of adjacent states and put them
   * in the states array.
   */
  queryService() {
    if(this.states.length === 0) {
    	this.stateService.queryStates()
  		  .then(result => {
          this.allStates = result.data; 
          this.states = this.allStates.filter((state) => state.name !== this.selectedState); 
          })
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
      // erroneously picked adjacent states
      this.extraPickedStates = this.service.checkForExtraPickedStates(this.selectedState, this.rightSelections);
      // adjacent states not picked
      this.missingPickedStates = this.service.checkForMissingPickedStates(this.selectedState, this.rightSelections);
      if (this.extraPickedStates && this.extraPickedStates.length != 0) {
        this.scope.$parent.vm.wrongPickedStates = this.extraPickedStates;
      }  
      if (this.missingPickedStates && this.missingPickedStates.length != 0) {
        this.scope.$parent.vm.missingPickedStates = this.missingPickedStates;
      } 
      if ((this.extraPickedStates && this.extraPickedStates.length === 0) && 
        (this.missingPickedStates && this.missingPickedStates.length === 0)) {
          this.scope.$parent.vm.successMessage = 'All adjacent states you selected are correct';
      }
    } catch(error) {
      console.log("Error in checkSelected(): ", error);
        this.scope.$parent.vm.successMessage = error.message;
    }
  }


  /**
   * Clears messages on the parent page. 
   */
  clearParentMessages() {
      this.scope.$parent.vm.wrongPickedStates = [];
      this.scope.$parent.vm.missingPickedStates = [];
      this.scope.$parent.vm.successMessage = ''; 
  }
  
  /**
   * Function called by the subscriber in constructor to when a new
   * state is selected that clears all right selections and repopulates
   * the left selections minus the selected state.
   */
  selectedStateChanged(newSelectedState) {
      let printVal = newSelectedState == null ? 'null' : newSelectedState.name;
      console.log(`PicklistComponent subscriber selectedStateChanged() called with newSelectedState: ${printVal}`);          
      this.rightSelections = [];
      this.states = this.allStates.filter((state) => state.name !== newSelectedState.name);
  }

}

  PicklistComponent.$inject = ['$scope', 'picklistService', 'stateService'];

export {PicklistComponent};
