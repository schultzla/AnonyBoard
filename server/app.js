var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var messageRouter = require('./routes/api/v1/Messages');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client/build')));

if (process.env.PROD == true) {
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "../client/build/index.html"));
      });
}

app.use('/', indexRouter);
app.use('/api/v1/messages', messageRouter);

const dbuser = process.env.DBUSER
const dbpass = process.env.DBPASS

const mongoDB = `mongodb+srv://${dbuser}:${dbpass}@cluster0-g9bto.mongodb.net/anonyTweet?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = app;
