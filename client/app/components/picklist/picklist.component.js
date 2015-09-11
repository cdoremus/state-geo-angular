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
      selectedState: '@',
      passMessage: '&'
    },
    replace: true,
    bindToController: true,
    restrict: 'E'
  }
};

class PicklistComponent {
  constructor($scope, picklistService) {
    this.greeting = 'Select state(s) from left list';
    this.scope = $scope;
    this.selectedState = $scope.vm.selectedState;
    console.log("selected state: " + this.selectedState);
    // this.passMessage = $scope.vm.passMessage;
    this.service = picklistService;
    this.states = [];
    this.rightSelections = [];
    this.leftSelected = [];
    this.adjacentStates = [];
    this.queryService();
    this.extraPickedStates = [];
    this.missingPickedStates = [];
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
   * for the state that is being 
      1. Get adjacent states of selectedState
      2. CHeck each selected state against adjacent states
   */
  checkSelected() {
    let message = '';
    this.extraPickedStates = this.service.checkForExtraPickedStates(this.selectedState, this.rightSelections);
    this.missingPickedStates = this.service.checkForMissingPickedStates(this.selectedState, this.rightSelections);
    if (this.extraPickedStates.length != 0) {
      message += 'Some adjacent states you entered are not an adjacent state: ' + this.extraPickedStates;
    }  
    if (this.missingPickedStates.length != 0) {
      if (message.length != 0) {
        message += '. ';
      }
      message += 'You missed some adjacent states: ' + this.missingPickedStates;  
    } 
    if (this.extraPickedStates.length === 0 && this.missingPickedStates.length === 0) {
      message += 'All adjacent states you selected are correct';
    }
    console.log("checkSelected() Message: " + message);
    // this.scope.vm.passMessage()(message);
    this.scope.$parent.vm.resultMsg = message;
  }

}

  PicklistComponent.$inject = ['$scope', 'picklistService'];

export {PicklistComponent};
