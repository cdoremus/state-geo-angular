import {Component, Input, OnInit, Output} from "angular2/core";
import PicklistService from './picklist.service';
import * as Rx from "rxjs";
import {State} from '../common/state';
import StateService from '../common/state.service';
import {ResultsMessage, ResultsMessageType} from '../quizResultsMessage/resultsMessage';
import * as util from '../common/utilities';


@Component({
    selector: 'picklist',
    templateUrl:  'app/components/picklist/picklist.html',
    styleUrls: ['app/components/picklist/picklist.css'],
    providers: [PicklistService, StateService]
})
export default class PicklistComponent implements OnInit {
  @Input() selectedState: string;
  @Input() statesObs: Rx.Observable<Array<State>>;
  greeting: string;
  allStates: State[];
  states: State[];
  rightSelections: any[];
  rightSelected: any[];
  leftSelected: any[];

  constructor(private service: PicklistService, private stateService: StateService) {
    this.greeting = 'Select state(s) from left list and click on the right arrow to move to the right list';

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

    this.allStates = [];

  }

  ngOnInit(): void {
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
      this.statesObs.subscribe( states => {
        this.allStates = states;
        console.log("PicklistComponent.allStates: ", this.allStates);
        // this.states = this.allStates.filter((state) => state.name !== this.selectedState);
      },
      error => console.log("PicklistComponent.queryService() ERROR: ", error),
      () => console.log("PicklistComponent.queryService() subscription completed")
      );
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
      this.selectedState = newSelectedState;
      if (newSelectedState) {
        this.states = this.allStates.filter((state) => state.name !== newSelectedState);
      }
  }

}
