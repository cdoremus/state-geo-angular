import {capitalQuiz} from './capitalQuiz'
import {CapitalQuizComponent} from './capitalQuiz.component';
import {capitalQuizDirective} from './capitalQuiz.component';
import template from './capitalQuiz.html';
import {CapitalQuizService} from './capitalQuiz.service';
import {app} from '../../app';

describe('CapitalQuiz', ()=>{
  let $rootScope, stateService;
  
  beforeEach(window.module(capitalQuiz.name));
  beforeEach(window.module(app.name));

  beforeEach(inject((_$rootScope_, _stateService_)=>{
    $rootScope = _$rootScope_;
    stateService = _stateService_;
  }));

  describe('Module', () => {
    // test things about the component module
    // checking to see if it registers certain things and what not
    // test for best practices with naming too
    it('should have an appropriate name', () => {
      expect(capitalQuiz.name).to.equal('capitalQuiz');
    });
    // test for routing
  });

  describe('Controller', () => {
    
    it('should have a title property', () => { 
      let component = new CapitalQuizComponent(stateService);

      expect(component).to.have.property('title');
    });

    it('selectedStateChanged() should set selectedState and call resetSelectedCapital() to reset capital and uiMessage', 
      () => { 
      let component = new CapitalQuizComponent(stateService);
      component.selectedCapital = 'Boise';
      component.uiMessage = '';
      let newSelectedState = {name:'Maine', capital: 'Augusta'};
      component.selectedStateChanged(newSelectedState);
      
      expect(component.selectedState).to.equal(newSelectedState);
      expect(component.selectedCapital).to.be.empty;
      expect(component.uiMessage).to.equal('');
    });

  });

  describe('Template', ()=>{
    // test the template
    // use Regexes to test that you are using the right bindings {{  }}

    it('should have title in template', ()=>{
      expect(template).to.match(/{{\s?vm\.title\s?}}/g);
    });
  });


  describe('Directive', ()=>{
      // test the component/directive itself
      let directive = capitalQuizDirective();

      it('should use the right template',()=>{
        expect(directive.template).to.equal(template);
      });

      it('should use controllerAs', ()=>{
        expect(directive).to.have.property('controllerAs');
      });

      it('should use the right controller', ()=>{
        expect(directive.controller).to.equal(CapitalQuizComponent);
      });
  });
});
