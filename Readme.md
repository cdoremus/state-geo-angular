# state-geo: Test your knowledge of the US states #

## angular2.0 branch ##

This is the development branch for the Angular 2 version of the State Geo Quiz app being
ported over from AngularJS 1.5.

This branch was created from the master branch of this repository, which is written in ES6.
Each of the component and service JavaScript files was converted to a TypeScript file by changing the
.js extension to .ts and the file contents upgraded to the Angular 2 API.

All code has been upgraded to **Angular 2.1.0** built with Webpack.

Before the Webpack build can be run, the Stylus .styl files need to be compiled to css
using this command:
```bash
npm run stylus
```
Then run the webpack build using this command:
```bash
npm run webpack
```
Start the webpack dev server in a separate window:
```bash
npm run server
```
Then browse to [http://localhost:8080](http://localhost:8080)

## TODOs
1. Fix the compilation of the stylus files
2. The app has some styling issues in the compiled CSS files
3. The Capital Quiz logic needs to be fixed.
4. Unit and e2e tests need work.

