import './adjacent.styl';
import template from './adjacent.html';
import {AdjacentComponent as controller} from './adjacent.component';
import {StateService as stateService} from '../common/state.service';

export class AdjacentComponent {
  constructor(stateService) {
    this.greeting = 'AdjacentComponent!';
    
    stateService.queryAdjacentStates()
        .then(result => this.adjacentStates = result.data);
  }

}

AdjacentComponent.$inject = ['stateService'];

export const adjacentComponent = {
    controller,
    template,
    controllerAs: 'vm'
};

