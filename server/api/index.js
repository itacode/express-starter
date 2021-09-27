const express = require('express');
const router = express.Router();
const registerSearchRoutes = require('./search/search-routes').registerRoutes;

registerAllRoutes(router);

function registerAllRoutes(router) {
  registerSearchRoutes(router);
}

module.exports = { router };
