/**
 * Function that returns default values.
 * Used because Object.assign does a shallow instead of a deep copy.
 * Using [].push will add to the base array, so a require will alter
 * the base array output.
 */
'use strict';
let webpack = require('webpack');

const path = require('path');
const srcPath = path.join(__dirname, '/../src');
const nodeModulesPath = path.join(__dirname, '/../node_modules');
const commonPath = nodeModulesPath + '/@prop-ui/common';
const dfltPort = 8000;

/**
 * Get the default modules object for webpack
 * @return {Object}
 */
function getDefaultModules() {
  return {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        include: srcPath,
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      {
        test: /\.(png|jpg|gif|ttf|woff|woff2)$/,
        loader: 'url-loader?limit=8192'
      }, {
        test: /\.(eot|mp4|ogg|svg)$/,
        loader: 'file-loader'
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  };
}

module.exports = {
  srcPath: srcPath,
  commonPath: commonPath,
  publicPath: '/assets/',
  port: dfltPort,
  plugins: [new webpack.ProvidePlugin({'$': 'jquery', 'jQuery': 'jquery', 'window.jQuery': 'jquery'})],
  getDefaultModules: getDefaultModules
};
