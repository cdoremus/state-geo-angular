import angular from 'angular';

class <%= upCaseName %>Service {
  constructor() {
    this.greeting = '<%= upCaseName %>Service!';
  }
  
  getGreeting() {
  	return this.greeting;
  }
}

<%= upCaseName %>Service.$inject = [];

export {<%= upCaseName %>Service};
