/**
 * Copyright 2015, Mapacode Inc.
 */
'use strict';

var blogConfig = {
    "module": "pg",
    "path": "postgres://postgres:743e9fbb484b43e8b3f42ed75b14e99d@192.168.30.173:5432/blog"
};

var blogService = require('../index').configure(blogConfig);
var Fetcher = require('fetchr');
var async = require('async');

Fetcher.registerFetcher(blogService);
var fetcher = new Fetcher();

var post;

async.series([
    function(callback) {
        fetcher.create ('blog', {
            "id": "test",
            "title": "Test",
            "published": "2015-04-23",
            "author": "Sirius Wu",
            "price": "800",
            "preview": "Test post...",
            "tags": ["test"],
            "content": "* test"
        }, {}, function (err, result) {
            if(err) {
                console.log(err);
            } else {
                console.log('create post');
                console.log(result);
            }
            post = result;
            callback(err, result);
        });
    },
    function(callback) {
        fetcher.read ('blog', {id: post.id}, {}, function(err, post2) {
            if(err) {
                console.log(err);
            } else {
                console.log('read post');
                console.log(post2);
            }
            callback(err, post2);
        });
    },
    function(callback) {
        fetcher.update ('blog', {
            "id": post.id,
            "title": "Test Again",
            "published": "2015-04-24",
            "author": "Cheng-Chang Wu",
            "price": "700",
            "preview": "Test post again...",
            "tags": ["test", "again"],
            "content": "* test again"
        }, {}, function (err, result) {
            if(err) {
                console.log(err);
            } else {
                console.log('update post');
                console.log(result);
            }
            callback(err, result);
        });
    },
    function(callback) {
        fetcher.read ('blog', {id: post.id}, {}, function(err, post4) {
            if(err) {
                console.log(err);
            } else {
                console.log('read post');
                console.log(post4);
            }
            callback(err, post4);
        });
    },
    function(callback) {
        fetcher.delete ('blog', {"id": post.id}, {}, function(err, result) {
            if(err) {
                console.log(err);
            } else {
                console.log('delete post');
                console.log(result);
            }
            callback(err, result);
        });
    },
]);
