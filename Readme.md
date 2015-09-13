
# state-geo


####This webapp is designed to educate and test your knowledge of the individual US states. The first thing I am focussing on is adjacent states to a given state as I think this is an important factor in being geographically aware.####

The programming is done as an AngularJS 1 app using a component architecture similar to what's coming in Angular 2.0. The JavaScript code uses ES6/2015 as it is what is recommended for AngularJS 1 apps to be eventually ported to Angular 2. The Babel transpiler is used to compile the ES6/2015 code to ES5 to allow the app to be run in modern browsers.

The build system uses gulp with webpack (and babel). Stylus is used as the CSS preprocessor. Browser-sync is used to reload the browser after changes via a gulp task.

The templates folder contains templates for new components built inside of a new folder under client/app. They can be created with this command:
gulp component --name newComponentName

This project builds a bundle.js that is put in a destination folder in the 
back-end server project that holds the Java web service code (state-geo-server-spring).

Screenshot of Adjacent States Quiz with Erroneous Results:
![AdjacentQuizResultsScreenshot](screenshots/AdjacentQuizResultsScreenshot.png "Quiz Results Screenshot")

Screenshot of Adjacent States Quiz with Correct Results:
![AdjacentQuizResultsSuccessScreenshot](screenshots/AdjacentQuizResultsScreenshotSuccess.png "Quiz Results Success Screenshot")
