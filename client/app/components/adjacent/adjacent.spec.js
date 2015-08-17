import {adjacent} from './adjacent';
import {AdjacentComponent} from './adjacent.component';
import {adjacentDirective} from './adjacent.component';
import template from './adjacent.html';

describe('Adjacent', ()=>{
  let $rootScope;
  let q;


  beforeEach(window.module(adjacent.name));
  beforeEach(inject((_$rootScope_, $q) => {
    $rootScope = _$rootScope_;
    q = $q;
  }));

  describe('Module', ()=>{
    // test things about the component module
    // checking to see if it registers certain things and what not
    // test for best practices with naming too
    // test for routing
  });

  describe('Controller', ()=>{
    // test your controller here

    it('should have a name property [REMOVE]', ()=>{ // erase me if you remove this.name from the controller
      //Use a mock StateService with stubbed methods (see impl below)
      let stateService = new MockStateService(q);
      let controller  =  new AdjacentComponent(stateService);

      expect(controller).to.have.property('greeting');
    });
  });

  describe('Template', ()=>{
    // test the template
    // use Regexes to test that you are using the right bindings {{  }}

    it('should have adjacent in template', ()=>{
      expect(template).to.match(/{{\s?adjacent\s?}}/g);
    });
  });


  describe('Directive', ()=>{
      // test the component/directive itself
      let directive = adjacentDirective();

      it('should use the right template',()=>{
        expect(directive.template).to.equal(template);
      });

      it('should use controllerAs', ()=>{
        expect(directive).to.have.property('controllerAs');
      });

      it('should use the right controller', ()=>{
        expect(directive.controller).to.equal(AdjacentComponent);
      });
  });
});

class MockStateService {
    constructor($q) {
      this.q = $q;
    }
    queryAdjacentStates() {
      let deferred = this.q.defer();
      return deferred.promise;
    }
    populateAdjacentStates() {
      return [];
    }
}; 
