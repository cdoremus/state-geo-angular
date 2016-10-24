import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import StateService from './state.service';

@Injectable()
export default class QuizService {
  constructor(private http: Http, private stateService: StateService) {
  }

  saveQuizScore(username: string, correctAnswers: string[], totalAnswers: string[]): void {
    ;
  }

  getQuizScores(username: string): string[] {
    return [];
  }
}


