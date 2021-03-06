import {<%= name %>} from './<%= name %>';
import {<%= upCaseName %>Component} from './<%= name %>.component';
import {<%= name %>Directive} from './<%= name %>.component';
import template from './<%= name %>.html';

describe('<%= upCaseName %>', ()=>{
  let $rootScope,
  makeController;

  beforeEach(window.module(<%= name %>.name));
  beforeEach(inject((_$rootScope_)=>{
    $rootScope = _$rootScope_;
    makeController = ()=>{
      return new <%= upCaseName %>Component();
    };
  }));

  describe('Module', ()=>{
    // test things about the component module
    // checking to see if it registers certain things and what not
    // test for best practices with naming too
    it('should have an appropriate name', () => {
      expect(<%= name %>.name).to.equal('<%= name %>');
    });
    // test for routing
  });

  describe('Directive Controller', ()=>{
    // test your controller here

    it('should have a "greeting" property', ()=>{ 
      let controller = makeController();

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
      let directive = <%= name %>Directive();

      it('should use the right template',()=>{
        expect(directive.template).to.equal(template);
      });

      it('should use controllerAs', ()=>{
        expect(directive).to.have.property('controllerAs');
      });

      it('should use the right controller', ()=>{
        expect(directive.controller).to.equal(<%= upCaseName %>Component);
      });
  });
});
