const { AbstractPlanet } = require('./abstractPlanet')
const createHttpError = require('http-errors')

class Planet extends AbstractPlanet {
  constructor(id) {
    super(id)
    if (!id) throw new Error('id is undefined!')

    this.id = id
    this.name = ''
    this.gravity = 1
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

  getGravity() {
    return this.gravity
  }
}

module.exports = { Planet }
