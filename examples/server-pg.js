/**
 * Copyright 2015, Mapacode Inc.
 */
'use strict';

var express = require('express');
var app = express();
var Fetcher = require('fetchr');
var blogConfig = {
    "module": "pg",
    "path": "postgres://postgres:743e9fbb484b43e8b3f42ed75b14e99d@192.168.30.173:5432/blog"
};
var blogService = require('../index').configure(blogConfig);

Fetcher.registerFetcher(blogService);

app.use('/api', Fetcher.middleware());

console.log('Listing to port 3000');
app.listen(3000);

