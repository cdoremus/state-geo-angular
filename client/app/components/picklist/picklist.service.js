import {$inject, $http} from 'angular';
import * as _ from 'lodash';
import * as util from '../common/utilities';
import * as constants from '../common/constants'; 
import {StateService as stateService} from '../common/state.service';

class PicklistService {
  constructor($http, stateService) {
    this.greeting = 'PicklistService!';
    this.http = $http;
    this.stateService = stateService;
	this.states = [];
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

PicklistService.$inject = ['$http', 'stateService'];

export {PicklistService};
