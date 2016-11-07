const clc = require('cli-color');

var Logger = {};
module.exports = Logger;

// log debug messages
Logger.debug = function(log) {
    console.log(`DEBUG: ${log}`);
};

// log warning messages
Logger.info = function(log) {
    console.log(clc.green(`INFO: ${log}`));
};

// log warning messages
Logger.warn = function(log) {
    console.log(clc.yellow(`WARN: ${log}`));
};

// log error messages
Logger.error = function(log) {
    console.log(clc.red(`ERROR: ${log}`));
};
