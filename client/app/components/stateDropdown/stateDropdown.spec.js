import {stateDropdown} from './stateDropdown'
import {StateDropdownComponent, stateDropdownDirective} from './stateDropdown.component';
import template from './stateDropdown.html';

describe('StateDropdown', ()=>{
  let $rootScope,
  let q;

  beforeEach(window.module(stateDropdown.name));
  beforeEach(inject((_$rootScope_, $q)=>{
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

    it('should have a states property', ()=>{ 
      let stateService =  new MockStateService(q);
      let controller = new StateDropdownComponent(stateService);

      expect(controller).to.have.property('states');
    });
  });

  describe('Template', ()=>{
    // test the template
    // use Regexes to test that you are using the right bindings {{  }}
    it('should have name in template [REMOVE]', ()=>{
      expect(template).to.match(/{{\s?vm\.greeting\s?}}/g);
    });
  });


  describe('Directive', ()=>{
      // test the component/directive itself
      let directive = stateDropdownDirective();

      it('should use the right template',()=>{
        expect(directive.template).to.equal(template);
      });

      it('should use controllerAs', ()=>{
        expect(directive).to.have.property('controllerAs');
      });

      it('should use the right controller', ()=>{
        expect(directive.controller).to.equal(StateDropdownComponent);
      });
  });
});

class MockStateService {
    constructor($q) {
      this.q = $q;
    }
    querystates() {
      let deferred = this.q.defer();
      return deferred.promise;
    }
    populateAdjacentStates() {
      return [];
    }
}; 
