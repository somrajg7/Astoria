var fs = require('fs');
var https = require('https');
var logger = require('../logger.js');
var mkdirp = require('mkdirp');
var path = require('path');
var url = require('url');

var CurlUtils = {};
module.exports = CurlUtils;

CurlUtils.download = function(url, headers, username, password, closure) {
    var options = {
        hostname: url.hostname,
        port: url.port,
        path: url.path,
        method: 'GET',
        auth: username + ':' + password
    };

    logger.debug(`Downloading file: ${url.href}`);
    var req = https.request(options, function(res) {
        // Continuously update stream with data
        var data = '';
        res.on('data', function(d) {
            data += d;
        });
        // Execute closure when response stream has ended
        res.on('end', function() {
            // Return right away if if a non-successful status code was returned
            if (res.statusCode < 200 || res.statusCode > 300) {
                logger.error(`Received unexpected ${res.statusCode} status code from: ${url.href}`);
                return;
            }

            // Return right away if no data is available
            if (!data) {
                logger.error(`No data downloaded from: ${res.statusCode} ${url.href}`);
                return;
            }

            closure(data);
        });
    });
    req.end();

    req.on('error', function(e) {
        console.error(e);
    });
};

CurlUtils.downloadAndSave = function(url, headers, username, password, outputDir) {
    CurlUtils.download(url, headers, username, password, function(data) {
        var fileName = path.basename(url.pathname);
        var filePath = path.join(outputDir, fileName);

        logger.info(`Writing file: ${url.href} into: ${filePath}`);
        mkdirp.sync(outputDir);
        fs.writeFileSync(filePath, data);
    });
};
