/**
 * Copyright 2015, Mapacode Inc.
 */
'use strict';

var pg = require('pg');
var conString = "postgres://postgres:743e9fbb484b43e8b3f42ed75b14e99d@192.168.30.142:5432/blog";


module.exports = function (url) {
    return {
        name: 'blog',
        read: function (req, resource, params, config, callback) {
            pg.connect(url, function(err, client, done) {
                if(err) {
                    callback({errors: [err]});
                } else {
                    if(params && params.id) {
                        client.query(
                            "SELECT * from posts WHERE id = $1", [params.id],
                            function(err, result) {
                                if(result.rows.length>0) {
                                    callback(null, {data: result.rows[0]});
                                } else {
                                    callback({errors: [new Error(params.id + " not found")]});
                                }
                                client.end();
                            }
                        );
                    } else {
                        client.query("SELECT id, title, img, published, author, price, preview, tags from posts", function(err, result) {
                            callback(null, {data: result.rows});
                            client.end();
                        });
                    }
                }
            });
        },
        create: function(req, resource, params, body, config, callback) {
            pg.connect(url, function(err, client, done) {
                if(err) {
                    callback({errors: [err]});
                } else {
                    client.query(
                        "INSERT INTO posts VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)",
                        [params.id, params.title, params.img, params.published, params.author, params.price, params.preview, params.tags, params.content],
                        function(err, result) {
                            if (err) {
                                callback({errors: [err]});
                            } else {
                                callback(null, {id: params.id});
                            }
                            client.end();
                        }
                    );
                }
            });
        },
        update: function(req, resource, params, body, config, callback) {
            if(params && params.id) {
                pg.connect(url, function(err, client, done) {
                    if(err) {
                        callback({errors: [err]});
                    } else {
                        client.query(
                            "UPDATE posts SET title = $2, img = $3, published = $4, author = $5, price = $6, preview = $7, tags = $8, content = $9 WHERE id = $1",
                            [params.id, params.title, params.img, params.published, params.author, params.price, params.preview, params.tags, params.content],
                            function(err, result) {
                                if (err) {
                                    callback({errors: [err]});
                                } else {
                                    callback(null, {id: params.id});
                                }
                                client.end();
                            }
                        );
                    }
                });
            } else {
                setTimeout(function () {
                    callback({errors: [new Error("Update missing params.id")]});
                }, 10);
            }
        },
        delete: function(req, resource, params, config, callback) {
            if(params && params.id) {
                pg.connect(url, function(err, client, done) {
                    if(err) {
                        callback({errors: [err]});
                    } else {
                        client.query("DELETE FROM posts WHERE id = $1", [params.id], function(err, result) {
                            if(err) {
                                callback({errors: [err]});
                            } else {
                                callback(null, {id: params.id});
                            }
                            client.end();
                        });
                    }
                });
            } else {
                setTimeout(function () {
                    callback({errors: [new Error("Delete missing params.id")]});
                }, 10);
            }
        }
    };
};
