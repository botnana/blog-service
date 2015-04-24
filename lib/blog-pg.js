/**
 * Copyright 2015, Mapacode Inc.
 */
'use strict';

var uuid = require('node-uuid');
var pg = require('pg');
var marked = require('marked');
var conString = "postgres://postgres:743e9fbb484b43e8b3f42ed75b14e99d@192.168.30.142:5432/blog";


module.exports = function (url) {
    return {
        name: 'blog',
        read: function (req, resource, params, config, callback) {
            pg.connect(url, function(err, client, done) {
                if(err) {
                    callback(err, null);
                } else {
                    var md, res;
                    if(params && params.md) {
                        md = params.md;
                        client.query(
                            "SELECT * from posts WHERE md = $1", [md],
                            function(err, result) {
                                result.rows[0].content = marked(result.rows[0].marked);
                                delete result.rows[0].marked;
                                callback(null, {data: result.rows[0]});
                                client.end();
                            }
                        );
                    } else {
                        client.query("SELECT title, md, img, published, author, price, preview, tags from posts", function(err, result) {
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
                    callback(err, null);
                } else {
                    var md, marked_content;
                    marked_content = params.marked;
                    delete params.marked;
                    md = uuid.v4();
                    params.md = md + '.md';
                    client.query(
                        "INSERT INTO posts VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)",
                        [params.title, params.md, params.img, params.published, params.author, params.price, params.preview, params.tags, marked_content],
                        function(err, result) {
                            if (err) {
                                callback(err, null);
                            } else {
                                callback(null, params);
                            }
                            client.end();
                        }
                    );
                }
            });
        },
        update: function(req, resource, params, body, config, callback) {
            pg.connect(url, function(err, client, done) {
                if(err) {
                    callback(err, null);
                } else {
                    client.query(
                        "UPDATE posts SET title = $1, img = $3, published = $4, author = $5, price = $6, preview = $7, tags = $8, marked = $9 WHERE md = $2",
                        [params.title, params.md, params.img, params.published, params.author, params.price, params.preview, params.tags, params.marked],
                        function(err, result) {
                            if (err) {
                                callback(err);
                            } else {
                                callback(null, params);
                            }
                            client.end();
                        }
                    );
                }
            });
        },
        delete: function(req, resource, params, config, callback) {
            if(params && params.md) {
                pg.connect(url, function(err, client, done) {
                    if(err) {
                        callback(err, null);
                    } else {
                        client.query("DELETE FROM posts WHERE md = $1", [params.md], function(err, result) {
                            if(err) {
                                callback(err, null);
                            } else {
                                callback(null, params);
                            }
                            client.end();
                        });
                    }
                });
            } else {
                setTimeout(function () {
                    callback(new Error("Delete missing params.md"), null);
                }, 10);
            }
        }
    };
};
