/**
 * Copyright 2015, Mapacode Inc.
 */
'use strict';

var fs = require('fs');
var uuid = require('node-uuid');

module.exports = function (path) {
    var posts;
    var _keyed = {};
    var data = fs.readFileSync(path + 'posts.json');
    posts = JSON.parse(data.toString());
    posts.data.forEach (function (item) {
        _keyed[item.id] = item;
    });
    return {
        name: 'blog',
        read: function (req, resource, params, config, callback) {
            var id, res;
            if(params && params.id) {
                id = params.id;
                fs.readFile(path+'/'+id+'.md', function (err, data) {
                    if(err) {
                        callback({errors: [err]});
                    } else {
                        _keyed[id].content = data.toString();
                        res = {data: _keyed[id]};
                        callback(null, {data: _keyed[id]}); 
                    }
                });
            } else {
                setTimeout(function () {
                    callback(null, posts);
                }, 10);
            }
        },
        create: function(req, resource, params, body, config, callback) {
            var id, content;
            content = params.content;
            id = uuid.v4();
            params.id = id;
            _keyed[params.id] = params;
            posts.data.push(params);
            fs.writeFile(path + '/posts.json', JSON.stringify(posts), function (err) {
                if (err) {
                    callback({errors: [err]});
                } else {
                    fs.writeFile(path + '/' + params.id + '.md', content, function (err) {
                        if (err) {
                            callback({errors: [err]});
                        } else {
                            callback(null, {id: params.id});
                        }
                    });
                }
            });
        },
        update: function(req, resource, params, body, config, callback) {
            var content;
            var found;
            content = params.content;
            _keyed[params.id] = params;
            posts.data.forEach(function(item, idx) {
                if(item.id===params.id) {
                    posts.data[idx] = params; 
                    found = true;
                }
            });
            if(found) {
                fs.writeFile(path + '/posts.json', JSON.stringify(posts), function (err) {
                    if (err) {
                        callback({errors: [err]});
                    } else {
                        fs.writeFile(path + '/' + params.id + '.md', content, function (err) {
                            if (err) {
                                callback({errors: [err]});
                            } else {
                                callback(null, {id: params.id});
                            }
                        });
                    }
                });
            } else {
                setTimeout(function () {
                    callback({errors: [new Error("Update " + params.id + " failed.")]});
                }, 10);
            }
        },
        delete: function(req, resource, params, config, callback) {
            var found=-1;
            if(params && params.id) {
                posts.data.forEach(function(item, idx) {
                    if(item.id===params.id) {
                        found = idx;
                    }
                });
                if(found >= 0) {
                    posts.data.splice(found, 1);
                    delete _keyed[params.id];
                    fs.unlink(path+ '/' + params.id + '.md', function (err) {
                        if(err) {
                            callback({errors: [err]});
                        } else {
                            fs.writeFile(path + '/posts.json', JSON.stringify(posts), function (err) {
                                if (err) {
                                    callback({errors: [err]});
                                } else {
                                    callback(null, {id: params.id});
                                }
                            });
                        }
                    });
                } else {
                    setTimeout(function () {
                        callback({errors: [new Error("Delete " + params.id + " failed.")]});
                    }, 10);
                }
            } else {
                setTimeout(function () {
                    callback({errors: [new Error("Delete missing params.id")]});
                }, 10);
            }
        }
    };
};
