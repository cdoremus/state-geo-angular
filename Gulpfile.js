var gulp    = require('gulp');
var sync    = require('run-sequence');
var browser = require('browser-sync');
var webpack = require('webpack-stream');
var webpackConfig = require('./webpack.config');
var todo    = require('gulp-todoist');
var path    = require('path');
var yargs   = require('yargs').argv;
var tpl     = require('gulp-template');
var rename  = require('gulp-rename');
var uglify = require('gulp-uglify');

/*
map of paths for using with the tasks below
 */
var paths = {
  entry: 'client/app/app.js',
  app: ['client/app/**/*.{js,styl,html}', 'client/styles/**/*.styl'],
  js: 'client/app/**/*!(.spec.js).js',
  styl: ['client/app/**/*.styl', 'client/style/**/*.styl'],
  toCopy: ['client/index.html', 'client/adjacentStates.json', 'client/users.json'],
  html: ['client/index.html', 'client/app/**/*.html'],
//  dest: 'dist',
  dest: '../state-geo-server-spring/src/main/webapp/static',
  blankTemplates: 'templates/component/*.**'
};

// helper function
var resolveToComponents = function(glob){
  glob = glob || '';
  return path.join('client', 'app/components', glob); // app/components/{glob}
};

gulp.task('todo', function() {
  return gulp.src(paths.js)
    .pipe(todo({silent: false, verbose: true}));
});

gulp.task('build', ['todo'], function() {
  return gulp.src(paths.entry)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(paths.dest));
});

gulp.task('serve', function() {
  browser({
    port: process.env.PORT || 4500,
    open: false,
    ghostMode: false,
    server: {
      baseDir: 'dist' //all files served from dist folder
    }
  });
});

/*
simple task to copy over needed files to dist
 */
gulp.task('copy', function() {
  return gulp.src(paths.toCopy, { base: 'client' })
    .pipe(gulp.dest(paths.dest));
});

/*
Task to watch files for changes and call build and copy tasks
 */
gulp.task('watch', function() {
  gulp.watch(paths.app, ['build', browser.reload]);
  gulp.watch(paths.toCopy, ['copy', browser.reload]);
});

/*
Task to create a new AngularJS 1.x component with associated styl (css),
test (spec), HTML template and JavaScript helper files.
*/
gulp.task('component', function(){
  var cap = function(val){
    return val.charAt(0).toUpperCase() + val.slice(1);
  };
  var hyphenCase = function(str) {
      return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  }
  var name = yargs.name;
  var parentPath = yargs.parent || '';
  var destPath = path.join(resolveToComponents(), parentPath, name);
  var service = yargs.service;

  return gulp.src(paths.blankTemplates)
    .pipe(tpl({
      name: name,
      upCaseName: cap(name),
      service: service,
      upCaseService: cap(service),
      tagName: hyphenCase(name)
    }))
    .pipe(rename(function(path){
      path.basename = path.basename.replace('component', name);
    }))
    .pipe(gulp.dest(destPath));
});

gulp.task('minify-js', function () {
    gulp.src(paths.dest + '/bundle.js')
    .pipe(uglify())
    .pipe(gulp.dest(paths.dest));
});

// gulp.task('default', function(done) {
//   sync('build', 'copy', 'serve', 'watch', done)
// });

gulp.task('default', function(done) {
  sync('build', 'copy', 'watch', done)
});

gulp.task('prod', function(done) {
  sync('build', 'copy', 'minify-js', 'serve', 'watch', done)
});
