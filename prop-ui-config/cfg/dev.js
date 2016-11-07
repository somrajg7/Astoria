'use strict';

let path = require('path');
let webpack = require('webpack');
let baseConfig = require('./base');
let defaultSettings = require('./defaults');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');

let config = Object.assign({}, baseConfig, {
  entry: [
    'webpack-dev-server/client?http://127.0.0.1:' + defaultSettings.port,
    'webpack/hot/only-dev-server',
    'bootstrap-loader',
    './src/index'
  ],
  cache: true,
  devtool: 'eval-source-map',
  module: defaultSettings.getDefaultModules()
});

// Add needed plugins to the defaults here
config.plugins.push(new webpack.HotModuleReplacementPlugin(), new webpack.NoErrorsPlugin(), new BowerWebpackPlugin({searchResolveModulesDirectories: false}));

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.css$/,
  loader: 'style-loader!css-loader'
}, {
  test: /\.sass/,
  loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded&indentedSyntax'
}, {
  test: /\.scss/,
  loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
}, {
  test: /\.less/,
  loader: 'style-loader!css-loader!less-loader'
}, {
  test: /\.styl/,
  loader: 'style-loader!css-loader!stylus-loader'
}, {
  test: /\.(js|jsx)$/,
  loader: 'react-hot!babel-loader',
  include: [].concat(config.additionalPaths, [path.join(__dirname, '/../src')])
});

module.exports = config;
