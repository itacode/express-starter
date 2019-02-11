const express = require('express');
const registerUserRoutes = require('./user/user-routes');
const router = express.Router();

const routes = getRoutes(router);

function getRoutes(router) {
  registerUserRoutes(router);
  return router;
}

module.exports = routes;
