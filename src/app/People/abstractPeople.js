class AbstractPeople {
  constructor(id) {
    if (this.constructor == AbstractPeople) {
      throw new Error("Abstract classes can't be instantiated.")
    }
  }

  async init() {
    throw new Error('To be implemented')
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
    return this.homeworldName
  }

  getHomeworlId() {
    return this.homeworlId
  }

  getWeightOnPlanet(planetId) {
    throw new Error('To be implemented')
  }
}
