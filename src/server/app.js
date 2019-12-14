var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cors = require('cors');

// var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var pLetterRouter = require('./routes/pLetter');
var tLetterRouter = require('./routes/tLetter');
var sLetterRouter = require('./routes/showLetter');
var mineRouter = require('./routes/mine');
var mailboxRouter = require('./routes/mailbox');
var imageRouter = require('./routes/image');
var adminLogin = require('./routes/adminlogin');
var adminManager = require('./routes/adminManager');
var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/v1/users', usersRouter);
app.use('/v1/private', pLetterRouter);
app.use('/v1/showletter', sLetterRouter);
app.use('/v1/together',tLetterRouter)
app.use('/v1/mine',mineRouter)
app.use('/v1/mailbox',mailboxRouter)
app.use('/v1/image',imageRouter)
app.use('/v1/adminlogin',adminLogin);
app.use('/v1/adminmanager',adminManager);
module.exports = app;
