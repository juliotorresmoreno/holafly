class AbstractPlanet {
  constructor(id) {
    if (this.constructor == AbstractPlanet) {
      throw new Error("Abstract classes can't be instantiated.")
    }
  }

  async init() {
    throw new Error('To be implemented')
  }

  getName() {
    return this.name
  }

  getGravity() {
    return this.gravity
  }
}

module.exports = { AbstractPlanet }
