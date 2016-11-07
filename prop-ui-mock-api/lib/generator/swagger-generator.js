var CurlUtils = require('./curl-utils.js');
var jsonfile = require('jsonfile');
var lodash = require('lodash');
var logger = require('../logger.js');
var path = require('path');
var Q = require('q');
var url = require('url');
var YAML = require('yamljs');

var config = require('./config.json');

var SwaggerGenerator = {};
module.exports = SwaggerGenerator;

SwaggerGenerator.generate = function(username, password) {
    var promises = [];
    var mergedSwagger = {};

    // Loop through to retreive and merge all the swagger documents
    for (var swaggerUrl of config.swagger.urls) {
        if (swaggerUrl.startsWith('file::')) {
            // Add promise to read swagger from file
            promises.push(readSwaggerPromise(swaggerUrl));
        } else {
            // Add promise to download swagger
            promises.push(downloadSwaggerPromise(swaggerUrl, username, password));
        }
        // After retrieving a swagger document, add promise to merge the swagger
        promises.push(mergeSwaggerPromise(mergedSwagger));
    }

    // After merging all the swagger documents, update the swagger info with mock swagger info and format the swagger
    promises.push(function(swagger) {
        swagger.info = config.swagger.info;
        swagger.paths = sortByKeys(swagger.paths);
        swagger.definitions = sortByKeys(swagger.definitions);
        swagger.parameters = sortByKeys(swagger.parameters);
        swagger.responses = sortByKeys(swagger.responses);
        return swagger;
    });

    // Lastly, write the merge swagger to file
    promises.push(function(swagger) {
        logger.info(`Writing mock swagger to: ${config.swagger.output}`);
        jsonfile.writeFileSync(path.join(process.cwd(), config.swagger.output), swagger, {spaces: 2});
        return swagger;
    });

    promises.reduce(Q.when, Q(mergedSwagger));
};

// Sort object proprties by key
function sortByKeys(obj) {
    var sortedObj = {};
    for (var key of Object.keys(obj).sort()) {
        sortedObj[key] = obj[key];
    }
    return sortedObj;
}

// Promise that merges swgger documents together
function mergeSwaggerPromise(mergedSwagger) {
    return function(swagger) {
        return lodash.merge(mergedSwagger, swagger);
    };
}

// Promise to read a JSON or YAML swagger docuemnt from file
function readSwaggerPromise(swaggerUrl) {
    var filePath = path.join(process.cwd(), swaggerUrl.substring(6));
    var fileName = path.basename(filePath);

    var swagger = null;
    if (path.extname(fileName) === '.json') {
        return function(mergedSwagger) {
            var deferred = Q.defer();
            logger.debug(`Reading JSON file: ${filePath}`);
            jsonfile.readFile(filePath, 'utf8', deferred.resolve);
            return deferred.promise;
        };
    } else {
        return function(mergedSwagger) {
            var deferred = Q.defer();
            logger.debug(`Reading YAML file: ${filePath}`);
            YAML.load(filePath, deferred.resolve);
            return deferred.promise;
        };
    }
}

// Promise to download a JSON or YAML document
function downloadSwaggerPromise(swaggerUrl, username, password) {
    var endVarIndex = swaggerUrl.indexOf('::');
    if (endVarIndex > 0) {
        var varName = swaggerUrl.substring(0, endVarIndex);
        swaggerUrl = config.config[varName] + swaggerUrl.substring(endVarIndex + 2);
    }

    var parsedUrl = url.parse(swaggerUrl);

    return function(mergedSwagger) {
        var deferred = Q.defer();
        CurlUtils.download(parsedUrl, null, username, password, deferred.resolve);
        return deferred.promise.then(function(data) {
            var fileName = path.basename(parsedUrl.pathname);

            var swagger = null;
            if (path.extname(fileName) === '.json') {
                logger.debug(`Parsing JSON file: ${parsedUrl.href}`);
                swagger = JSON.parse(data);
            } else {
                logger.debug(`Parsing YAML file: ${parsedUrl.href}`);
                swagger = YAML.parse(data);
            }
            return swagger;
        });
    };
}
