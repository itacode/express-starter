'use strict';

import path from 'path';
import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import createError from 'http-errors';
import layouts from 'express-ejs-layouts';
import pinoHttp from 'pino-http';
import { router as apiRouter } from './api';
import { router as indexRouter } from './routes';

export interface ResponseError extends Error {
  status?: number;
}

/** Application factory */
function newApp() {
  const pino = pinoHttp();

  const app = express();

  // Security best practices
  app.use(helmet());

  // View engine setup
  app.set('views', path.join(__dirname, '../views'));
  app.set('view engine', 'ejs');
  app.use(layouts);

  // HTTP logger
  app.use(pino);

  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: false,
    })
  );
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.use(express.static(path.join(__dirname, '../../public')));

  // HTML pages routes
  app.use('/', indexRouter);

  // API routes
  app.use('/api', apiRouter);

  // Catch 404 and forward to error handler
  app.use(function (_req, _res, next) {
    next(createError(404));
  });

  // Error handler
  app.use(function (
    err: ResponseError,
    req: Request,
    res: Response,
    _next: NextFunction
  ) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    req.log.error(
      `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip}`
    );

    // render the error page
    res.status(err.status || 500);
  });

  return app;
}

export { newApp };
