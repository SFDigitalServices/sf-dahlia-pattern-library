var path = require('path');
var webpack = require('webpack');

module.exports = function(fabricatorConfig) {

  "use strict";

  var config = {
    entry: {
      'toolkit/scripts/toolkit': fabricatorConfig.src.scripts.toolkit
    },
    output: {
      path: path.resolve(__dirname, fabricatorConfig.dest, 'public'),
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

  return config;

};
