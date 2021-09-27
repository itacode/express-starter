const controller = require('./root-controller');

function registerRoutes(router) {
  router.get('/', controller.indexGet);
}

module.exports = { registerRoutes };
