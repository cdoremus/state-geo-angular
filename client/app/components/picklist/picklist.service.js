import {$inject, $http} from 'angular';
//import {StateService as stateService} from '../common/state.service';

class PicklistService {
  // constructor($http, stateService) {
  constructor($http) {
    this.greeting = 'PicklistService!';
    this.http = $http;
    // this.stateService = stateService;
	// this.states = [];
  }
  
  queryStates() {
    return this.http.get('/states');  	
  }
}

// PicklistService.$inject = ['$http' ,'stateService'];
PicklistService.$inject = ['$http'];

export {PicklistService};
