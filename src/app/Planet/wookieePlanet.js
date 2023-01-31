const Planet = require('./Planet').Planet
const { swapiFunctions } = require('..')
const db = require('../db')
const l18n = require('./attrb').translate

class WookieePlanet extends Planet {
  constructor(id) {
    super(id)
  }

  async getRemoteData(short = false) {
    const lang = 'wookiee'
    const url = 'https://swapi.dev/api/planets/' + this.id + '?format=' + lang

    /**
     * @type {import('./types').Planet}
     */
    const data = await swapiFunctions
      .genericRequest(url, 'GET', null)
      .catch(() => {
        throw new Error('swapi.dev is not working. Can you go online?')
      })

    const pre = /[0-9]+([0-9.][0-9]+)?/
    const gravity = pre.exec(data[l18n('gravity', lang)])
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
    }

    this.name = data[l18n('name', lang)]

    await db.swPlanetTranslation
      .build({
        id: this.getId(),
        name: this.name,
      })
      .save()
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

    this.gravity = planet.gravity

    const translate = await db.swPlanetTranslation
      .findByPk(this.id, {
        attributes: ['id', 'name'],
      })
      .catch(() => {
        throw new createHttpError[500]('Database is not working!')
      })

    if (translate) {
      this.name = translate.name
    }

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

module.exports = { WookieePlanet }
