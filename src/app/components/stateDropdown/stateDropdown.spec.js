import {stateDropdown} from './stateDropdown'
import {StateDropdownComponent, stateDropdownComponent as stateDropdownDirective} from './stateDropdown.component';
import {app} from '../../app';
import template from './stateDropdown.html';

describe('StateDropdown', ()=>{
  let $rootScope, q, stateService, httpBackend;

  beforeEach(window.module('app'));
  beforeEach(window.module(stateDropdown.name));
  beforeEach(inject((_$rootScope_, $httpBackend, $q, _stateService_)=>{
    $rootScope = _$rootScope_;
    httpBackend = $httpBackend;
    q = $q;
    stateService = _stateService_;
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
      let controller = new StateDropdownComponent(stateService);

      expect(controller).to.have.property('states');
    });
  });

  describe('Template', ()=>{
    // test the template
    // use Regexes to test that you are using the right bindings {{  }}
    it('should have componentId in template', ()=>{
      expect(template).to.match(/{{\s?vm\.componentId\s?}}/g);
    });
  });


  describe('Directive', ()=>{
      // test the component/directive itself
      let directive = stateDropdownDirective;

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
