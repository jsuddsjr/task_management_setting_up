const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');

require('dotenv').config();

const app = express();

/** @type {import('express-session').SessionOptions} */
const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: (24 * 12 * 60 * 60 * 1000)
    },
    rolling: true,
    resave: false,
    saveUninitialized: false
};

if (app.get('env') === 'production') {
    // Serve secure cookies, requires HTTPS
    sessionOptions.cookie.secure = true;
}

app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));

// catch 404 and forward to error handler
app.use(function(_req, _res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, _next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
