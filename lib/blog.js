/**
 * Copyright 2015, Mapacode Inc.
 */
'use strict';

var marked = require('marked');
var fs = require('fs');
var uuid = require('node-uuid');

module.exports = function (path) {
    var posts;
    var _keyed = {};
    fs.readFile(path + '/posts.json', function (err, data) {
        posts = JSON.parse(data.toString());
        posts.data.forEach (function (item) {
            _keyed[item.md] = item;
        });
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
        },
        create: function(req, resource, params, body, config, callback) {
            var md, res;
            md = uuid.v4();
            fs.writeFile(path + '/posts.json', JSON.stringify(posts), function (err) {
              if (err) throw err;
            });
            fs.writeFile(path + '/' + md +'.md', params.content, function (err) {
              if (err) throw err;
              console.log('It\'s saved!');
            });
        },
        update: function(req, resource, params, body, config, callback) {
        },
        delete: function(req, resource, params, config, callback) {
        }
    };
};
