const production = require('../.env/.env-production').envProduction;
const development = require('../.env/.env-development').env;

// console.log(production, development);

function init(app) {
  const nodeEnv = process.env.NODE_ENV;

  // Case: production
  if (!nodeEnv || nodeEnv === 'production') {
    configProduction(process.env, production);
  }

  // Case: development
  if (nodeEnv === 'development') {
    configDevelopment(process.env, development);
  }

  app.set('env', process.env.NODE_ENV);
}

function configProduction(processEnv, production) {
  mergeProperties(processEnv, production);
}

function configDevelopment(processEnv, development) {
  mergeProperties(processEnv, development);
}

function mergeProperties(target, source) {
  return Object.assign(target, source);
}

module.exports = init;
