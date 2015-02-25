/**
 * Copyright 2015, Mapacode Inc.
 */
'use strict';

var marked = require('marked');
var fs = require('fs');

module.exports = function (path) {
    var _posts = require(path + '/posts');
    return {
        name: 'blog',
        read: function (req, resource, params, config, callback) {
            if(params && params.md) {
                fs.readFile(path+params.md, function (err, data) {
                    if(err) {
                        callback(err, null);
                    } else {
                        callback(null, [marked(data.toString())]);
                    }
                });
            } else {
                setTimeout(function () {
                    callback(null, JSON.parse(JSON.stringify(_posts)));
                }, 10);
            }
        }
    };
};
