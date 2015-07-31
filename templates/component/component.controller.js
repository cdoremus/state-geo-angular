import {<%= upCaseName %>Service as service} from './<%= name %>.service';

class <%= upCaseName %>Controller {
  constructor(service) {
    this.greeting = '<%= upCaseName %>Controller!';
    this.service = service;
  }

  greet() {
  	this.greeting = this.service.getGreeting();
  }

}

<%= upCaseName %>Controller.$inject = ['service'];

export {<%= upCaseName %>Controller};
