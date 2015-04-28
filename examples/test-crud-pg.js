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
            "title": "Test",
            "published": "2015-04-23",
            "author": "Sirius Wu",
            "price": "800",
            "preview": "Test post...",
            "tags": ["test"],
            "marked": "* test"
        }, {}, function (err, post1) {
            if(err) {
                console.log(err);
            } else {
                console.log('create post');
                console.log(post1);
            }
            post = post1;
            callback(err, post1);
        });
    },
    function(callback) {
        fetcher.read ('blog', {md: post.md}, {}, function(err, post2) {
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
            "md": post.md,
            "title": "Test Again",
            "published": "2015-04-24",
            "author": "Cheng-Chang Wu",
            "price": "700",
            "preview": "Test post again...",
            "tags": ["test", "again"],
            "marked": "* test again"
        }, {}, function (err, post3) {
            if(err) {
                console.log(err);
            } else {
                console.log('update post');
                console.log(post3);
            }
            callback(err, post3);
        });
    },
    function(callback) {
        fetcher.read ('blog', {md: post.md}, {}, function(err, post4) {
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
        fetcher.delete ('blog', {"md": post.md}, {}, function(err, result) {
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
