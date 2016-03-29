import {picklist} from './picklist'
import {PicklistComponent} from './picklist.component';
import {picklistComponent as picklistDirective} from './picklist.component';
import template from './picklist.html';


describe('Picklist', ()=>{
  let scope, q;

  beforeEach(window.module(picklist.name));
  beforeEach(inject(($rootScope, $q)=>{
    scope = $rootScope.$new();
    //Add a $parent field with data necessary for the tests 
    scope.$parent = {
      vm: {'selectedState': 'Maine'},
      $watch: () => console.log("$watch called")
    }
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

    it('should have a name property', ()=>{ // erase me if you remove this.name from the controller
      //manually inject MockPicklistService into component
      let stateService = new MockStateService(q);
      let service =  new MockPicklistService(q, stateService);
      let controller =  new PicklistComponent(service, stateService);

      expect(controller).to.have.property('greeting');
    });
  });

  describe('Template', ()=>{
    // test the template
    // use Regexes to test that you are using the right bindings {{  }}

    it('should have vm.greeting in template', ()=>{
      expect(template).to.match(/{{\s?vm\.greeting\s?}}/g);
    });
  });


  describe('Directive', ()=>{
      // test the component/directive itself
      let directive = picklistDirective;

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
    constructor($q, stateService) {
      this.q = $q;
      stateService.selectedStateSubject = {
       subscribe: (newState) => {} 
      };
      this.resultsMessageSubject = {
       subscribe: (newResultsMessage) => {}         
      }
    }
    getAdjacentStates(selectedState) {
      let deferred = this.q.defer();
      return deferred.promise;
    }
    queryStates() {
      let deferred = this.q.defer();
      return deferred.promise;
    }
    setResultsMessages(newMessages) {
      return [];
    }
    checkForExtraPickedStates(stateToTest, selectedStates) {
      return [];      
    }
    
};

class MockStateService {
    constructor($q) {
      this.q = $q;
      this.selectedStateSubject = {
       subscribe: (newState) => {} 
      };
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
