const createError = require('http-errors')
const { People } = require('../../app/People')
const { Planet } = require('../../app/Planet')
const crypto = require('crypto')

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

      const data = new People(id)
      if (_isWookieeFormat(req)) {
        await data.init('wookiee')
      } else {
        await data.init()
      }

      res.json(data)
    } catch (error) {
      next(error)
    }
  })

  server.get('/hfswapi/getPlanet/:id', async (req, res, next) => {
    try {
      const id = Number.parseInt(req.params.id)
      if (!id) throw createError[403]('id is not valid!')

      const data = new Planet(id)
      await data.init()

      res.json(data)
    } catch (error) {
      next(error)
    }
  })

  server.get('/hfswapi/getWeightOnPlanetRandom', async (req, res, next) => {
    try {
      const planetId = crypto.randomInt(1, 60) // 60
      const personId = crypto.randomInt(1, 82) // 82

      const person = new People(personId)
      await person.init()

      const result = {
        id: person.id,
        name: person.name,
        mass: person.mass,
        height: person.height,
        homeworld_name: person.homeworld_name,
        homeworld_id: person.homeworld_id,
        weightOnPlanetRandom: await person.getWeightOnPlanet(planetId),
      }

      res.json(result)
    } catch (error) {
      next(error)
    }
  })

  server.get('/hfswapi/getLogs', async (req, res) => {
    const data = await app.db.logging.findAll()
    res.send(data)
  })
}

module.exports = applySwapiEndpoints
