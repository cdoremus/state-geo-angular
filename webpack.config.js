/*
config for webpack. Will be used in
the Gulpfile for building our app.
Does not need gulp in order to do so,
but we use gulp to orchestrate
 */
var webpack = require('webpack');
var path = require('path');
var validate = require('webpack-validator')
// Webpack Plugins
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
// var autoprefixer = require('autoprefixer'); //NOT USED
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
// var DashboardPlugin = require('webpack-dashboard/plugin'); //NOT USED

/**
 *
 * @param Relative directory or file path.
 * When called with multiple arguments, they get concatinated
 * together and then appended to the full path.
 * return Full path to file or directory using args or the
 * full path to this diectory if called with no args.
 */
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  // Note: __dirname is the full path to the current directory
  return path.join.apply(path, [__dirname].concat(args));
}

var config = {

  entry: {
    'polyfills': './client/polyfills.ts',
    'vendor': './client/vendor.ts',
    'app': './client/app/main.ts' // our angular app
  },

  output: {
    path: root('dist'),
    filename: 'js/[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },

  devtool: 'source-map',

  resolve: {
    // cache: true,
    // root: root(),
    // only discover files that have those extensions
    //extensions: ['', '.js'],
    extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html'],
    alias: {
      'app': 'client/app'
    }
  },

  module: {
//    preLoaders: [
//       { test: /\.js$/, loader: 'source-map-loader', exclude: [ root('node_modules/rxjs') ] }
//     ],
    loaders: [
      { test: /\.html$/, loader: 'raw' },
      { test: /\.json$/, loader: 'json' },
      // { test: /\.styl$/, loader: 'style!css!stylus' },
      { test: /\.css/, loaders: [ 'to-string', 'css' ]},
      { test: /\.ts$/, loaders: ['awesome-typescript-loader', 'angular2-template-loader', 'angular2-router-loader', '@angularclass/hmr-loader'], exclude: [ /\.(spec|e2e)\.ts$/ ] }
    ]},

  devServer: {
      contentBase: root('dist'),
      historyApiFallback: true,
      quiet: true,
      stats: 'minimal' // none (or false), errors-only, minimal, normal (or true) and verbose
  },

  // stylus: {
  //   use: [require('jeet')(), require('rupture')(), require('bootstrap-styl')()]
  // },

  plugins: [
     // Inject script and link tags into html files
      // Reference: https://github.com/ampedandwired/html-webpack-plugin
      new HtmlWebpackPlugin({
        template: './client/index.html',
        chunksSortMode: 'dependency'
      }),

     // Generate common chunks if necessary
      // Reference: https://webpack.github.io/docs/code-splitting.html
      // Reference: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
      new CommonsChunkPlugin({
        name: ['vendor', 'polyfills']
      }),

      // Extract css files
      // Reference: https://github.com/webpack/extract-text-webpack-plugin
      // Disabled when in test mode or not in build mode
      // new ExtractTextPlugin('css/[name].css'),

      // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
      // Only emit files when there are no errors
      new webpack.NoErrorsPlugin(),

      // Workaround needed for angular 2 angular/angular#11580
      new webpack.ContextReplacementPlugin(
        // The (\\|\/) piece accounts for path separators in *nix and Windows
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        root('./client') // location of your src
      ),

      // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
      // Minify all javascript, switch loaders to minimizing mode
//      new webpack.optimize.UglifyJsPlugin({mangle: { keep_fnames: true }}),

      // Copy assets from the public folder
      // Reference: https://github.com/kevlened/copy-webpack-plugin
      new CopyWebpackPlugin([
        { from: 'client/index.css' },
        { from: 'client/adjacentStates.json' },
        { from: 'client/states.json' },
        { from: 'client/users.json' }
      ])


  ]
};

module.exports = validate(config);
