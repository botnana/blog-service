/**
 * Copyright 2015, Mapacode Inc.
 */
'use strict';

var async = require('async');
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
            var md;
            if(params && params.md) {
                if (typeof params.md === 'string' ) {
                    md = [params.md]; 
                } else {
                    md = params.md;
                }
                async.map (
                    md,
                    function (item, cb) {
                        fs.readFile(path+'/'+item, function (err, data) {
                            if(err) {
                                cb(err, {key: item, value: null});
                            } else {
                                cb(err, {key: item, value: marked(data.toString())});
                            }
                        });
                    },
                    function (err, results) {
                        var res = {};
                        var last; 
                        if(err) {
                            // 只保留最後一個有問題的。因為在其前面的都是空的。
                            last = results.pop();
                            res[last.key] = last.value;
                        } else {
                            results.forEach(function(item) {
                                _keyed[item.key].content = item.value;
                                res[item.key] = _keyed[item.key];
                            });
                        }
                        callback(err, res);
                    }
                );
            } else {
                setTimeout(function () {
                    callback(null, JSON.parse(JSON.stringify(posts)));
                }, 10);
            }
        }
    };
};
