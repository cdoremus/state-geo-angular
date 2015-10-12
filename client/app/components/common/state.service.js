import {$inject, $http} from 'angular';
import * as constants from './constants';

class StateService {
  constructor($http) {
    this.greeting = 'StateService!';
    this.http = $http;
    this.adjacentStates = [];
    this.populateAdjacentStates();
  }
  
  getGreeting() {
  	return this.greeting;
  }

  /* Returns a promise from API call */
  queryStates() {
    return this.http.get(constants.webservice_url.states);

  }

  /* Returns a promise from API call */
  queryAdjacentStates() {
    return this.http.get(constants.webservice_url.adjacentStates);

  }

  /**
   * Obtains all adjacent states
   */  
  getAllAdjacentStates() {
    this.queryAdjacentStates()
      .then(result => {
        return result.data;
      })
      .catch(error => console.log("Error: ", error));
  }

  populateAdjacentStates() {
    if (this.adjacentStates.length == 0) {
      this.queryAdjacentStates()
        .then(result => {
          this.adjacentStates = result.data
          return this.adjacentStates;
        })
        .catch(error => console.log("ERROR", error));
    }
    // return this.adjacentStates;
  }

  // isAdjacent(state, answer) {
  //   let adjacents = getAdjacentState(state);
  //   return this._contains(adjacents, answer);
  // }

  getAdjacentStates(state) {
    console.log("State to get adjacent states: ", state);
    let adjacents = [];
    this.populateAdjacentStates();
    let allAdjacents = this.adjacentStates;
//    console.log("All adjacents: " + allAdjacents);
    for (let i = 0; i < allAdjacents.length; i++) {
      if(allAdjacents[i].name == state) {
        adjacents = allAdjacents[i].adjacent;
        break;
      }
    }
    console.log("Adjacents of " + state  + ": ", adjacents);
    return adjacents;
  }
  
  checkSelectedCapital(selectedState, selectedCapital) {
    console.log("Selected state: ", selectedState);
    console.log("Selected capital: ", selectedCapital);
    let isSelectedCapital = false;
    if (selectedState.capital === selectedCapital.capital) {
      isSelectedCapital = true;
    }
    return isSelectedCapital;
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
