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
    var data = fs.readFileSync(path + 'posts.json');
    posts = JSON.parse(data.toString());
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
                    callback(null, posts);
                }, 10);
            }
        },
        create: function(req, resource, params, body, config, callback) {
            var md, marked_content;
            marked_content = params.marked;
            delete params.marked;
            md = uuid.v4();
            params.md = md + '.md';
            _keyed[params.md] = params;
            posts.data.push(params);
            fs.writeFile(path + '/posts.json', JSON.stringify(posts), function (err) {
                if (err) {
                    callback(err);
                } else {
                    fs.writeFile(path + '/' + params.md, marked_content, function (err) {
                        if (err) {
                            callback(err);
                        } else {
                            callback(null, {md: params.md});
                        }
                    });
                }
            });
        },
        update: function(req, resource, params, body, config, callback) {
            var marked_content;
            var found;
            marked_content = params.marked;
            delete params.marked;
            _keyed[params.md] = params;
            posts.data.forEach(function(item, idx) {
                if(item.md===params.md) {
                    posts.data[idx] = params; 
                    found = true;
                }
            });
            if(found) {
                fs.writeFile(path + '/posts.json', JSON.stringify(posts), function (err) {
                    if (err) {
                        callback(err);
                    } else {
                        fs.writeFile(path + '/' + params.md, marked_content, function (err) {
                            if (err) {
                                callback(err);
                            } else {
                                callback(null, {md: params.md});
                            }
                        });
                    }
                });
            } else {
                setTimeout(function () {
                    callback(new Error("Update " + params.md + " failed."));
                }, 10);
            }
        },
        delete: function(req, resource, params, config, callback) {
            var found=-1;
            if(params && params.md) {
                posts.data.forEach(function(item, idx) {
                    if(item.md===params.md) {
                        found = idx;
                    }
                });
                if(found >= 0) {
                    posts.data.splice(found, 1);
                    delete _keyed[params.md];
                    fs.unlink(path+'/'+params.md, function (err) {
                        if(err) {
                            callback(err, null);
                        } else {
                            fs.writeFile(path + '/posts.json', JSON.stringify(posts), function (err) {
                                if (err) {
                                    callback(err, null);
                                } else {
                                    callback(null, {md: params.md});
                                }
                            });
                        }
                    });
                } else {
                    setTimeout(function () {
                        callback(new Error("Delete " + params.md + " failed."), null);
                    }, 10);
                }
            } else {
                setTimeout(function () {
                    callback(new Error("Delete missing params.md"), null);
                }, 10);
            }
        }
    };
};
