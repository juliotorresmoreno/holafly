const { AbstractPeople } = require('./abstractPeople')
const { swapiFunctions, db } = require('..')
const { getWeightOnPlanet } = require('../swapiFunctions')
const { Planet } = require('../Planet')
const l18n = require('./attrb').translate

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
  }

  async init(lang = '') {
    const person = await db.swPeople
      .findByPk(this.id, {
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
        throw new createHttpError[500]('Database is not working!')
      })
    if (person) {
      this.name = person.name
      this.mass = person.mass
      this.height = person.height
      this.homeworld_name = person.homeworld_name
      this.homeworld_id = person.homeworld_id
      return
    }
    const url = 'https://swapi.dev/api/people/' + this.id + '?format=' + lang
    /**
     * @type {import('./types').Person}
     */
    const data = await swapiFunctions
      .genericRequest(url, 'GET', null)
      .catch(() => {
        throw createError[500]('swapi.dev is not working. Can you go online?')
      })
    this.name = data[l18n('name', lang)]
    this.mass = Number.parseFloat(data[l18n('mass', lang)])
    this.height = Number.parseFloat(data[l18n('height', lang)])
    const homeworldId = (/[0-9]+/.exec(data[l18n('homeworld', lang)]) || [])[0]

    const homeworl = new Planet(parseInt(homeworldId))
    await homeworl.init(lang)

    this.homeworld_id = homeworl.getId()
    this.homeworld_name = homeworl.getName()

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

  async getWeightOnPlanet(planetId) {
    const planet = new Planet(planetId)
    await planet.init()
    return {
      planet_id: planetId,
      name: planet.getName(),
      weight: getWeightOnPlanet(this.mass, planet.gravity),
      gravity: planet.getGravity(),
      homeworld_planet: this.homeworld_id === planetId,
    }
  }
}

module.exports = { People }
