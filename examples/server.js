/**
 * Copyright 2015, Mapacode Inc.
 */
'use strict';

var express = require('express');
var app = express();
var Fetcher = require('fetchr');
var blogService = require('../index')(__dirname + '/posts/');

Fetcher.registerFetcher(blogService);

app.use('/api', Fetcher.middleware());

console.log('Listing to port 3000');
app.listen(3000);

