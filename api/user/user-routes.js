const controller = require('./user-controller');

function registerRoutes(router) {
  router.get('/user', controller.indexGet);
}

module.exports = { registerRoutes };
