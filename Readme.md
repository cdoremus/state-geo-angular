# state-geo: Test your knowledge of the US states #

## angular2.0 branch ##

This is the development branch for the Angular 2 version of the State Geo Quiz app being
ported over from AngularJS 1.5.

This branch was created from the master branch of this repository, which is written in ES6.
Each of the component and service JavaScript files was converted to a TypeScript file by changing the
.js extension to .ts and the file contents upgraded to Angular 2.

## Progress as of 10/22/2016:

All code has been upgraded to **Angular 2.1.0** and webpack bundling seems to work,
but the webpack dev server is not properly loading the application.

The Stylus compilation also seems to be broken. All .styl files are
manually created by running the following command in each directory:

```bash
# Convert all stylus files to CSS by running this command in the app folder and each components folder
stylus -u jeet *.styl
```
