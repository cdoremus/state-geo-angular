import {StateService as stateService} from '../common/state.service';

class AdjacentController {
  constructor(stateService) {
    this.greeting = 'AdjacentController!';
    // this.service = stateService;
    stateService.queryAdjacentStates()
            .then(result => this.adjacentStates = result.data);
  }

  // greet() {
  // 	this.greeting = this.service.getGreeting();
  // }

}

AdjacentController.$inject = ['stateService'];
//AdjacentController.$inject = [];

export {AdjacentController};
