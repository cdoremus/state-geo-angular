import {$inject, $http} from 'angular';
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
}

PicklistService.$inject = ['$http', 'stateService'];

export {PicklistService};
