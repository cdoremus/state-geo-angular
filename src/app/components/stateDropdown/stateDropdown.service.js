import angular from 'angular';

class StateDropdownService {
  constructor() {
    this.greeting = 'StateDropdownService!';
  }
  
  getGreeting() {
  	return this.greeting;
  }
}

StateDropdownService.$inject = [];

export {StateDropdownService};
