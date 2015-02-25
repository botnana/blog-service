/**
 * Copyright 2015, Mapacode Inc.
 */
'use strict';

var blogService = require('../index')(__dirname + '/posts/');

console.log(blogService.name);

blogService.read (null, null, null, null, function (err, data) {
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

