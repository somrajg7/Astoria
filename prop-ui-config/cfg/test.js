'use strict';

let path = require('path');
let srcPath = path.join(__dirname, '/../src/');
const libCommonPath = path.join(__dirname, '/../node_modules/@prop-ui/lib-common');

let baseConfig = require('./base');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');

module.exports = {
  devtool: 'eval',
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'isparta-instrumenter-loader',
        include: [path.join(__dirname, '/../src')]
      }
    ],
    loaders: [
      {
        test: /\.(png|jpg|gif|woff|woff2|css|sass|scss|less|styl)$/,
        loader: 'null-loader'
      }, {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: [].concat(baseConfig.additionalPaths, [
          path.join(__dirname, '/../src'),
          path.join(__dirname, '/../test')
        ])
      }
    ]
  },
  resolve: {
    extensions: [
      '', '.js', '.jsx'
    ],
    alias: {
      actions: srcPath + 'actions',
      components: srcPath + 'components',
      config: srcPath + 'config/' + process.env.REACT_WEBPACK_ENV,
      helpers: path.join(__dirname, '/../test/helpers'),
      images: srcPath + 'assets/images',
      libCommonImages: libCommonPath + '/assets/images',
      libCommonStyles: libCommonPath + '/assets/styles',
      sources: srcPath + 'sources',
      stores: srcPath + 'stores',
      styles: srcPath + 'assets/styles'
    }
  }
};

// Add needed plugins to the defaults here
config.plugins.push(new BowerWebpackPlugin({searchResolveModulesDirectories: false}));
