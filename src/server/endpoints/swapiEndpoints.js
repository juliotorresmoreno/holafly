const createError = require('http-errors')
const { People } = require('../../app/People/People')

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

  server.get('/hfswapi/getPeople/:id', async (req, res) => {
    try {
      const id = Number.parseInt(req.params.id)
      if (!id) throw createError[403]('id is not valid!')

      const person = await app.db.swPeople
        .findByPk(id, {
          attributes: [
            'id',
            'name',
            'mass',
            'height',
            'homeworld_name',
            'homeworld_id',
          ],
        })
        .catch(() => {
          throw new createError[500]('Database is not working!')
        })

      if (person !== null) {
        res.send(person)
        return
      }
      /**
       * @type {import('../../app/People/People').AbstractPeople}
       */
      const data = new People(id)
      await data.init()

      const payload = {
        id: data.getId(),
        name: data.getName(),
        mass: data.getMass(),
        height: data.getHeight(),
        homeworld_name: data.getHomeworldName(),
        homeworld_id: data.getHomeworlId(),
      }

      const row = await app.db.swPeople.build(payload)
      row.save().catch(() => {
        throw new createError[500]('Database is not working!')
      })

      res.send(payload)
    } catch (error) {
      if ('status' in error) {
        next(error)
      }
      next(createError[500]('Internal server error'))
    }
  })

  server.get('/hfswapi/getPlanet/:id', async (req, res) => {
    const data = await app.swapiFunctions.genericRequest(
      'https://swapi.dev/api/planets/' + req.params.id,
      'GET',
      null
    )
    res.send(data)
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
