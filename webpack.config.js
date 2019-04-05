var path = require('path');
var webpack = require('webpack');

module.exports = function(fractalConfig) {

  "use strict";

  var config = {
    entry: {
      'toolkit/scripts/toolkit': fractalConfig.src.scripts
    },
    output: {
      path: path.resolve(__dirname, fractalConfig.dest),
      filename: '[name].js'
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules|prism\.js)/,
          loaders: ['babel-loader']
        }
      ]
    },
    plugins: [],
    resolve: {
      modulesDirectories: ['node_modules', 'bower_components']
    },
    cache: {}
  };

if (!fractalConfig.dev) {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  );
}

  return config;

};
