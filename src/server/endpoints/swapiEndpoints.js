const { peopleFactory } = require('../../app/People')
const { planetFactory } = require('../../app/Planet')
const crypto = require('crypto')
const createHttpError = require('http-errors')

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
      if (!id) throw createHttpError[403]('id is not valid!')

      const lang = _isWookieeFormat(req) ? 'wookiee' : 'common'
      const data = await peopleFactory(id, lang)
      const homeworld = await planetFactory(data.getHomeworlId(), lang)
      const planet = homeworld
        ? {
            id: homeworld.getId(),
            name: homeworld.getName(),
            gravity: homeworld.getGravity(),
          }
        : null
      const result = {
        id: data.getId(),
        name: data.getName(),
        mass: data.getMass(),
        height: data.getHeight(),
        homeworld: planet,
        lang,
      }

      res.json(result)
    } catch (error) {
      next(error)
    }
  })

  server.get('/hfswapi/getPlanet/:id', async (req, res, next) => {
    try {
      const id = Number.parseInt(req.params.id)
      if (!id) throw createHttpError[403]('id is not valid!')

      const lang = _isWookieeFormat(req) ? 'wookiee' : 'common'
      const data = await planetFactory(id, lang)

      const result = {
        id: data.getId(),
        name: data.getName(),
        gravity: data.getGravity(),
        lang,
      }

      res.json(result)
    } catch (error) {
      next(error)
    }
  })

  server.get('/hfswapi/getWeightOnPlanetRandom', async (req, res, next) => {
    try {
      const planetId = crypto.randomInt(1, 60) // 60
      const personId = crypto.randomInt(1, 82) // 82

      const lang = _isWookieeFormat(req) ? 'wookiee' : 'common'
      const person = await peopleFactory(personId, lang)

      const result = {
        id: person.id,
        name: person.name,
        mass: person.mass,
        height: person.height,
        homeworld_name: person.homeworld_name,
        homeworld_id: person.homeworld_id,
        weightOnPlanetRandom: await person.getWeightOnPlanet(planetId),
        lang,
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
