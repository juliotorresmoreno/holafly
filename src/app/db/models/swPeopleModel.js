'use strict'

/**
 *
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 * @returns
 */
const swPeopleModel = (sequelize, DataTypes) => {
  const swPeople = sequelize.define(
    'swPeople',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING,
      mass: DataTypes.INTEGER,
      height: DataTypes.INTEGER,
      homeworld_name: DataTypes.STRING,
      homeworld_id: DataTypes.STRING,
    },
    {
      paranoid: true,
    }
  )
  return swPeople
}

module.exports = swPeopleModel
