/* Protractor configuration file */
exports.config = {
  directConnect: true,
  framework: 'jasmine2',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  rootElement: 'body',
  specs: ['e2e-tests/*spec.js'],
  onPrepare: function() {
     browser.driver.manage().window().setSize(1600, 800);
  },  
  // Options to be passed to Jasmine.
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
