'use strict'

const Sequelize = require('sequelize')
const models = require('./models')

let sequelize

sequelize = new Sequelize.Sequelize('sqlite::memory:', {
  logging: process.env.NODE_ENV === 'development',
})

/**
 * @typedef {{
 *  sequelize: Sequelize.Sequelize
 *  Sequelize: Sequelize
 *  swPeople: Sequelize.ModelCtor<Sequelize.Model<any, any>>,
 *  swPlanet: Sequelize.ModelCtor<Sequelize.Model<any, any>>,
 *  swPeopleTranslation: Sequelize.ModelCtor<Sequelize.Model<any, any>>,
 *  swPlanetTranslation: Sequelize.ModelCtor<Sequelize.Model<any, any>>,
 *  logging: Sequelize.ModelCtor<Sequelize.Model<any, any>>,
 *  [x: string]: Sequelize.ModelCtor<Sequelize.Model<any, any>>
 * }} DB
 */

/**
 * @type {DB}
 */
const db = {
  sequelize,
  Sequelize,
}

for (const modelInit of models) {
  const model = modelInit(db.sequelize, db.Sequelize.DataTypes)
  db[model.name] = model
}

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

const initDB = async () => {
  await db.swPeopleTranslation.sync({ force: true })
  await db.swPlanetTranslation.sync({ force: true })
  await db.swPeople.sync({ force: true })
  await db.swPlanet.sync({ force: true })
  await db.logging.sync({ force: true })
}

const populateDB = async () => {
  await db.swPlanet.bulkCreate([
    {
      name: 'Tatooine',
      gravity: 1.0,
    },
  ])
  await db.swPeople.bulkCreate([
    {
      name: 'Luke Skywalker',
      height: 172,
      mass: 77,
      homeworld_name: 'Tatooine',
      homeworld_id: '/planets/1',
    },
  ])
}

const deleteDB = async () => {
  await db.swPeople.drop()
  await db.swPlanet.drop()
  await db.swPeopleTranslation.drop()
  await db.swPlanetTranslation.drop()
  await db.logging.drop()
}

const watchDB = async () => {
  const planets = await db.swPlanet.findAll({
    raw: true,
  })

  const people = await db.swPeople.findAll({
    raw: true,
  })

  const peopleTranslation = await db.swPeopleTranslation.findAll({
    raw: true,
  })

  const planetTranslation = await db.swPlanetTranslation.findAll({
    raw: true,
  })

  console.log('============= swPlanet =============')
  console.table(planets)
  console.log('\n')
  console.log('============= swPeople =============')
  console.table(people)
  console.log('============= swPeopleTranslation =============')
  console.table(peopleTranslation)
  console.log('============= swPlanetTranslation =============')
  console.table(planetTranslation)
}

db.initDB = initDB
db.populateDB = populateDB
db.watchDB = watchDB
db.deleteDB = deleteDB

module.exports = db
