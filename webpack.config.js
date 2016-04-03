/*
config for webpack. Will be used in
the Gulpfile for building our app.
Does not need gulp in order to do so,
but we use gulp to orchestrate
 */
var webpack = require('webpack');
var path = require('path');

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}

module.exports = {
  output: {
    filename: 'bundle.js'
  },

  devtool: 'sourcemap',

  entry: './client/app/boot.js',

  resolve: {
    extensions: ['', '.js']
  },

  module: {
//    preLoaders: [
//       { test: /\.js$/, loader: 'source-map-loader', exclude: [ root('node_modules/rxjs') ] }
//     ],
    loaders: [
      { test: /\.html$/, loader: 'raw' },
      { test: /\.json$/, loader: 'file' },
      { test: /\.styl$/, loader: 'style!css!stylus' },
      { test: /\.css/, loader: 'style!css' },
      { test: /\.js$/, loader: 'babel?stage=1', exclude: [/client\/lib/, /node_modules/, /\.spec\.js/] }
    //   { test: /\.ts$/, loader: 'awesome-typescript-loader', exclude: [ /\.(spec|e2e)\.ts$/ ] }
     ]
  },

  stylus: {
    use: [require('jeet')(), require('rupture')(), require('bootstrap-styl')()]
  }
};
