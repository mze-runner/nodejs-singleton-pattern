'use strict';

const config = require('./config');
const mongodb = require('./mongodb');
const debug = require('debug')('index');

const express = require('express');
const http = require('http');
const app = express();

// init dbs 
const dbs = config.dbs;

// init singelron 
mongodb.init(dbs);

// init db schemas so we can use it further
require('./models/init');

// craete dummy data for testing and show case ...
require('./dummy');

app.use(require('./controllers'));

// do very simple express setup 
const server = http.createServer(app);
const PORT = process.env.PORT || 7000;
server.listen(PORT, () => {
    debug('Web server is up and running on %s port, env: %s', PORT);
});