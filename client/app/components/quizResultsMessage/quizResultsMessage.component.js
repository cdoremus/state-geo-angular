import './quizResultsMessage.styl';
import {QuizResultsMessageComponent as controller} from './quizResultsMessage.component';
import {QuizResultsMessageService as quizResultsMessageService} from './quizResultsMessage.service';
import template from './quizResultsMessage.html';

export const quizResultsMessageDirective = ()=> {
  return {
    controller,
    template,
    controllerAs: 'vm',
    scope: {
      resultsMessages: '=' //array of ResultsMessage objects
    },
    replace: true,
    bindToController: true,
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
