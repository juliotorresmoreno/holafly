class AbstractPeople {
  constructor(id) {
    if (this.constructor == AbstractPeople) {
      throw new Error("Abstract classes can't be instantiated.")
    }
  }

  async init() {
    throw new Error('To be implemented')
  }

  /**
   *
   * @returns {number}
   */
  getId() {
    return this.id
  }

  /**
   *
   * @returns {string}
   */
  getName() {
    return this.name
  }

  /**
   *
   * @returns {number}
   */
  getMass() {
    return this.mass
  }

  /**
   *
   * @returns {number}
   */
  getHeight() {
    return this.height
  }

  /**
   *
   * @returns {string}
   */
  getHomeworldName() {
    return this.homeworldName
  }

  /**
   *
   * @returns {number}
   */
  getHomeworlId() {
    return this.homeworlId
  }

  /**
   *
   * @param {number} planetId
   * @returns {number}
   */
  getWeightOnPlanet(planetId) {
    throw new Error('To be implemented')
  }
}

module.exports = { AbstractPeople }
