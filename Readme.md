# state-geo: Test your knowledge of the US states #

## angular2.0 branch ##

This is the development branch for the Angular 2 version of the State Geo Quiz app being
ported over from AngularJS 1.5.

All features should work now (04-21-2016), but the tests still need to be fixed.

This branch was created from the master branch of this repository, which is written in ES6.
Each of the component and service JavaScript files was converted to a TypeScript file by changing the
.js extension to .ts.

## Building and Running the angular2.0 Branch ##

The build system for this branch uses gulp with webpack and TypeScript.
Stylus is used as the CSS preprocessor with Jeet to aid layout. If you want to run the program locally,
follow the following steps:

```bash
# clone this repo
git clone https://github.com/cdoremus/state-geo-angular.git

# change directory to the repo
cd state-geo-angular

# checkout the angular2.0 branch
git checkout angular2.0

# make sure you have the global npm packages installed
npm install -g gulp karma protractor typescript

# install the repo's dependencues
npm install

# Convert all stylus files to CSS by running this command in the app folder and each components folder
stylus -u jeet *.styl

# run the TypeScript compiler from the root folder to convert all TypeScript files to JavaScript
tsc -w

# build the app in a separate window
gulp

# start the server in a separate window
gulp serve
```
The application can then be accessed by browsing to <a href="http://localhost:4500/">http://localhost:4500/</a>.
