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
    bindToController: {
      resultsMessages: '=' //array of ResultsMessage objects
    },
    restrict: 'E'
  }
};

class QuizResultsMessageComponent {
  constructor(quizResultsMessageService) {
    this.title = 'Quiz Results';
    this.service = quizResultsMessageService;
  }

}

QuizResultsMessageComponent.$inject = ['quizResultsMessageService'];

export {QuizResultsMessageComponent};
