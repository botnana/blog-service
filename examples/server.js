/**
 * Copyright 2015, Mapacode Inc.
 */
'use strict';

var express = require('express');
var app = express();
var Fetcher = require('fetchr');
var blogConfig = {
    "module": "fs",
    "path": __dirname + '/posts/'
};
var blogService = require('../index').configure(blogConfig);

Fetcher.registerFetcher(blogService);

app.use('/api', Fetcher.middleware());

console.log('Listing to port 3000');
app.listen(3000);

