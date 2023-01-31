const fetch = require('node-fetch')

/**
 *
 * @param {number} mass
 * @param {number} gravity
 * @returns
 */
const getWeightOnPlanet = (mass, gravity) => {
  return mass * gravity
}

/**
 *
 * @param {string} url
 * @param {string} method
 * @param {string} body
 * @param {boolean} logging
 * @returns
 */
const genericRequest = async (url, method, body, logging = false) => {
  let options = {
    method: method,
  }
  if (body) {
    options.body = body
  }
  const response = await fetch(url, options)
  const data = await response.json()
  if (logging) {
    console.log(data)
  }
  return data
}

module.exports = {
  getWeightOnPlanet,
  genericRequest,
}
