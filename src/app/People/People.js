const { AbstractPeople } = require('./abstractPeople')
const { getWeightOnPlanet } = require('../swapiFunctions')
const { Planet } = require('../Planet')
const createHttpError = require('http-errors')

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
    throw new createHttpError[500]('To be implemented')
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
    throw new createHttpError[500]('To be implemented')
  }
}

module.exports = { People }
