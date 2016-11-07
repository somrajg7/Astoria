var jsonfile = require('jsonfile');
var logger = require('../logger.js');
var middleware = require('swagger-express-middleware');
var recursive = require('recursive-readdir');

var DataStoreLoader = {};
module.exports = DataStoreLoader;

DataStoreLoader.load = function(myDB, baseDir) {
    // Filter function
    var ignoreFunc = function(file, stats) {
        return stats.isFile() && !file.endsWith('.json');
    };

    // Scan through the /db directory for all *.json files and add them into the custom data store
    recursive(baseDir, [ignoreFunc], function(err, files) {
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var path = file.slice(baseDir.length, file.length - 5).replace(/\\/g, '/');
            var data = jsonfile.readFileSync(file, 'utf8');

            logger.debug(`Loading file: ${file}, and configured path to: ${path}`);
            myDB.save(new middleware.Resource(path, data));
        }
    });
}
