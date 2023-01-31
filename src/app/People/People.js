const { AbstractPeople } = require('./abstractPeople')
const { swapiFunctions, db } = require('..')
const { getWeightOnPlanet } = require('../swapiFunctions')
const { Planet } = require('../Planet')

/**
 * @type {AbstractPeople}
 */
class People extends AbstractPeople {
  constructor(id) {
    super(id)
    if (!id) throw new Error('id is undefined!')

    this.id = id
    this.name = ''
    this.mass = ''
    this.height = 0
    this.homeworld_name = ''
    this.homeworld_id = 0
    this.homeworld_planet_id = 0
  }

  async init() {
    const person = await db.swPeople
      .findByPk(this.id, {
        attributes: [
          'id',
          'name',
          'mass',
          'height',
          'homeworld_name',
          'homeworld_id',
          'homeworld_planet_id',
        ],
      })
      .catch(() => {
        throw new createHttpError[500]('Database is not working!')
      })
    if (person) {
      this.id = person.id
      this.name = person.name
      this.mass = person.mass
      this.height = person.height
      this.homeworld_name = person.homeworld_name
      this.homeworld_id = person.homeworld_id
      this.homeworld_planet_id = person.homeworld_planet_id
      return
    }
    /**
     * @type {import('./types').Person}
     */
    const data = await swapiFunctions
      .genericRequest('https://swapi.dev/api/people/' + this.id, 'GET', null)
      .catch(() => {
        throw createError[500]('swapi.dev is not working. Can you go online?')
      })
    this.name = data.name
    this.mass = Number.parseFloat(data.mass)
    this.height = Number.parseFloat(data.height)
    const homeworldId = (/[0-9]+/.exec(data.homeworld) || [])[0]
    const planetId = (/[0-9]+/.exec(data.url) || [])[0]

    const homeworl = await swapiFunctions
      .genericRequest(data.homeworld, 'GET', null)
      .catch(() => {
        throw new Error('swapi.dev is not working. Can you go online?')
      })

    this.homeworld_id = Number.parseFloat(homeworldId)
    this.homeworld_name = homeworl.name
    this.homeworld_planet_id = Number.parseFloat(planetId)

    // Save quiet
    db.swPeople.build(this).save()
  }
  getId() {
    return this.id
  }
  getName() {
    return this.name
  }
  getMass() {
    return this.mass
  }
  getHeight() {
    return this.height
  }
  getHomeworldName() {
    return this.homeworld_name
  }
  getHomeworlId() {
    return this.homeworld_id
  }
  getPlanetId() {
    return this.homeworld_planet_id
  }
  async getWeightOnPlanet(planetId) {
    const planet = new Planet(planetId)
    await planet.init()
    return {
      planet_id: planetId,
      name: planet.getName(),
      weight: getWeightOnPlanet(this.mass, planet.gravity),
      gravity: planet.getGravity(),
      homeworld_planet: this.homeworld_planet_id === planetId,
    }
  }
}

module.exports = { People }
