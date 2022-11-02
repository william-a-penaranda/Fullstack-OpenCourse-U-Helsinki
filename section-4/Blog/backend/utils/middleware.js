const logger = require('./logger');

const unknownEndpoint = (request, response) => {
  return(response.status(400).send({ error: 'Unknown endpoint' }));
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted data' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message });
  }

  next();
};

module.exports = {
  unknownEndpoint,
  errorHandler,
};