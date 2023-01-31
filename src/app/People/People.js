const { AbstractPeople } = require('./abstractPeople')
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
    this.mass = 0
    this.height = 0
    this.homeworld_id = 0
  }

  async init() {
    throw new Error('To be implemented')
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
  getHomeworlId() {
    return this.homeworld_id
  }

  async getWeightOnPlanet(planetId) {
    throw new Error('To be implemented')
  }
}

module.exports = { People }
