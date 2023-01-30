'use strict'

/**
 *
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 * @returns
 */
module.exports = (sequelize, DataTypes) => {
  const swPlanet = sequelize.define(
    'swPlanet',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING,
      gravity: DataTypes.FLOAT,
    },
    {
      paranoid: true,
    }
  )
  return swPlanet
}
