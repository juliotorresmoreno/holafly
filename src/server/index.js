const express = require('express')
const createHttpError = require('http-errors')
const applyEndpoints = require('./endpoints')
const applyMiddlewares = require('./middlewares')

/**
 *
 * @param {import('../app')} app
 * @returns {import('express').Express}
 */
const createExpressServer = async (app) => {
  const server = express()
  applyMiddlewares(server, app)
  applyEndpoints(server, app)

  server.use(
    /**
     * @param {import('http-errors').CreateHttpError | Error} error
     * @param {import('express').Request} req
     * @param {import('express').Response<Log[]>} res
     * @param {import('express').NextFunction} next
     */
    function (error, req, res, next) {
      // implementar registros de errores?

      if (createHttpError.isHttpError(error)) {
        res.status(error.statusCode)
        res.json({
          message: error.message,
        })
        return
      }
      res.status(500)
      res.json({
        message: error.message,
      })
    }
  )

  await app.db.initDB()

  server.get('/', async (req, res) => {
    if (process.env.NODE_ENV === 'develop') {
      res.send('Test Enviroment')
    } else {
      res.sendStatus(200)
    }
  })

  return server
}

module.exports = createExpressServer
