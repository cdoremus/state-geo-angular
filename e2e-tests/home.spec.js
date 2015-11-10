
var constants = require('./specConstants.js');

describe('Home Page', function() {
  var BASE_URL = constants.BASE_URL;
  
  it('Home page must have US States Quiz page title', function() {
    browser.get(BASE_URL);

    expect(browser.getTitle()).toEqual('US States Quiz');
  });

});
