'use strict';
let path = require('path');
let defaultSettings = require('./defaults');

// Additional npm or bower modules to include in builds
// Add all foreign plugins you may need into this array
// @example:
// let npmBase = path.join(__dirname, '../node_modules');
// let additionalPaths = [ path.join(npmBase, 'react-bootstrap') ];
let additionalPaths = [];

module.exports = {
  additionalPaths: additionalPaths,
  port: defaultSettings.port,
  debug: true,
  devtool: 'eval',
  output: {
    path: path.join(__dirname, '/../build/dist/assets'),
    filename: 'app.js',
    publicPath: defaultSettings.publicPath
  },
  devServer: {
    contentBase: './src/',
    historyApiFallback: true,
    hot: true,
    port: defaultSettings.port,
    publicPath: defaultSettings.publicPath,
    noInfo: false
  },
  plugins: defaultSettings.plugins,
  resolve: {
    extensions: [
      '', '.js', '.jsx'
    ],
    alias: {
      actions: `${defaultSettings.srcPath}/actions`,
      components: `${defaultSettings.srcPath}/components`,
      config: `${defaultSettings.srcPath}/config/` + process.env.REACT_WEBPACK_ENV,
      images: `${defaultSettings.srcPath}/assets/images`,
      libCommonImages: `${defaultSettings.libCommonPath}/assets/images`,
      libCommonStyles: `${defaultSettings.libCommonPath}/assets/styles`,
      nodeModules: `${defaultSettings.nodeModulesPath}`,
      sources: `${defaultSettings.srcPath}/sources`,
      stores: `${defaultSettings.srcPath}/stores`,
      styles: `${defaultSettings.srcPath}/assets/styles`
    }
  },
  module: {},
  sassLoader: {
    includePaths: [path.join(__dirname, '/../node_modules')]
  }
};
