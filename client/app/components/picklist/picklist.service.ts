import {Http, Headers} from "angular2/http";
import {Injectable} from "angular2/core";
import * as Rx from "rxjs";
import * as util from '../common/utilities';
import * as constants from '../common/constants';
import StateService from '../common/state.service';

@Injectable()
export default class PicklistService {
  greeting: string;
  states: any[];
  resultsMessageSubject: any;

  constructor(private http: Http, private stateService: StateService) {
    this.greeting = 'PicklistService!';
    this.states = [];

    /**
     * Use RxJS to notify observers of new results messages
     * when setResultsMessages() is called.
     */
    this.resultsMessageSubject = new Rx.BehaviorSubject(null);

  }

  queryStates() {
    return this.stateService.queryStates();
  }

  /**
   * Gets all adjacent states to a given state (selectedState)
   */
  getAdjacentStates(selectedState) {
  	return this.stateService.getAdjacentStates(selectedState);
  }

  setResultsMessages(newMessages) {
    this.resultsMessageSubject.next(newMessages);
  }

  /**
  * Checks adjacent states, returning an array of states that are not adjacent
  * or an empty array if all the selected states are adjacent.
  * Accounts for states that do not have adjacent states (Alaska and Hawaii),
  * returning an empty array in that case.
  */
  checkForExtraPickedStates(stateToTest, selectedStates) {
    let adjacents = this.getAdjacentStates(stateToTest);
    //Check that the state has adjacent states
    if (constants.no_adjacent_states.indexOf(stateToTest) < 0) {
  	 return util.extraPickedStates(adjacents, selectedStates);
    } else {
      return []; //Alaska or Hawaii picked
    }
  }

  /**
  * Checks adjacent states, returning an array of selected states that are not adjacent
  * or an empty array if all adjacent states were found in the selected states array.
  * Accounts for states that do not have adjacent states (Alaska and Hawaii),
  * returning an empty array in that case.
  */
  checkForMissingPickedStates(stateToTest, selectedStates) {
    let adjacents = this.getAdjacentStates(stateToTest);
    //Check that the state has adjacent states
    if (constants.no_adjacent_states.indexOf(stateToTest) < 0) {
  	 return util.missingPickedStates(adjacents, selectedStates);
    } else {
      return []; //Alaska or Hawaii picked
    }
  }
}
