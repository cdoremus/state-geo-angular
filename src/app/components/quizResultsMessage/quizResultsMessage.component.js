import './quizResultsMessage.styl';
import {QuizResultsMessageComponent as controller} from './quizResultsMessage.component';
import {QuizResultsMessageService as quizResultsMessageService} from './quizResultsMessage.service';
import template from './quizResultsMessage.html';

export class QuizResultsMessageComponent {
  constructor(quizResultsMessageService) {
    this.title = 'Quiz Results';
    this.service = quizResultsMessageService;
  }

}

QuizResultsMessageComponent.$inject = ['quizResultsMessageService'];

export const quizResultsMessageComponent = {
    controller,
    template,
    controllerAs: 'vm',
    bindings: {
      resultsMessages: '<' //array of ResultsMessage objects
    }
};

