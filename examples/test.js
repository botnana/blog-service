/**
 * Copyright 2015, Mapacode Inc.
 */
'use strict';

var blogConfig = {
    "module": "fs",
    "path": __dirname + '/posts/'
};
var blogService = require('../index').configure(blogConfig);
var Fetcher = require('fetchr');

Fetcher.registerFetcher(blogService);
var fetcher = new Fetcher();

// Get list of blog and all of its contents.
fetcher.read ('blog', {}, {}, function (err, posts) {
    console.log('Get list of blog and all of the contents.');
    if(err) {
        console.log(err)
    } else {
        console.log(posts)
        posts.data.forEach(function (value) {
            fetcher.read ('blog', value, {}, function (err, data) {
                if(err) {
                    console.log(err)
                } else {
                    console.log(data)
                }
            });
        });
        fetcher.read ('blog', {md: 'unknown'}, {}, function (err, data) {
            if(err) {
                console.log("Test with an unknown post success.")
                console.log(err)
            } else {
                console.log("Test with an unknown post failed!!!!")
            }
        });
    }
});

