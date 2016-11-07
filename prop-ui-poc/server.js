/*eslint no-console:0 */
'use strict';
require('core-js/fn/object/assign');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const open = require('open');
const express = require('express');

const args = require('minimist')(process.argv.slice(2));
console.log('Starting server for env ' + args.env);

if (args.env === 'dist') {
  var app = express();

  // Route to index.html
  app.get('/props/:propCode/poc', function(req, res) {
    res.sendFile(__dirname + '/dist/app/index.html');
  });
  app.get('/props/:propCode/poc/*', function(req, res) {
    res.sendFile(__dirname + '/dist/app/index.html');
  });

  // Route static assets
  app.use('/assets', express.static(__dirname + '/dist/app/assets'));

  app.listen(config.port, function() {
    console.log('Dist server listening at localhost: ' + config.port);
    console.log('Opening your system browser...');
    open('http://localhost:' + config.port + '/props/DALMA/poc');
  });
} else {
  new WebpackDevServer(webpack(config), config.devServer).listen(config.port, 'localhost', (err) => {
    if (err) {
      console.log(err);
    }
    console.log('Dev server listening at localhost:' + config.port);
    console.log('Opening your system browser...');
    open('http://localhost:' + config.port + '/webpack-dev-server/props/DALMA/poc');
  });
}
