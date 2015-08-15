import {$inject, $http} from 'angular';

class StateService {
  constructor($http) {
  	// console.log('StateService constructor');
    this.greeting = 'StateService!';
    this.http = $http;
    this.adjacentStates = [];
    this.populateAdjacentStates();
  }
  
  getGreeting() {
  	return this.greeting;
  }

  /* Returns a promise from API call */
  queryAdjacentStates() {
 // 	return this.http.get('/adjacent_states.json');
    return this.http.get('/adjacentStates');

  }

  populateAdjacentStates() {
    if (this.adjacentStates.length == 0) {
      this.queryAdjacentStates()
        .then(result => this.adjacentStates = result.data)
        .catch(error => console.log("ERROR", error));
    }
    return this.adjacentStates;
  }

  isAdjacent(state, answer) {
    let adjacents = getAdjacentState(state);
    return this._contains(adjacents, answer);
  }

  getAdjacentState(state, adjacentStates) {
    let adjacents = [];
    for (let i = 0; i < adjacentStates.length; i++) {
      if(adjacentStates[i].name == state) {
        adjacents = adjacentStates[i].adjacent;
        break;
      }
    }
    return adjacents;
  }

  _contains(array, obj) {
    let i = array.length;
    while (i--) {
       if (array[i] === obj) {
           return true;
       }
    }
    return false;
  }
}

StateService.$inject = ['$http'];

export {StateService};
