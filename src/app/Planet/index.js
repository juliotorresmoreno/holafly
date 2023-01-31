const WookieePlanet = require('./wookieePlanet').WookieePlanet
const CommonPlanet = require('./commonPlanet').CommonPlanet

const planetFactory = async (id, lang) => {
  let Planet = null
  if (lang == 'wookiee') {
    Planet = new WookieePlanet(id)
  } else {
    Planet = new CommonPlanet(id)
  }
  await Planet.init()
  return Planet
}

module.exports = { planetFactory, CommonPlanet, WookieePlanet }
