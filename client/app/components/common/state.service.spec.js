import {StateService as stateService} from './state.service';
import {app} from '../../app';
import * as constants from './constants';

describe('StateService', ()=>{
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
  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });


  describe('QueryAdjacentStates', ()=>{
    it('must return all states in response', ()=>{ 
      
      // console.log(`QueryAdjacentStates spec Service.greeting: ${service.greeting}`);  
      // console.log(`QueryAdjacentStates spec Service.adjacentStates: ${service.adjacentStates}`);  
      // console.log(`QueryAdjacentStates spec Service.selectedStateSubject: ${service.selectedStateSubject}`);  
      
      let promise = service.queryAdjacentStates();
      httpBackend.flush();
      
      promise.then((result) => {
        expect(result.data).to.deep.equal(response);        
      });
      
      rootScope.$digest();
    });
  });


    // it('must FOOBAR', ()=>{ 
      
    // });



});
