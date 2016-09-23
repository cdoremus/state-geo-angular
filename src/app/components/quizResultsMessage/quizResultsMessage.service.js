import angular from 'angular';

class QuizResultsMessageService {
  constructor() {
    this.greeting = 'QuizResultsMessageService!';
  }
  
  getGreeting() {
  	return this.greeting;
  }
}

QuizResultsMessageService.$inject = [];

export {QuizResultsMessageService};
