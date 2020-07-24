const CircuitBreaker = require('../../lib/CircuitBreaker').CircuitBreaker;

const circuitbreaker = new CircuitBreaker();

async function indexGet(req, res) {
  const requestOptions = {
    method: 'get',
    url: 'https://jsonplaceholder.typicode.com/todos/1',
  };
  const serviceResponse = await circuitbreaker.callService({ requestOptions });
  req.log.info(serviceResponse && serviceResponse.data);

  return res.status(200).json({
    message: 'user indexGet',
  });
}

module.exports = { indexGet };
