'use strict';

module.exports = buildMessages;

const clc = require('cli-color');
const fs = require('fs-extra')
const path = require('path');

function buildMessages(inputMessageJSONPath, commonMessageJSONPath, outputMessageJSONPath) {
  var messageJSON = readAndMergeMessageJSON(inputMessageJSONPath, commonMessageJSONPath);
  var valid = validateMessageJSON(messageJSON);
  if (valid) {
    // Reformat and re-write input messages JSON to input file
    writeMessageJSON(inputMessageJSONPath, readMessageJSON(inputMessageJSONPath));
    // Write merged & formatted messages JSON to output file
    writeMessageJSON(outputMessageJSONPath, messageJSON);
  } else {
    throw Error('The messages are invalid. Please address the issue listed above.');
  }
}

// Reads the message JSON file(s), and merges in the entries from the common message JSON if specified.
function readAndMergeMessageJSON(inputMessageJSONPath, commonMessageJSONPath) {
  var inputMessageJSON = readMessageJSON(inputMessageJSONPath);
  if (commonMessageJSONPath) {
    var commonMessageJSON = readMessageJSON(commonMessageJSONPath);
    for (var key in commonMessageJSON.messages) {
      if (commonMessageJSON.messages.hasOwnProperty(key)) {
        // Add messages from the common message JSON into the main message JSON, but do not override
        // any values in the main message JSON with values from the common message JSON.
        if (!inputMessageJSON.messages.hasOwnProperty(key)) {
          inputMessageJSON.messages[key] = commonMessageJSON.messages[key];
        } else {
          logWarn(`Just verifying, but it looks like both the "${inputMessageJSONPath}" and "${commonMessageJSONPath}" files contain the same "${key}" message key. Is this override intentional?`);
        }
      }
    }
    return inputMessageJSON;
  }
}

// Read the messages JSON from file
function readMessageJSON(filePath) {
  logDebug(`Reading messages file: ${filePath}`);
  var file = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(file.toString());
}

// Write validated and formatted messages JSON to file
function writeMessageJSON(filePath, json) {
  // First check if the output directory exists, and creates it if it doesn't
  var dirPath = path.dirname(filePath);

  // Format JSON before writing to file
  var fmtJSON = formatMessageJSON(json);

  logDebug(`Creating output directory: ${dirPath}`);
  fs.mkdirsSync(dirPath);

  logDebug(`Writing to messages file: ${filePath}`);
  fs.writeFileSync(filePath, JSON.stringify(fmtJSON, null, 2) + '\n', {encoding: 'utf8'});
}

// Validate the keys & values of the messages JSON
function validateMessageJSON(messageJSON) {
  logDebug('Validating messages file.');
  var valid = true;
  var i = 0;
  for (var key1 in messageJSON.messages) {
    if (isInvalidKey(key1)) {
      valid = false;
      logError(`Key "${key1}" is invalid. Keys should not be empty and should only contain alpha numeric characters or an underscore.`);
    } else if (isInvalidValue(messageJSON.messages[key1])) {
      valid = false;
      logError(`The value for the key "${key1}" is empty. A value should be specified or the entry should be removed.`);
    } else {
      var val1 = messageJSON.messages[key1].trim();

      // Output warning if value is all in uppercase
      if (val1 === val1.toUpperCase()) {
        logWarn(`The value for key "${key1}" is all in upper case. Is this correct? (hint: Should probably handle this via css)`);
      }

      // Output warning if value ends with a colon (':'). It should probably be hardcoded within the component instead.
      if (val1.endsWith(':')) {
        logWarn(`The value for key "${key1}" ends with a colon (":"). Is this correct? (hint: It should probably hardcode this within the component)`);
      }

      var j = 0;
      for (var key2 in messageJSON.messages) {
        if (i !== j) {
          // Validate for duplicate keys
          if (key1.toUpperCase() === key2.toUpperCase()) {
            valid = false;
            logError(`Duplicate keys "${key1}" and "${key2}" exists. Key names should be unique.`);
          }

          // Validate for duplicate values
          var val2 = messageJSON.messages[key2].trim();
          if (val1 === val2) {
            valid = false;
            logError(`Duplicate value "${val1}" exists for keys "${key1}" and "${key2}". Could one of the entries be removed?`);
          } else if (stripFormatting(val1) === stripFormatting(val2)) {
            logWarn(`The values for keys "${key1}" and "${key2}" are eerily similar. Could the entries be consolidated?`);
          }
        }
        j++;
      }
    }

    i++;
  }
  return valid;
}

// Format the messages JSON by ordering the messages by key and trimming values.
function formatMessageJSON(messageJSON) {
  logDebug('Formatting messages file.');
  var fmtMessageJSON = {};
  for (var key in messageJSON) {
    if (key === 'messages') {
      fmtMessageJSON.messages = {};
      var msgKeys = Object.keys(messageJSON.messages).sort();
      for (var msgKey of msgKeys) {
        fmtMessageJSON.messages[msgKey.trim()] = messageJSON.messages[msgKey].trim();
      }
    } else {
      fmtMessageJSON[key.trim()] = messageJSON[key].trim();
    }
  }
  return fmtMessageJSON;
}

// Determines if the string is empty or contains non-alpha numeric or non-underscore characters.
function isInvalidKey(str) {
  return !(str && str.replace('_', '').trim().length > 0 && str.match(/^[0-9a-zA-Z_]+$/));
}

// Determines if the string is empty.
function isInvalidValue(str) {
  return !(str && str.trim().length > 0);
}

// Remove all non-aplha numeric characters and convert the string to uppercase
function stripFormatting(str) {
  return str.replace(/[^0-9a-z]/gi, '').toUpperCase();
}

// log debug messages
function logDebug(log) {
  console.log(`DEBUG: ${log}`);
}

// log warning messages
function logWarn(log) {
  console.log(clc.yellow(`WARN: ${log}`));
}

// log error messages
function logError(log) {
  console.log(clc.red(`ERROR: ${log}`));
}
