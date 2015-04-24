/**
 * Copyright 2015, Mapacode Inc.
 */
'use strict';

var pg = require('pg');
var marked = require('marked');
var conString = "postgres://postgres:743e9fbb484b43e8b3f42ed75b14e99d@192.168.30.142:5432/blog";


module.exports = function (url) {
    return {
        name: 'blog',
        read: function (req, resource, params, config, callback) {
            pg.connect(url, function(err, client, done) {
                var md, res;
                if(params && params.md) {
                    md = params.md;
                    client.query(
                        "SELECT * from posts WHERE md = $1", [md],
                        function(err, result) {
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
            });
        }
    };
};
