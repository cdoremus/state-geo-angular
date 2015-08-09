
# state-geo


## This webapp is designed to educate and test your knowledge of the individual US states. The first thing I am focussing on is adjacent states to a given state as I think this is an important factor in being geographically aware.


It is done as an AngularJS 1 app written in using a component architecture similar to what's coming in Angular 2.0.

The build system uses gulp with webpack. Stylus is used as a CSS preprocessor. Browser-sync is used to reload the browser after changes in gulp watch task.

The templates folder contains templates for new components built inside of a new folder under client/app. They can be created with this command:
gulp component --name <newcomponentname>
