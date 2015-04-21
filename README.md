# Botnana Blog Service

A blog service for Botnana platform.

## Install

Add "botnana-blog-service": "git+ssh://git@bitbucket.org:mapacode/botnana-blog-service.git" to package.json.

    npm install

## Usage

    var blogService = require('botnana-blog-service');
    blogService.read(...);

See examples/test.js and examples/server.js to know how to use the module.

## Format examples

GET /api/resource/blog

    {
        "data" : [{
            "title": "title",
            "md": "e313gkdda.md",
            "img": "e313gkdda.png",
            "published": "2015-02-25",
            "author": "Sirius Wu",
            "price": "600",
            "preview": "bjkleadba",
            "tags": "tag"
        },{
            "title": "title",
            "md": "e313gkddb.md",
            "img": "e313gkddb.png",
            "published": "2015-02-25",
            "author": "Sirius Wu",
            "price": "600",
            "preview": "bjkleadbb",
            "tags": "tag"
        }]
    }

GET /api/resource/blog;md=e313gkdda.md

    {
        "data" : [{
            "title": "title",
            "md": "e313gkdda.md",
            "img": "e313gkdda.png",
            "published": "2015-02-25",
            "author": "Sirius Wu",
            "price": "600",
            "preview": "bjkleadba",
            "content": "Content",
            "tags": "tag"
        }]
    }

