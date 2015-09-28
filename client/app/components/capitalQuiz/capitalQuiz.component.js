import './capitalQuiz.styl';
import {CapitalQuizComponent as controller} from './capitalQuiz.component';
import {CapitalQuizService as capitalQuizService} from './capitalQuiz.service';
import template from './capitalQuiz.html';

export const capitalQuizDirective = ()=> {
  return {
    controller,
    template,
    controllerAs: 'vm',
    scope: {},
    replace: true,
    restrict: 'E',
    bindToController: true,    
    transclude: true
  }
};

class CapitalQuizComponent {
  constructor(capitalQuizService) {
    this.title = 'Lets see what you know about state capitals!';
    this.service = capitalQuizService;
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

CapitalQuizComponent.$inject = ['capitalQuizService'];

export {CapitalQuizComponent};
