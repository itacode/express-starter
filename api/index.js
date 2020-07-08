const express = require('express');
const router = express.Router();
const registerUserRoutes = require('./user/user-routes').registerRoutes;

registerAllRoutes(router);

function registerAllRoutes(router) {
  registerUserRoutes(router);
}

module.exports = { router };
