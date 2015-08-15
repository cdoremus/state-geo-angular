import {$inject, $http} from 'angular';
import {StateService} as stateService from './state.service';

class QuizService {
	constructor($http, stateService) {
		this.http = $http;
		this.stateService = stateService;

  	}

  	saveQuizScore(username, correctAnswers, totalAnswers) {
  		
  	}

  	getQuizScores(username) {

  	}
}

QuizService.$inject = ['$http', 'stateService'];

export {QuizService};


