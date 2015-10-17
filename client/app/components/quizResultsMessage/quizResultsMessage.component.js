import './quizResultsMessage.styl';
import {QuizResultsMessageComponent as controller} from './quizResultsMessage.component';
import {QuizResultsMessageService as quizResultsMessageService} from './quizResultsMessage.service';
import template from './quizResultsMessage.html';

export const quizResultsMessageDirective = ()=> {
  return {
    controller,
    template,
    controllerAs: 'vm',
    scope: {},
    replace: true,
    restrict: 'E'
  }
};

class QuizResultsMessageComponent {
  constructor(quizResultsMessageService) {
    this.greeting = 'QuizResultsMessageComponent!';
    this.service = quizResultsMessageService;
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

QuizResultsMessageComponent.$inject = ['quizResultsMessageService'];

export {QuizResultsMessageComponent};
