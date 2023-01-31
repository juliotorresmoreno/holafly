'use strict'

/**
 *
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 * @returns
 */
const swTranslationModel = (sequelize, DataTypes) => {
  const swTranslationModel = sequelize.define(
    'swTranslation',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      key: DataTypes.STRING,
      value: DataTypes.JSON,
    },
    {
      paranoid: true,
    }
  )
  return swTranslationModel
}

module.exports = swTranslationModel
