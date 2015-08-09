/* Service is a common service used by all components in the client/app/components/common folder. */
import {StateService as stateService} from '../common/state.service';

class AdjacentQuizController {
  constructor(stateService) {
    this.greeting = 'AdjacentQuizController!';
    this.service = stateService;
    this.serviceData = [];
  }

  queryService() {
  	/* The this.service.query() call returns a promise. 
  		Using an arrow function points 'this' to the class
  		context not the function context in ES5 */
  	// this.service.query()
		// .then(result => this.serviceData = result.data);
  }

}

AdjacentQuizController.$inject = ['stateService'];

export {AdjacentQuizController};
