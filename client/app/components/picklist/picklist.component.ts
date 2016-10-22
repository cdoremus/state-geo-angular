import {Component, Input, OnInit, Output, EventEmitter, ChangeDetectorRef} from "@angular/core";
import PicklistService from './picklist.service';
import * as Rx from "rxjs";
import {State} from '../common/state';
import StateService from '../common/state.service';
import {ResultsMessage, ResultsMessageType} from '../quizResultsMessage/resultsMessage';
import * as util from '../common/utilities';

@Component({
  selector: 'picklist',
  styleUrls: ['./picklist.css'],
  templateUrl: './picklist.html',
  providers: [PicklistService]
})
export default class PicklistComponent implements OnInit {
  @Input() selectedState: string;
  @Input() statesObs: Rx.Observable<Array<State>>;
  @Output() showResultsMessages: EventEmitter<Array<ResultsMessage>>;

  greeting: string;
  allStates: State[];
  states: State[];
  rightSelections: String[];
  rightSelected: any[];
  leftSelected: any[];

  constructor(private service: PicklistService, private stateService: StateService, private changeDetectorRef: ChangeDetectorRef) {
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

    this.showResultsMessages = new EventEmitter<Array<ResultsMessage>>();
  }

  ngOnInit(): void {
    /**
     * Query to fill left select list
     */
    this.queryService();
    /**
     * Register a subscriber to get notified of a new selected state
     */
    // this.stateService.selectedStateSubject.subscribe((newSelectedState) => {
    //   this.selectedStateChanged(newSelectedState);
    // });
  }

  /**
   * Query to get the list of adjacent states and put them
   * in the states array.
   */
  queryService() {
      this.statesObs.subscribe( states => {
        this.allStates = states;
        // console.log("PicklistComponent.allStates: ", this.allStates);
        // this.states = this.allStates.filter((state) => state.name !== this.selectedState);
      },
      error => console.log("PicklistComponent.queryService() ERROR: ", error)
      );
  }

  leftOptionSelected(event) {
        for(var i in event.target.selectedOptions){
            if(event.target.selectedOptions[i].label){
                this.leftSelected.push(event.target.selectedOptions[i].label);
            }
        }
  }

  rightOptionSelected(event) {
        for(var i in event.target.selectedOptions){
            if(event.target.selectedOptions[i].label){
                this.rightSelected.push(event.target.selectedOptions[i].label);
            }
        }
  }

  /**
   * Copy an item from the left list of possible selections
   * to the right list of candidate adjacent states.
   */
  statePicked() {
    console.log('leftSelected: ', this.leftSelected);
    // let left = this.leftSelected;
    this.leftSelected.map(state => {
      // exclude duplicate values
      if (this.rightSelections.indexOf(state) === -1) {
        this.rightSelections.push(state);
      }
    });
    console.log('rightSelections: ', this.rightSelections);

    // this.changeDetectorRef.markForCheck();
  }


  /**
   * Delete item from the right select list of candidate
   * adjacent states.
   */
  stateDeleted() {
    console.log('PicklistCOmponent.stateDeleted() rightSelected', this.rightSelected);
    this.rightSelected.map(right => {
      this.rightSelections = util.removeElementFromArray(this.rightSelections, right);
      util.removeElementFromArray(this.leftSelected, right);
    });
  }

  /**
   * Delete all items from the right select list of candidate
   * adjacent states.
   */
  allStatesDeleted() {
    this.rightSelections = [];
    this.leftSelected = [];
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
    // console.log('PicklistComponent.checkSelected() resultsMessages: ', resultsMessages);
    this.showResultsMessages.emit(resultsMessages);
    // this.setResultsMessages(resultsMessages);
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
      console.log(`PicklistComponent.selectedStateChanged() called with newSelectedState: ${printVal}`);
      this.rightSelections = [];
      this.selectedState = newSelectedState;
      if (newSelectedState) {
        this.states = this.allStates.filter((state) => state.name !== newSelectedState);
      }
  }

}
