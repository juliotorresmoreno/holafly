const swPeople = require('./swPeopleModel')
const swPlanet = require('./swPlanetModel')
const logging = require('./loggingModel')
const swPeopleTranslation = require('./swPeopleTranslationModel')
const swPlanetTranslation = require('./swPlanetTranslationModel')

module.exports = [
  swPeople,
  swPlanet,
  swPlanetTranslation,
  swPeopleTranslation,
  logging,
]
