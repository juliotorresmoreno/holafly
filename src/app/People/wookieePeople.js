const { AbstractPeople } = require('./abstractPeople')
const { swapiFunctions, db } = require('..')
const { getWeightOnPlanet } = require('../swapiFunctions')
const { planetFactory } = require('../Planet')
const { People } = require('./People')
const createHttpError = require('http-errors')
const l18n = require('./attrb').translate

/**
 * @type {AbstractPeople}
 */
class WookieePeople extends People {
  constructor(id) {
    super(id)
  }

  async getRemoteData(short = false) {
    const lang = 'wookiee'
    const url = 'https://swapi.dev/api/people/' + this.id + '?format=wookiee'

    /**
     * @type {import('./types').Person}
     */
    const data = await swapiFunctions
      .genericRequest(url, 'GET', null)
      .catch(() => {
        throw createHttpError[500](
          'swapi.dev is not working. Can you go online?'
        )
      })

    this.mass = Number.parseFloat(data[l18n('mass', lang)])
    this.height = Number.parseFloat(data[l18n('height', lang)])

    const pre = /[0-9]+([0-9.][0-9]+)?/
    const homeworld = pre.exec(data[l18n('homeworld', lang)])
    if (homeworld && homeworld.length > 0) {
      this.homeworld_id = Number.parseFloat(homeworld[0])
    }

    if (!short)
      // Save quiet
      await db.swPeople
        .build({
          id: this.getId(),
          mass: this.getMass(),
          height: this.getHeight(),
          homeworld_id: this.getHomeworlId(),
        })
        .save()

    this.name = data[l18n('name', lang)]

    await db.swPeopleTranslation
      .build({
        id: this.getId(),
        name: this.name,
      })
      .save()
  }

  async getLocalData() {
    const person = await db.swPeople.findByPk(this.id).catch(() => {
      throw new createHttpError[500]('Database is not working!')
    })
    if (!person) {
      return false
    }

    this.mass = person.mass
    this.height = person.height
    this.homeworld_id = person.homeworld_id

    const translate = await db.swPeopleTranslation
      .findByPk(this.id)
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
    if (!this.getMass()) return null
    const planet = await planetFactory(planetId, 'wookiee')
    return {
      planet_id: planetId,
      name: planet.getName(),
      weight: planet.getGravity()
        ? getWeightOnPlanet(this.mass, planet.gravity)
        : 'unknown',
      gravity: planet.getGravity(),
      homeworld_planet: this.homeworld_id === planetId,
    }
  }
}

module.exports = { WookieePeople }
