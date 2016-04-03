import {
  it,
  describe,
  expect,
  inject,
  fakeAsync,
  afterEach,
  beforeEachProviders,
  tick,
  flushMicrotasks
  } from 'angular2/testing';
import {MockBackend} from 'angular2/http/testing';
import {provide} from 'angular2/core';
import {
  Http,
  ConnectionBackend,
  BaseRequestOptions,
  Response,
  ResponseOptions
  } from 'angular2/http';
import StateService from './state.service';
import AppComponent from '../../app';
import * as constants from './constants';


const beforeProvider = function() {
  return [
    BaseRequestOptions,
    MockBackend,
    SpotifyService,
    provide(Http, {useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
      return new Http(backend, defaultOptions);
    }, deps: [MockBackend, BaseRequestOptions]}),
  ]
};

// sets up an expectation that the correct URL will being requested
let expectURL = function(backend: MockBackend, url: string) {
  backend.connections.subscribe(c => {
    expect(c.request.url).toBe(url);
    let response = new ResponseOptions({body: '{"name": "felipe"}'});
    c.mockRespond(new Response(response));
  });
}


describe('StateService.queryAdjacentStates()', ()=>{
  // let service, httpBackend ,response, rootScope;

  // beforeEach(window.module('app'));

  // beforeEach(inject(($httpBackend, $rootScope, _stateService_) => {
  //   httpBackend = $httpBackend;
  //   rootScope = $rootScope;
  //   response = [
  //       {name:"Connecticut", adjacent:["Massachusetts","New York","Rhode Island"]},
  //       {name:"Delaware", adjacent:["Maryland", "New Jersey", "Pennsylvania"]}
  //     ];
  //   httpBackend
  //       .when('GET', constants.webservice_url.adjacentStates)
  //       .respond(response);
  //   service = _stateService_;

  // }));

  afterEach(() => {

  });


  describe('queryAdjacentStates', ()=>{

    beforeEachProviders(beforeProvider());

    it('must return all adjacent states promise',
      inject([SpotifyService, MockBackend], fakeAsync((spotifyService, mockBackend) => {
        var res;
        mockBackend.connections.subscribe(c => {
//          expect(c.request.url).toBe('https://api.spotify.com/v1/tracks/TRACK_ID');
          let response = new ResponseOptions([
            {name:"Connecticut", adjacent:["Massachusetts","New York","Rhode Island"]},
            {name:"Delaware", adjacent:["Maryland", "New Jersey", "Pennsylvania"]}
          ]);
          c.mockRespond(new Response(response));
        });
        stateService.queryStates().subscribe((_res) => {
          res = _res;
        });
        tick();
        expect(res.name).toBe('felipe');
      }))
    );
});


  describe('populateAdjacentStates', () => {
    it('must populate StateService.adjacentStates with all adjacent states data', ()=>{

      service.populateAdjacentStates();
      httpBackend.flush();

      expect(service.adjacentStates).to.deep.equal(response);

      // rootScope.$digest();
    });

  });

});

// describe('StateService.queryStates()', ()=>{
//   let service, response;

//   beforeEach(window.module('app'));

//   beforeEach( () => {

//   });

//   // make sure no expectations were missed in your tests.
//   // (e.g. expectGET or expectPOST)
//     afterEach(inject(($httpBackend) => {
//         $httpBackend.verifyNoOutstandingExpectation();
//         $httpBackend.verifyNoOutstandingRequest();
//     }));


//     it('must return all states promise', (inject(($httpBackend, $rootScope, _stateService_) => {
//       response = [
//           {name:"Connecticut", adjacent:["Massachusetts","New York","Rhode Island"]},
//           {name:"Delaware", adjacent:["Maryland", "New Jersey", "Pennsylvania"]}
//         ];
//       $httpBackend
//           .when('GET', constants.webservice_url.states)
//           .respond(response);
//       service = _stateService_;

//       let promise = service.queryStates();
//       $httpBackend.flush();

//       promise.then((result) => {
//         expect(result.data).to.deep.equal(response);
//       });

//       // rootScope.$digest();
//     })));
//  });



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


