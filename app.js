'use strict';

const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const createError = require('http-errors');
const layouts = require('express-ejs-layouts');

/**
 * Configure environment variables defined in files inside .env.
 * Any module needing env variables must be required after config().
 */
const config = require('./config/index').config;
config();

const indexRouter = require('./routes').router;
const apiRouter = require('./api').router;

const pino = require('pino-http')();

const app = express();

/**
 * Security best practices.
 */
app.use(helmet());

/**
 * View engine setup.
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(layouts);

/**
 * HTTP logger.
 */
app.use(pino);

app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Pages routes.
 */
app.use('/', indexRouter);

/**
 * API routes.
 */
app.use('/api', apiRouter);

/**
 * Catch 404 and forward to error handler.
 */
app.use(function (req, res, next) {
  next(createError(404));
});

/**
 * Error handler.
 */
/* eslint-disable-next-line no-unused-vars */
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  req.log.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
