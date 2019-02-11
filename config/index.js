const production = require('../.env/.env-production').envProduction;
const development = require('../.env/.env-development').envDevelopment;

// console.log(production, development);

function init() {
  const nodeEnv = process.env.NODE_ENV;

  // Case: production
  if (!nodeEnv || nodeEnv === 'production') {
    configProduction(process.env, production);
    return;
  }

  // Case: development
  if (nodeEnv === 'development') {
    configDevelopment(process.env, development);
    return;
  }
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
