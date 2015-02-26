/**
 * Copyright 2015, Mapacode Inc.
 */
'use strict';

var blogService = require('../index')(__dirname + '/posts/');

console.log(blogService.name);

blogService.read (null, null, {}, null, function (err, data) {
    if(err) {
        console.log(err)
    } else {
        console.log(data)
        data.forEach(function (value) {
            blogService.read (null, null, value, null, function (err, data) {
                if(err) {
                    console.log(err)
                } else {
                   console.log(data)
                }
            });
        });
    }
});

// Test multiple markdown files.
blogService.read(null, null, {md: ['first_post.md', 'blogged_again.md']}, null, function (err, data) {
    if(err) {
        console.log(err);
    } else {
        console.log(data);
    }
});

// Test multiple markdown files with a missing file.
blogService.read(null, null, {md: ['first_post.md', 'missing.md', 'blogged_again.md']}, null, function (err, data) {
    if(err) {
        console.log(err);
    } else {
        console.log(data);
    }
});
