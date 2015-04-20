/**
 * Copyright 2015, Mapacode Inc.
 */
'use strict';

var express = require('express');
var app = express();
var blogService = require('../index')(__dirname + '/posts/');
var async = require('async');

app.get('/posts', function(req, res) {
    blogService.read (null, null, null, null, function (err, data) {
        if(err) {
            res.send(404, err);
        } else {
            res.json(data)
        }
    });
});

app.get('/tags/:tag', function(req, res) {
    blogService.read (null, null, null, null, function (err, posts) {
        if(err) {
            res.send(404, err);
        } else {
            var data = posts.data.filter(
                function (item) {
                    return (item.tags === req.params.tag);
                }
            );
            res.json({data: data});
        }
    });
});

app.get('/posts/:md', function(req, res) {
    blogService.read (null, null, req.params, null, function (err, data) {
        if(err) {
            res.send(404, err);
        } else {
            res.json(data);
        };
    });
});

console.log('Listing to port 3000');
app.listen(3000);


