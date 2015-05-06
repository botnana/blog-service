# Examples

## Use lib/blog.js directly.

    node test.js
    node test-crud.js

## Use lib/blog.js throuth a server.

    npm install
    node server.js

and visit

    localhost:3000/api/resource/blog
    localhost:3000/api/resource/blog;id=first_post

## Use lib/blog-pg.js directly.

    node test-crude-pg.js

## Use lib/blog-pg.js throuth a server.

At first create a test database with ./scripts/db.sql.

Start the server

    npm install
    node server-pg.js

and visit

    localhost:3000/api/resource/blog
    localhost:3000/api/resource/blog;id=first_post

