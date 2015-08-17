import {login} from './login';
import {LoginComponent} from './login.component';
import {loginDirective} from './login.component';
import template from './login.html';

describe('Login', ()=>{
  let $rootScope,
  makeComponent;

  beforeEach(window.module(login.name));
  beforeEach(inject((_$rootScope_)=>{
    $rootScope = _$rootScope_;
    makeComponent = ()=>{
      return new LoginComponent();
    };
  }));

  describe('Module', ()=>{
    // test things about the component module
    // checking to see if it registers certain things and what not
    // test for best practices with naming too
    // test for routing
  });

  describe('Component', ()=>{
    // test your controller here

    it('should have username and password properties', ()=>{ 
      let component = makeComponent();

      expect(component).to.have.property('username');
      expect(component).to.have.property('password');
    });
  });

  describe('Template', ()=>{
    // test the template
    // use Regexes to test that you are using the right bindings {{  }}

    it('should have vm.username in template', ()=>{
      expect(template).to.match(/\s?vm\.username\s?/g);
    });
  });


  describe('Directive', ()=>{
      // test the component/directive itself
      let directive = loginDirective();

      it('should use the right template',()=>{
        expect(directive.template).to.equal(template);
      });

      it('should use controllerAs', ()=>{
        expect(directive).to.have.property('controllerAs');
      });

      it('should use the right controller', ()=>{
        expect(directive.controller).to.equal(LoginComponent);
      });
  });
});
