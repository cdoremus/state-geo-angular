import {Http, Headers} from 'angular2/http';
import {Injectable} from 'angular2/core';
import StateService from './state.service';

@Injectable()
export default class QuizService {
  constructor(private http: Http, private stateService: StateService) {
  }

  saveQuizScore(username, correctAnswers, totalAnswers) {

  }

  getQuizScores(username) {

  }
}


