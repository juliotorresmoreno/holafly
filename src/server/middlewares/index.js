const loggingMiddleware = require('./loggingMiddleware')

/**
 *
 * @param {import('express').Express} server
 * @param {import('../../app')} app
 * @returns
 */
const applyMiddlwares = (server, app) => {
  server.use(loggingMiddleware(app.db))
  return server
}

module.exports = applyMiddlwares
