/**
 * Copyright 2015, Mapacode Inc.
 */
'use strict';

var marked = require('marked');
var fs = require('fs');

module.exports = function (path) {
    return {
        name: 'blog',
        read: function (req, resource, params, config, callback) {
            if(params) {
                callback(null, marked(fs.readFileSync(path+params.md).toString()))
            } else {
                setTimeout(function () {
                    var _posts = require(path + '/posts');
                    callback(null, JSON.parse(JSON.stringify(_posts)));
                }, 10);
            }
        }
    };
};
