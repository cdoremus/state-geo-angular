import {Component, Input} from "angular2/core";
import QuizResultsMessageService from './quizResultsMessage.service';
import {ResultsMessage} from './resultsMessage';

@Component({
  selector: 'quiz-results-message',
  templateUrl:  'app/components/quizResultsMessage/quizResultsMessage.html',
  styleUrls: ['app/components/quizResultsMessage/quizResultsMessage.css'],
  inputs: ['resultsMessages'],
  providers: [QuizResultsMessageService]
})
export default class QuizResultsMessageComponent {
  @Input() resultsMessages: ResultsMessage[];
  title: string;

  constructor(private service: QuizResultsMessageService) {
    this.title = 'Quiz Results';
  }
}