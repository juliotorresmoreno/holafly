const createError = require('http-errors')
const { People } = require('../../app/People')
const { Planet } = require('../../app/Planet')

const _isWookieeFormat = (req) => {
  if (req.query.format && req.query.format == 'wookiee') {
    return true
  }
  return false
}

/**
 *
 * @param {import('express').Express} server
 * @param {import('../../app')} app
 */
const applySwapiEndpoints = (server, app) => {
  server.get('/hfswapi/test', async (req, res) => {
    const data = await app.swapiFunctions.genericRequest(
      'https://swapi.dev/api/',
      'GET',
      null
    )
    res.send(data)
  })

  server.get('/hfswapi/getPeople/:id', async (req, res, next) => {
    try {
      const id = Number.parseInt(req.params.id)
      if (!id) throw createError[403]('id is not valid!')

      const person = new People(id)
      await person.init()

      res.json(person)
    } catch (error) {
      next(error)
    }
  })

  server.get('/hfswapi/getPlanet/:id', async (req, res, next) => {
    try {
      const id = Number.parseInt(req.params.id)
      if (!id) throw createError[403]('id is not valid!')

      const planet = new Planet(id)
      await planet.init()

      res.json(planet)
    } catch (error) {
      next(error)
    }
  })

  server.get('/hfswapi/getWeightOnPlanetRandom', async (req, res) => {
    res.sendStatus(501)
  })

  server.get('/hfswapi/getLogs', async (req, res) => {
    const data = await app.db.logging.findAll()
    res.send(data)
  })
}

module.exports = applySwapiEndpoints
