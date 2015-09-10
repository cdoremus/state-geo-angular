import {$inject, $http} from 'angular';
import * as _ from 'lodash';
import * as util from '../common/utilities';
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
  */
  checkForExtraPickedStates(stateToTest, selectedStates) {
    let adjacents = this.getAdjacentStates(stateToTest);
  	return util.extraPickedStates(adjacents, selectedStates);
  }

  checkForMissingPickedStates(stateToTest, selectedStates) {
    let adjacents = this.getAdjacentStates(stateToTest);
  	return util.missingPickedStates(adjacents, selectedStates);
  }
}

PicklistService.$inject = ['$http', 'stateService'];

export {PicklistService};
