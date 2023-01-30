const { AbstractPlanet } = require('./abstractPlanet')
const { swapiFunctions } = require('..')

class Planet extends AbstractPlanet {
  constructor(id) {
    super(id)
    if (!id) throw new Error('id is undefined!')

    this.id = id
    this.name = ''
    this.gravity = 0
  }

  async init() {
    /**
     * @type {import('./types').Person}
     */
    const data = await swapiFunctions
      .genericRequest('https://swapi.dev/api/planets/' + this.id, 'GET', null)
      .catch(() => {
        throw new Error('swapi.dev is not working. Can you go online?')
      })
    this.name = data.name
    const gravity = (/[0-9]+([0-9.][0-9]+)?/.exec(data.gravity) || [])[0] || '1'
    this.gravity = Number.parseFloat(gravity) || 0
  }

  getId() {
    return this.id
  }

  getName() {
    return this.name
  }

  getGravity() {
    return this.gravity
  }
}

module.exports = { Planet }
