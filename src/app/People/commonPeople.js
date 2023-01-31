const { AbstractPeople } = require('./abstractPeople')
const { swapiFunctions, db } = require('..')
const { planetFactory } = require('../Planet')
const { People } = require('./People')
const createHttpError = require('http-errors')
const { getWeightOnPlanet } = require('../swapiFunctions')

/**
 * @type {AbstractPeople}
 */
class CommonPeople extends People {
  constructor(id) {
    super(id)
  }

  async getRemoteData(short = false) {
    const url = 'https://swapi.dev/api/people/' + this.id
    /**
     * @type {import('./types').Person}
     */
    const data = await swapiFunctions
      .genericRequest(url, 'GET', null)
      .catch(() => {
        throw createHttpError[500](
          'swapi.dev is not working. Can you go online?'
        )
      })
    this.name = data.name
    this.mass = Number.parseFloat(data.mass)
    this.height = Number.parseFloat(data.height)
    const homeworldId = (/[0-9]+/.exec(data.homeworld) || [])[0] || '0'

    this.homeworld_id = parseInt(homeworldId)

    if (!short) {
      await db.swPeople
        .build({
          id: this.getId(),
          name: this.getName(),
          mass: this.getMass(),
          height: this.getHeight(),
          homeworld_id: this.getHomeworlId(),
        })
        .save()
      return
    }
    await db.swPeople.update(
      {
        name: this.getName(),
      },
      {
        where: {
          id: this.getId(),
        },
      }
    )
  }

  async getLocalData() {
    const person = await db.swPeople.findByPk(this.id).catch((err) => {
      throw new createHttpError[500]('Database is not working!')
    })
    if (person) {
      this.name = person.name
      this.mass = person.mass
      this.height = person.height
      this.homeworld_id = person.homeworld_id
      return true
    }
    return false
  }

  async init() {
    const local = await this.getLocalData()
    if (!local) {
      return this.getRemoteData()
    }
    if (local && !this.name) {
      return this.getRemoteData(true)
    }
  }

  async getWeightOnPlanet(planetId) {
    if (!this.getMass()) return null
    const planet = await planetFactory(planetId, '')
    return {
      planet_id: planetId,
      name: planet.getName(),
      weight: planet.getGravity()
        ? getWeightOnPlanet(this.mass, planet.gravity)
        : 'unknown',
      gravity: planet.getGravity(),
      homeworld_planet: this.homeworld_id === planetId,
    }
  }
}

module.exports = { CommonPeople }
