import './picklist.styl';
import {PicklistComponent as controller} from './picklist.component';
import {PicklistService as picklistService} from './picklist.service';
import {StateService as stateService} from '../common/state.service';
import {ResultsMessage, ResultsMessageType} from '../quizResultsMessage/resultsMessage';
import * as util from '../common/utilities';
import {$inject} from 'angular';
import template from './picklist.html';

export const picklistDirective = ()=> {
  return {
    controller,
    template,
    controllerAs: 'vm',
    scope: {},
    replace: true,
    bindToController: { 
      selectedState: '=' //selectedState becomes a PicklistComponent property
    },
    restrict: 'E'
  }
};

export class PicklistComponent {
  constructor(picklistService, stateService) {
    this.greeting = 'Select state(s) from left list and click on the right arrow to move to the right list';
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


  checkSelected() {
    //clear previous values
    let resultsMessages = [];
    try {
      // erroneously picked adjacent states
      let extraPickedStates = this.service.checkForExtraPickedStates(this.selectedState, this.rightSelections);
      if (extraPickedStates && extraPickedStates.length != 0) {
        resultsMessages.push(new ResultsMessage('Selected states that are not adjacent: ', ResultsMessageType.failure, extraPickedStates));
      }        
      // adjacent states not picked
      let missingPickedStates = this.service.checkForMissingPickedStates(this.selectedState, this.rightSelections);
      if (missingPickedStates && missingPickedStates.length != 0) {
        resultsMessages.push(new ResultsMessage('Adjacent states not selected: ', ResultsMessageType.failure, missingPickedStates));
      }  

      if ((extraPickedStates && extraPickedStates.length === 0) && 
        (missingPickedStates && missingPickedStates.length === 0)) {
          //center the results message
          ResultsMessageType.success.style='color:green;margin:0 auto;text-align:center';
          resultsMessages.push(new ResultsMessage('All adjacent states you selected are correct', ResultsMessageType.success));
      }
    } catch(error) {
      console.log("Error in checkSelected(): ", error);
        resultsMessages.push(new ResultsMessage('Error processing adjacent state selections: ', ResultsMessageType.failure, error.message));        
    }
    this.setResultsMessages(resultsMessages);
  }


  setResultsMessages(newMessages) {
    this.service.setResultsMessages(newMessages);
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

  PicklistComponent.$inject = ['picklistService', 'stateService'];
