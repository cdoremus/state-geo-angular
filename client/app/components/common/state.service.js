import {$inject, $http} from 'angular';

class StateService {
  constructor($http) {
  	console.log('StateService constructor');
    this.greeting = 'StateService!';
    this.http = $http;
    this.adjacentStates = [];
    this.queryAdjacentStates();
  }
  
  getGreeting() {
  	return this.greeting;
  }

  queryAdjacentStates() {
  	return this.http.get('/adjacent_states.json');
  		// .then(function(result) {
  		// 	var data = result.data;
  		// 	console.log("data: " +  data);
  		// 	console.log("adjacentStates: " +  this.adjacentStates);  			
  		// 	this.adjacentStates = data;
  		// })
  		// .catch(function(error) {
  		// 	console.log("Error getting adjacentStates: " + error.message);
  		// }) ;
  }

}

StateService.$inject = ['$http'];

export {StateService};
