/**
 * Copyright 2015, Mapacode Inc.
 */
'use strict';

var blogService = require('../index').fs(__dirname + '/posts/');
var Fetcher = require('fetchr');

Fetcher.registerFetcher(blogService);
var fetcher = new Fetcher();

// Get list of blog and all of its contents.
fetcher.create (
    'blog',
    {
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
            fetcher.read ('blog', {md: post1.md}, {}, function(err, post2) {
                if(err) {
                    console.log(err);
                } else {
                    console.log('read post');
                    console.log(post2);
                }
            });
        }
    }
);
