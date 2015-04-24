CREATE DATABASE blog;
\c blog
CREATE TABLE posts (
    title   text,
    md      text,
    img     text,
    published    date,
    author  varchar(80),
    price   int,
    preview text,
    tags    text[],
    marked  text
);

INSERT INTO posts VALUES('My First Blog Post', 'first_post.md', '', now(), 'Sirius Wu', 600, 'Everyone has to start somewhere.', '{"blog"}', 'My first');

INSERT INTO posts VALUES('I Blogged Again', 'blogged_again.md', '', now(), 'Sirius Wu', 300, 'I did it again.', '{"blog"}', 'I blogged again.');

INSERT INTO posts VALUES('Botbone 入門', 'botbone-getting-started.md', '', DATE '2015-02-25', 'Sirius Wu', 600, 'BotBone Getting Started Guide', '{"botbone"}', E'BotBone 帶你進自動化及工業 4.0 的世界，你可以透過它學到\n\n* 實時作業系統 RTOS\n* 互動式網頁人機界面 Web-based HMI\n* 資料採集與監控系統 SCADA\n* 工業以太網 Industry Ethernet\n* 工業物聯網 IIot\n* 雲端垂直整合');


