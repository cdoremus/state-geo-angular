
var constants = require('./specConstants.js');

describe('Adjacent States Quiz Page', function() {
  var BASE_URL = constants.BASE_URL;
  
  it('Adjacent States Quiz must have US States Quiz page title', function() {
    browser.get(BASE_URL + '/#/adjacentQuiz');

    expect(browser.getTitle()).toEqual('US States Quiz');
  });

});
