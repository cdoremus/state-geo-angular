import './picklist.styl';
import {PicklistComponent as controller} from './picklist.component';
import {PicklistService as picklistService} from './picklist.service';
import {$inject, $scope} from 'angular';
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
  constructor($scope, picklistService) {
    this.greeting = 'Select a state from left';
    this.scope = $scope;
    this.service = picklistService;
    this.states = [];
    this.pickedStates = [];
    this.rightSelections = [];
    this.leftSelected = [];
    this.queryService();
  }

  queryService() {

    if(this.states.length === 0) {
    	this.service.queryStates()
  		  .then(result => { 
          this.states = result.data; 
          // console.log(this.states);
        } )
        .catch(error => console.log("ERROR: ", error));
    }
  }

  statePicked() {
    let left = this.leftSelected;
    console.log('Left selected: ' + left);
    left.forEach((state) => this.pickedStates.push(state));
  }

}

  PicklistComponent.$inject = ['$scope', 'picklistService'];

export {PicklistComponent};
