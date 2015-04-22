/**
 * Copyright 2015, Mapacode Inc.
 */
'use strict';

var marked = require('marked');
var fs = require('fs');

module.exports = function (path) {
    var posts = require(path + '/posts');
    var _keyed = {};
    posts.data.forEach (function (item) {
        _keyed[item.md] = item;
    });
    return {
        name: 'blog',
        read: function (req, resource, params, config, callback) {
            var md, res;
            if(params && params.md) {
                md = params.md;
                fs.readFile(path+'/'+md, function (err, data) {
                    if(err) {
                        callback(err, null);
                    } else {
                        _keyed[md].content = marked(data.toString());
                        res = {data: _keyed[md]};
                        callback(null, {data: _keyed[md]}); 
                    }
                });
            } else {
                setTimeout(function () {
                    callback(null, JSON.parse(JSON.stringify(posts)));
                }, 10);
            }
        }
    };
};
