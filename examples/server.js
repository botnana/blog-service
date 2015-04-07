/**
 * Copyright 2015, Mapacode Inc.
 */
'use strict';

var express = require('express');
var app = express();
var blogService = require('../index')(__dirname + '/posts/');
var async = require('async');

app.get('/list', function(req, res) {
    blogService.read (null, null, null, null, function (err, data) {
        if(err) {
            res.error(404).send(err);
        } else {
            res.json(data)
        }
    });
});

app.get('/section/:section', function(req, res) {
    blogService.read (null, null, null, null, function (err, data) {
        if(err) {
            res.error(404).send(err);
        } else {
            async.map (
                data[parseInt(req.params.section)].posts,
                function (item, callback) {
                    blogService.read (null, null, item, null, function (err, data) {
                        item.error = err;
                        item.value = data;
                        callback (null, item);
                    });
                },
                function (err, results) {
                    res.json(results);
                }
            );
        }
    });
});

app.get('/post/:md', function(req, res) {
    blogService.read (null, null, req.params, null, function (err, data) {
        res.json([err, data]);
    });
});

console.log('Listing to port 3000');
app.listen(3000);


