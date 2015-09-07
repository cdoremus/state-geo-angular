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
    this.greeting = 'Select state(s) from left list';
    this.parent = $scope.$parent;
    this.service = picklistService;
    this.states = [];
    this.rightSelections = [];
    this.leftSelected = [];
    this.queryService();
  }

  queryService() {

    if(this.states.length === 0) {
    	this.service.queryStates()
  		  .then(result => this.states = result.data)
        .catch(error => console.log("ERROR: ", error));
    }
  }

  statePicked() {
    let left = this.leftSelected;
    left.forEach((state) => this.rightSelections.push(state));
  }

  stateDeleted() {
    let index = array.indexOf();
    //TODO: finish
  }

  checkSelected() {
    let selections = this.rightSelections;
    selections.forEach((sel) => console.log(sel.name));
    this.parent.vm.pickedStates = selections;    
  }

}

  PicklistComponent.$inject = ['$scope', 'picklistService'];

export {PicklistComponent};
