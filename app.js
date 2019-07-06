const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

/**
 * Configure environment variables defined in files inside .env.
 * Any modules needing env variables must be required after config().
 */
const config = require('./config/index');
config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const apiRouter = require('./api');

const morgan = require('morgan');
const logger = require('./config/winston').logger;
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

app.use(morgan('combined', {
  stream: logger.stream,
}));

app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
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

  logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
