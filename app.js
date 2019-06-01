var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var helmet = require('helmet');

/**
 * Configure environment variables defined in files inside .env.
 * Any modules needing env variables must be after config().
 */
var config = require('./config/index');
config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var apiRouter = require('./api');

var morgan = require('morgan');
var logger = require('./config/winston').logger;
var app = express();

/**
 * Some security best practices.
 */
app.set('x-powered-by', false);
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
app.use(cookieParser());
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
