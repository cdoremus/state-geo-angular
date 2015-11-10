
var constants = require('./specConstants.js');

describe('Capital Quiz Page', function() {
  var BASE_URL = constants.BASE_URL;
  

  it('Capital Quiz must have US States Quiz page title', function() {
    browser.get(BASE_URL + '/#/capitalQuiz');

    expect(browser.getTitle()).toEqual('US States Quiz');
  });

});
