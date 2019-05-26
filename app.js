var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var helmet = require('helmet');
var logger = require('morgan');
var rfs = require('rotating-file-stream');
var logStream;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var apiRouter = require('./api');

var app = express();

var config = require('./config/index');

/**
 * Configure environment variables defined in files inside .env
 * and set server env.
 */
config(app);

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

/**
  * Log to a file if requested.
  */
if (process.env.REQUEST_LOG_FILE) {
  logStream = rfs(process.env.REQUEST_LOG_FILE, {
    size: '10M',     // rotate every 10 MegaBytes written
    interval: '1d',  // rotate daily
    compress: 'gzip', // compress rotated files
  });
}
app.use(logger(process.env.REQUEST_LOG_FORMAT || 'dev', {
  stream: logStream ? logStream : process.stdout
}));

app.use(express.json());
app.use(express.urlencoded({
  extended: false
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

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
