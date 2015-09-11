import {picklist} from './picklist'
import {PicklistComponent} from './picklist.component';
import {picklistDirective} from './picklist.component';
import template from './picklist.html';

describe('Picklist', ()=>{
  let $rootScope, q;

  beforeEach(window.module(picklist.name));
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

    it('should have a name property [REMOVE]', ()=>{ // erase me if you remove this.name from the controller
      let vm = {'selectedState': 'Maine'};
      $rootScope['vm'] = vm;
      let service =  new MockPicklistService(q);
      let controller =  new PicklistComponent($rootScope, service);

      expect(controller).to.have.property('greeting');
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
      let directive = picklistDirective();

      it('should use the right template',()=>{
        expect(directive.template).to.equal(template);
      });

      it('should use controllerAs', ()=>{
        expect(directive).to.have.property('controllerAs');
      });

      it('should use the right controller', ()=>{
        expect(directive.controller).to.equal(PicklistComponent);
      });
  });
});

class MockPicklistService {
    constructor($q) {
      this.q = $q;
    }
    queryService() {
      let deferred = this.q.defer();
      return deferred.promise;
    }
    queryStates() {
      let deferred = this.q.defer();
      return deferred.promise;
    }
}; 
