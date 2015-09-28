import {capitalQuiz} from './capitalQuiz'
import {CapitalQuizComponent} from './capitalQuiz.component';
import {capitalQuizDirective} from './capitalQuiz.component';
import template from './capitalQuiz.html';
import {CapitalQuizService} from './capitalQuiz.service';

describe('CapitalQuiz', ()=>{
  let $rootScope;
  
  beforeEach(window.module(capitalQuiz.name));
  beforeEach(inject((_$rootScope_)=>{
    $rootScope = _$rootScope_;
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
      let controller = new CapitalQuizComponent();

      expect(controller).to.have.property('greeting');
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
        expect(directive.controller).to.equal(CapitalQuizComponent;
      });
  });
});
