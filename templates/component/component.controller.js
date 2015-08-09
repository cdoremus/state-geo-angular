/* Service is a common service used by all components in the client/app/components/common folder. */
import {<%= upCaseService %>Service as <%= service %>Service} from '../common/<%= service %>.service';

class <%= upCaseName %>Controller {
  constructor(<%= service %>Service) {
    this.greeting = '<%= upCaseName %>Controller!';
    this.service = <%= service %>Service;
    this.serviceData = [];
  }

  queryService() {
  	/* The this.service.query() call returns a promise. 
  		Using an arrow function points 'this' to the class
  		context not the function context in ES5 */
  	// this.service.query()
		// .then(result => this.serviceData = result.data);
  }

}

<%= upCaseName %>Controller.$inject = ['<%= service %>Service'];

export {<%= upCaseName %>Controller};
