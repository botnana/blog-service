/**
 * Copyright 2015, Mapacode Inc.
 */
'use strict';

var blogfs = require('./lib/blog');
var blogpg = require('./lib/blog-pg');
module.exports = {
    fs: blogfs,
    pg: blogpg,
    configure: function (config) {
        if (config.module === "fs") {
            return blogfs(config.path);
        } else if (config.module === "pg") {
            return blogpg(config.path);
        } else {
            console.log(new Error("Invalid config " + config));
            return null;
        }
    }
};

