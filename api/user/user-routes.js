const controller = require('./user-controller');

function registerRoutes(router) {
  router.get('/user', controller.index);
}

module.exports = registerRoutes;
