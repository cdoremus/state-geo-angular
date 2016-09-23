import angular from 'angular';

class CapitalQuizService {
  constructor() {
    this.greeting = 'CapitalQuizService!';
  }
  
  getGreeting() {
  	return this.greeting;
  }
}

CapitalQuizService.$inject = [];

export {CapitalQuizService};
