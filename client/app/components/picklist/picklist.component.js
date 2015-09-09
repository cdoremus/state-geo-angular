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
    scope: {
      selectedState: '@'
    },
    replace: true,
    bindToController: true,
    restrict: 'E'
  }
};

class PicklistComponent {
  constructor($scope, picklistService) {
    this.greeting = 'Select state(s) from left list';
    this.parent = $scope.$parent;
    this.selectedState = $scope.vm.selectedState;
    console.log("selected state: " + this.selectedState);
    this.service = picklistService;
    this.states = [];
    this.rightSelections = [];
    this.leftSelected = [];
    this.adjacentStates = [];
    this.queryService();
    this.notAdjacents = [];
  }

  queryService() {

    if(this.states.length === 0) {
    	this.service.queryStates()
  		  .then(result => this.states = result.data)
        .catch(error => console.log("ERROR: ", error));
    }
  }

  /**
   * 
   */
  statePicked() {
    let left = this.leftSelected;
    left.forEach((state) => this.rightSelections.push(state));
  }

  stateDeleted() {
    //TODO: finish
  }

  /**
   * Check selected states against adjacent states 
      1. Get adjacent states of selectedState
      2. CHeck each selected state against adjacent states
   */
  checkSelected() {
    let msg = '';
    this.notAdjacents = this.service.checkAdjacentStates(this.selectedState, this.rightSelections);
    if (this.notAdjacents.length != 0) {
      //TODO: Send back message and which ones were not adjacent
      msg += 'Some adjacent states you entered are not correct: ' + this.notAdjacents;  
    } else {
      //TODO: Send back success message
      msg += 'All adjacent states are correct';
    }
    console.log("checkSelected() Message: " + msg);
    this.parent.resultMsg = msg;
  }

}

  PicklistComponent.$inject = ['$scope', 'picklistService'];

export {PicklistComponent};
