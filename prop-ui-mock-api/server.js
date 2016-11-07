"use strict";
/**************************************************************************************************
 * This sample demonstrates the most simplistic usage of Swagger-Express-Middleware.
 * It simply creates a new Express Application and adds all of the Swagger middleware
 * without changing any options, and without adding any custom middleware.
 **************************************************************************************************/

// Set the DEBUG environment variable to enable debug output of Swagger Middleware AND Swagger Parser
process.env.DEBUG = "swagger:*";

var express = require("express");
var fs = require("fs");
var middleware = require("swagger-express-middleware");
var path = require("path");
var recursive = require("recursive-readdir");
var util = require("util");

var DataStoreLoader = require("./lib/mock/data-store-loader.js");
require("./lib/mock/query-collection-proxy.js");

var Resource = middleware.Resource;
var MemoryDataStore = middleware.MemoryDataStore;
var app = express();

middleware(path.join(__dirname, "api-docs/props-mock-api.json"), app, function(err, middleware) {

    // Create a custom data store with some initial mock data
    var myDB = new MemoryDataStore();
    DataStoreLoader.load(myDB, "db/static");
    DataStoreLoader.load(myDB, "db/download");

    // Add all the Swagger Express Middleware, or just the ones you need.
    // NOTE: Some of these accept optional options (omitted here for brevity)
    app.use(middleware.metadata(), //
            middleware.files(), //
            middleware.parseRequest(), //
            middleware.CORS(), //
            middleware.validateRequest(), //
            middleware.mock(myDB));

    // Add custom middleware
    // TODO: Move post configuration into a separate json file
    app.post("/props", function(req, res, next) {
        myDB.save(new Resource("/props", req.body.propCode, req.body));
        // TODO: Return location header
    });

    // Add a custom error handler that returns errors as HTML
    app.use(function(err, req, res, next) {
        res.status(err.status);
        res.type("application/json");
        // TODO: Generate 400 level response body
        res.send("");
    });

    // Enable Express" case-sensitive and strict options
    // (so "/pets/Fido", "/pets/fido", and "/pets/fido/" are all different)
    app.enable("case sensitive routing");
    app.enable("strict routing");

    app.listen(9000, function() {
        console.log("The Property Mock API is now running at http://localhost:9000");
    });
});
