const Planet = require('./Planet').Planet
const { swapiFunctions } = require('..')
const db = require('../db')

class CommonPlanet extends Planet {
  constructor(id) {
    super(id)
  }

  async getRemoteData(short = false) {
    const url = 'https://swapi.dev/api/planets/' + this.id

    /**
     * @type {import('./types').Planet}
     */
    const data = await swapiFunctions
      .genericRequest(url, 'GET', null)
      .catch(() => {
        throw new Error('swapi.dev is not working. Can you go online?')
      })
    this.name = data.name
    const pre = /[0-9]+([0-9.][0-9]+)?/
    const gravity = pre.exec(data.gravity)
    if (gravity && gravity.length > 0) {
      this.gravity = Number.parseFloat(gravity[0]) || 1
    }

    if (!short) {
      await db.swPlanet
        .build({
          id: this.getId(),
          name: this.getName(),
          gravity: this.getGravity(),
        })
        .save()
      return
    }
    await db.swPlanet.update(
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
    const planet = await db.swPlanet
      .findByPk(this.id, {
        attributes: ['id', 'name', 'gravity'],
      })
      .catch(() => {
        throw new createHttpError[500]('Database is not working!')
      })

    if (!planet) {
      return false
    }

    this.name = planet.name
    this.gravity = planet.gravity

    return true
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

module.exports = { CommonPlanet }
