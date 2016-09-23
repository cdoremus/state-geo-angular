import angular from 'angular';

class AdjacentService {
  constructor() {
    this.greeting = 'AdjacentService!';
  }
  
  getGreeting() {
  	return this.greeting;
  }
}

AdjacentService.$inject = [];

export {AdjacentService};
