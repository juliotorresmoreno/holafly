const { swapiFunctions } = require('..')

/**
 * @typedef {import('./abstractPeople').AbstractPeople AbstractPeople}
 */

/**
 * @param {number} id
 */
const People = function (id) {
  if (!id) throw new Error('id is undefined!')

  var payload = {
    id,
    name: '',
    mass: '',
    height: 0,
    homeworld_name: '',
    homeworl_id: 0,
  }
  /**
   * @type {AbstractPeople}
   */
  const result = {
    async init() {
      /**
       * @type {import('./types').Person}
       */
      const data = await swapiFunctions
        .genericRequest('https://swapi.dev/api/people/' + id, 'GET', null)
        .catch(() => {
          throw createError[500]('swapi.dev is not working. Can you go online?')
        })
      payload.name = data.name
      payload.mass = Number.parseFloat(data.mass)
      payload.height = Number.parseFloat(data.height)
      const homeworldId = (/[0-9]+/.exec(data.homeworld) || [])[0]

      const homeworl = await swapiFunctions
        .genericRequest(data.homeworld, 'GET', null)
        .catch(() => {
          throw createError[500]('swapi.dev is not working. Can you go online?')
        })

      payload.homeworl_id = Number.parseFloat(homeworldId)
      payload.homeworld_name = homeworl.name
    },
    getId() {
      return payload.id
    },
    getName() {
      return payload.name
    },
    getMass() {
      return payload.mass
    },
    getHeight() {
      return payload.height
    },
    getHomeworldName() {
      return payload.homeworld_name
    },
    getHomeworlId() {
      return payload.homeworl_id
    },
    getWeightOnPlanet(planetId) {
      throw new Error('To be implemented')
    },
  }
  return result
}

module.exports = { People }
