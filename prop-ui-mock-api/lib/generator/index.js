var prompt = require('prompt');
var url = require('url');

var DataDownloader = require('./data-downloader.js');
var SwaggerGenerator = require('./swagger-generator.js');

var properties = [
    {
        name: 'username',
        type: 'string',
        required: true,
        description: 'Enter your Stash username',
        pattern: /^[a-zA-Z0-9]+$/,
        message: 'Username must be alpha numeric'
    }, {
        name: 'password',
        type: 'string',
        required: true,
        hidden: true,
        replace: '*',
        description: 'Enter your Stash password'
    }, {
        name: 'generateSwagger',
        type: 'boolean',
        required: true,
        description: 'Generate new swagger? (T/F)'
    }, {
        name: 'downloadMockData',
        type: 'boolean',
        required: true,
        description: 'Download new mock data? (T/F)'
    }
];

prompt.start();
prompt.get(properties, function(err, result) {
    if (err) {
        console.log(err);
        return 1;
    }

    if (result.generateSwagger) {
        SwaggerGenerator.generate(result.username, result.password);
    }
    if (result.downloadMockData) {
        DataDownloader.download(result.username, result.password);
    }
});
