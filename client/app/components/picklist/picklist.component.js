import './picklist.styl';
import {PicklistComponent as controller} from './picklist.component';
import {PicklistService as picklistService} from './picklist.service';
import {$inject, $http} from 'angular';
import template from './picklist.html';

export const picklistDirective = ()=> {
  return {
    controller,
    template,
    controllerAs: 'vm',
    scope: {},
    replace: true,
    restrict: 'E'
  }
};

class PicklistComponent {
  constructor(picklistService) {
    this.greeting = 'Select a state from left';
    this.http = $http;
    this.service = picklistService;
    this.states = [];
    this.pickedStates = [];
    this.pickedState = {};
    this.queryService();
  }

  queryService() {

    if(this.states.length === 0) {
    	this.service.queryStates()
  		  .then(result => { 
          this.states = result.data; 
          console.log(this.states);
        } )
        .catch(error => console.log("ERROR: ", error));
    }
  }

  statePicked() {
    this.pickedStates.push(this.pickedState);
  }

}

  PicklistComponent.$inject = ['picklistService'];

export {PicklistComponent};
