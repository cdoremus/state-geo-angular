import {adjacentQuiz} from './adjacentQuiz'
import {AdjacentQuizComponent} from './adjacentQuiz.component';
import {adjacentQuizComponent as adjacentQuizDirective} from './adjacentQuiz.component';
import template from './adjacentQuiz.html';
import {StateService} from '../common/state.service';

describe('AdjacentQuiz', ()=>{
  let $rootScope;
  let q;

  beforeEach(window.module(adjacentQuiz.name));
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

    it('should have a service property', ()=>{ // erase me if you remove this.name from the controller
      //Use a mock StateService with stubbed methods (see impl below)
      let stateService =  new MockStateService(q);
      let picklistService = new MockPicklistService(q, stateService);
      let controller =  new AdjacentQuizComponent(stateService, picklistService);

      expect(controller).to.have.property('service');
    });
  });

  describe('Template', ()=>{
    // test the template
    // use Regexes to test that you are using the right bindings {{  }}

    it('should have vm.selectedState.name in template', ()=>{
      expect(template).to.match(/\s?vm\.selectedState\.name\s?/g);
    });
  });


  describe('Directive', ()=>{
      // test the component/directive itself
      let directive = adjacentQuizDirective;

      it('should use the right template',()=>{
        expect(directive.template).to.equal(template);
      });

      it('should use controllerAs', ()=>{
        expect(directive).to.have.property('controllerAs');
      });

      it('should use the right controller', ()=>{
        expect(directive.controller).to.equal(AdjacentQuizComponent);
      });
  });


});


class MockStateService {
    constructor($q) {
      this.q = $q;
      this.selectedStateSubject = {
       subscribe: (newState) => {} 
      };
    }
    queryAdjacentStates() {
      let deferred = this.q.defer();
      return deferred.promise;
    }
    queryStates() {
      let deferred = this.q.defer();
      return deferred.promise;
    }
    populateAdjacentStates() {
      return [];
    }
    
};


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
