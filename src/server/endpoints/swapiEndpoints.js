const { peopleFactory } = require('../../app/People')
const { planetFactory } = require('../../app/Planet')
const crypto = require('crypto')
const createHttpError = require('http-errors')

/**
 *
 * @typedef {import('./types').Person} Person
 * @typedef {import('./types').Planet} Planet
 * @typedef {import('./types').WeightOnPlanetRandom} WeightOnPlanetRandom
 * @typedef {import('./types').Log} Log
 */

/**
 * @param {import('express').Request} req
 */
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
  server.get(
    '/hfswapi/test',
    /**
     *
     * @param {import('express').Request} req
     * @param {import('express').Response<Person>} res
     * @param {import('express').NextFunction} next
     */
    async (req, res) => {
      try {
        const data = await app.swapiFunctions.genericRequest(
          'https://swapi.dev/api/',
          'GET',
          null
        )
        res.send(data)
      } catch (error) {
        next(error)
      }
    }
  )

  server.get(
    '/hfswapi/getPeople/:id',
    /**
     *
     * @param {import('express').Request<{id:string}>} req
     * @param {import('express').Response<Person>} res
     * @param {import('express').NextFunction} next
     */
    async (req, res, next) => {
      try {
        const id = Number.parseInt(req.params.id)
        if (!id) throw createHttpError[403]('id is not valid!')

        const lang = _isWookieeFormat(req) ? 'wookiee' : 'common'
        const person = await peopleFactory(id, lang)

        const homeworld = await planetFactory(person.getHomeworlId(), lang)
        /**
         * @type {Planet | null}
         */
        const planet = homeworld
          ? {
              id: homeworld.getId(),
              name: homeworld.getName(),
              gravity: homeworld.getGravity(),
              lang,
            }
          : null

        res.json({
          id: person.getId(),
          name: person.getName(),
          mass: person.getMass(),
          height: person.getHeight(),
          homeworld: planet,
          lang,
        })
      } catch (error) {
        next(error)
      }
    }
  )

  server.get(
    '/hfswapi/getPlanet/:id',
    /**
     *
     * @param {import('express').Request<{id:string}>} req
     * @param {import('express').Response<Planet>} res
     * @param {import('express').NextFunction} next
     */
    async (req, res, next) => {
      try {
        const id = Number.parseInt(req.params.id)
        if (!id) throw createHttpError[403]('id is not valid!')

        const lang = _isWookieeFormat(req) ? 'wookiee' : 'common'
        const data = await planetFactory(id, lang)

        res.json({
          id: data.getId(),
          name: data.getName(),
          gravity: data.getGravity(),
          lang,
        })
      } catch (error) {
        next(error)
      }
    }
  )

  server.get(
    '/hfswapi/getWeightOnPlanetRandom',
    /**
     *
     * @param {import('express').Request} req
     * @param {import('express').Response<Person&{weightOnPlanetRandom:WeightOnPlanetRandom}>} res
     * @param {import('express').NextFunction} next
     */
    async (req, res, next) => {
      try {
        const planetId = crypto.randomInt(1, 60) // 60
        const personId = crypto.randomInt(1, 82) // 82
        const lang = _isWookieeFormat(req) ? 'wookiee' : 'common'
        const person = await peopleFactory(personId, lang)
        const homeworld = await planetFactory(person.getHomeworlId(), lang)
        /**
         * @type {Planet | null}
         */
        const planet = homeworld
          ? {
              id: homeworld.getId(),
              name: homeworld.getName(),
              gravity: homeworld.getGravity(),
              lang,
            }
          : null

        res.json({
          id: person.getId(),
          name: person.getName(),
          mass: person.getMass(),
          height: person.getHeight(),
          homeworld: planet,
          weightOnPlanetRandom: await person.getWeightOnPlanet(planetId),
          lang,
        })
      } catch (error) {
        next(error)
      }
    }
  )

  server.get(
    '/hfswapi/getLogs',
    /**
     *
     * @param {import('express').Request} req
     * @param {import('express').Response<Log[]>} res
     * @param {import('express').NextFunction} next
     */
    async (req, res, next) => {
      try {
        const data = await app.db.logging.findAll()
        res.send(data)
      } catch (error) {
        next(error)
      }
    }
  )
}

module.exports = applySwapiEndpoints
