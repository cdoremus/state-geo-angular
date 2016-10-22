import {Component, Input} from "@angular/core";
import QuizResultsMessageService from './quizResultsMessage.service';
import {ResultsMessage} from './resultsMessage';

@Component({
  selector: 'quiz-results-message',
  templateUrl:  './quizResultsMessage.html',
  styleUrls: ['./quizResultsMessage.css'],
  providers: [QuizResultsMessageService]
})
export default class QuizResultsMessageComponent {
  @Input() resultsMessages: ResultsMessage[];
  title: string;

  constructor(private service: QuizResultsMessageService) {
    this.title = 'Quiz Results';
  }
}
