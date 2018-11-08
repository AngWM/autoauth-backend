const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const qp = require('flexqp');
const app = express();

qp.presetConnection(require('./dbconfig.json'));
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Add headers
app.use(function (req, res, next) {
    // Necessary to allow API calls to-and-fro local networks
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || "");
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.use('/', require('./routes/index'));
app.use('/backend', require('./routes/services'));

module.exports = app;
