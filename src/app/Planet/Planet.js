const { AbstractPlanet } = require('./abstractPlanet')
const { swapiFunctions } = require('..')
const db = require('../db')

class Planet extends AbstractPlanet {
  constructor(id) {
    super(id)
    if (!id) throw new Error('id is undefined!')

    this.id = id
    this.name = ''
    this.gravity = 0
  }

  async init() {
    const planet = await db.swPlanet
      .findByPk(this.id, {
        attributes: ['id', 'name', 'gravity'],
      })
      .catch(() => {
        throw new createHttpError[500]('Database is not working!')
      })

    if (planet) {
      this.name = planet.name
      this.gravity = planet.gravity
      return
    }

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

    // Save quiet
    db.swPlanet.build(this).save()
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
