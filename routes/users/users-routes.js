const controller = require('./users-controller');

function registerRoutes(router) {
  router.get('/users', controller.indexGet);
}

module.exports = { registerRoutes };
