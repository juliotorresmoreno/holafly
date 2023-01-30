const applySwapiEndpoints = require('./swapiEndpoints')

/**
 *
 * @param {import('express').Express} server
 * @param {import('../../app')} app
 * @returns
 */
const applyEndpoints = (server, app) => {
  applySwapiEndpoints(server, app)
  return server
}

module.exports = applyEndpoints
