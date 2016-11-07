'use strict';

let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

let baseConfig = require('./base');
let defaultSettings = require('./defaults');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');

let config = Object.assign({}, baseConfig, {
  entry: [
    'bootstrap-loader/extractStyles',
    path.join(__dirname, '../src/index')
  ],
  cache: false,
  devtool: 'sourcemap',
  module: defaultSettings.getDefaultModules()
});

// Add needed plugins to the defaults here
config.plugins.push(new ExtractTextPlugin('app.css'), //
    new webpack.optimize.DedupePlugin(), //
    new webpack.DefinePlugin({'process.env.NODE_ENV': '"production"'}), //
    new BowerWebpackPlugin({searchResolveModulesDirectories: false}), //
    new webpack.optimize.UglifyJsPlugin({compress: true, comments: false}), //
    new webpack.optimize.OccurenceOrderPlugin(), //
    new webpack.optimize.AggressiveMergingPlugin(), //
    new webpack.NoErrorsPlugin());

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.css$/,
  loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
}, {
  test: /\.sass$/,
  loader: ExtractTextPlugin.extract('style-loader', ['css-loader', 'postcss-loader', 'sass-loader'])
}, {
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract('style-loader', ['css-loader', 'postcss-loader', 'sass-loader'])
}, {
  test: /\.less$/,
  loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'less-loader')
}, {
  test: /\.styl$/,
  loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'stylus-loader')
}, {
  test: /\.(js|jsx)$/,
  loader: 'babel',
  include: [].concat(config.additionalPaths, [path.join(__dirname, '/../src')])
});

module.exports = config;
