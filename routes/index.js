const express = require('express');
const router = express.Router();
const registerRootRoutes = require('./root/root-routes').registerRoutes;
const registerUsersRoutes = require('./users/users-routes').registerRoutes;

registerAllRoutes(router);

function registerAllRoutes(router) {
  registerRootRoutes(router);
  registerUsersRoutes(router);
}

module.exports = { router };
