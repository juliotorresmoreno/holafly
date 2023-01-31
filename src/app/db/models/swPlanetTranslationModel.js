'use strict'

/**
 *
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 * @returns
 */
const swPlanetTranslationModel = (sequelize, DataTypes) => {
  const swPlanetTranslationModel = sequelize.define(
    'swPlanetTranslation',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING,
    },
    {
      paranoid: true,
    }
  )
  return swPlanetTranslationModel
}

module.exports = swPlanetTranslationModel
