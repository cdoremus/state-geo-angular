import {StateService as stateService} from './state.service';
import {app} from '../../app';
import * as constants from './constants';

describe('StateService.queryAdjacentStates()', ()=>{
  let service, httpBackend ,response, rootScope;

  beforeEach(window.module('app'));
  
  beforeEach(inject(($httpBackend, $rootScope, _stateService_) => {
    httpBackend = $httpBackend;
    rootScope = $rootScope;
    response = [
        {name:"Connecticut", adjacent:["Massachusetts","New York","Rhode Island"]},
        {name:"Delaware", adjacent:["Maryland", "New Jersey", "Pennsylvania"]}      
      ]; 
    httpBackend
        .when('GET', constants.webservice_url.adjacentStates)
        .respond(response);
    service = _stateService_;
    
  }));
  
  // make sure no expectations were missed in your tests.
  // (e.g. expectGET or expectPOST)
  afterEach(() => {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });


  describe('queryAdjacentStates', ()=>{
    it('must return all adjacent states promise', ()=>{ 
      
      let promise = service.queryAdjacentStates();
      httpBackend.flush();
      
      promise.then((result) => {
        expect(result.data).to.deep.equal(response);        
      });
      
      rootScope.$digest();
    });
  });


  describe('populateAdjacentStates', () => {
    it('must populate StateService.adjacentStates with all adjacent states data', ()=>{ 
      
      service.populateAdjacentStates();
      httpBackend.flush();
      
      expect(service.adjacentStates).to.deep.equal(response);        
      
      rootScope.$digest();
    });
      
  });



});


describe('StateService.checkSelectedCapital', () => {
  let service, httpBackend ,rootScope;
  
  beforeEach(window.module('app'));
  
  beforeEach(inject(($httpBackend, $rootScope, _stateService_) => {
    httpBackend = $httpBackend;
    rootScope = $rootScope;
    service = _stateService_;
  }));
  
  it('checkSelectedCapital must return true if selected capital is correct', ()=>{ 
      let selectedState = {name: 'Maine', capital: 'Augusta'};      
      let selectedCapital = {name: 'Maine', capital: 'Augusta'};
      
      let check = service.checkSelectedCapital(selectedState, selectedCapital);
      expect(check).to.be.true;      
  });

  it('checkSelectedCapital must return false if selected capital is correct', ()=>{ 
      let selectedState = {name: 'Maine', capital: 'Augusta'};      
      let selectedCapital = {name: 'Idaho', capital: 'Boise'};
      
      let check = service.checkSelectedCapital(selectedState, selectedCapital);
      expect(check).to.be.false;      
  });
});
