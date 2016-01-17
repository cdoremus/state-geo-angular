import './adjacent.styl';
import template from './adjacent.html';
import {AdjacentComponent as controller} from './adjacent.component';
import {StateService as stateService} from '../common/state.service';

export const adjacentDirective = ()=> {
  return {
    controller,
    template,
    controllerAs: 'vm',
    scope: {},
    replace: true,
    restrict: 'E'
  }
};

export class AdjacentComponent {
  constructor(stateService) {
    this.greeting = 'AdjacentComponent!';
    // this.service = stateService;
    stateService.queryAdjacentStates()
            .then(result => this.adjacentStates = result.data);
  }

}

AdjacentComponent.$inject = ['stateService'];
