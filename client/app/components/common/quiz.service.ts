import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
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


