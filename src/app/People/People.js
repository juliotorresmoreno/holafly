const { AbstractPeople } = require('./abstractPeople')
const { swapiFunctions } = require('..')

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
    this.homeworl_id = 0
  }

  async init() {
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

    const homeworl = await swapiFunctions
      .genericRequest(data.homeworld, 'GET', null)
      .catch(() => {
        throw new Error('swapi.dev is not working. Can you go online?')
      })

    this.homeworl_id = Number.parseFloat(homeworldId)
    this.homeworld_name = homeworl.name
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
    return this.homeworl_id
  }
  getWeightOnPlanet(planetId) {
    throw new Error('To be implemented')
  }
}

module.exports = { People }
