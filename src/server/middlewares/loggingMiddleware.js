const loggingModel = require('../../app/db/models/loggingModel')

/**
 *
 * @param {import('../../app/db')} db
 * @returns
 */
const loggingMiddleware = function (db) {
  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  function middleware(req, res, next) {
    const ip = (
      req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      ''
    )
      .split(',')[0]
      .trim()
    const headers = JSON.stringify(req.headers)
    const originalUrl = req.originalUrl
    // Persist this info on DB

    const log = db.logging.build({
      action: req.method + ' ' + originalUrl,
      header: headers,
      ip: ip,
    })
    log.save()

    next()
  }

  return middleware
}

module.exports = loggingMiddleware
