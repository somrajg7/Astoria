var CurlUtils = require('./curl-utils.js');
var fs = require('fs');
var fsExtra = require('fs-extra');
var logger = require('../logger.js');
var mkdirp = require('mkdirp');
var moment = require('moment');
var path = require('path');
var Q = require('q');
var url = require('url');

var config = require('./config.json');

var DataDownloader = {};
module.exports = DataDownloader;

DataDownloader.download = function(username, password) {
    // First, remove the db/download directory
    fsExtra.removeSync(path.join(process.cwd(), 'db/download'));

    // Download mock data
    for (var mockData of config.mockData) {
        var dataUrls = getDataUrls(mockData);
        for (var j = 0; j < dataUrls.length; j++) {
            var dataUrl = dataUrls[j];
            var parsedUrl = url.parse(dataUrl);

            // Determine output directory
            var outputDir = mockData.output;
            if (!outputDir) {
                outputDir = path.dirname(parsedUrl.pathname);
            }
            outputDir = path.join(process.cwd(), 'db/download', outputDir);

            // Download and save data file
            downloadAndSave(parsedUrl, mockData.headers, username, password, outputDir);
        }
    }
};

function getDataUrls(mockData) {
    var dataUrls = [];

    for (var dataUrl of mockData.urls) {
        // Get data url and override variables
        var endVarIndex = dataUrl.indexOf('::');
        if (endVarIndex > 0) {
            var varName = dataUrl.substring(0, endVarIndex);
            dataUrl = config.config[varName] + dataUrl.substring(endVarIndex + 2);
        }

        if (mockData.args) {
            for (var args of mockData.args) {
                var dataUrlWithArgs = dataUrl;
                for (var key in args) {
                    var value = args[key];
                    if (value === '{{today}}') {
                        value = moment().format('YYYY-MM-DD');
                    }
                    dataUrlWithArgs = dataUrlWithArgs.replace('{{' + key + '}}', value);
                }
                dataUrls.push(dataUrlWithArgs);
            }
        } else {
            dataUrls.push(dataUrl);
        }
    }

    return dataUrls;
}

function downloadAndSave(url, headers, username, password, outputDir) {
    CurlUtils.download(url, headers, username, password, function(data) {
        var fileName = path.basename(url.pathname);
        if (path.extname(fileName) === '') {
            fileName = fileName + '.json';
        }
        var filePath = path.join(outputDir, fileName);

        // Format JSON
        if (path.extname(fileName) === '.json') {
            try {
                var json = JSON.parse(data);
                data = JSON.stringify(json, null, 4);
            } catch (err) {
                logger.error(`Unable to parse data from ${url.href}: ${data}`);
            }
        }

        logger.info(`Writing file: ${url.href} into: ${filePath}`);
        mkdirp.sync(outputDir);
        fs.writeFileSync(filePath, data);
    });
}
