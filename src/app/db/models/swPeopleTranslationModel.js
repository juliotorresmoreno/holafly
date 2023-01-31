'use strict'

/**
 *
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 * @returns
 */
const swPeopleTranslationModel = (sequelize, DataTypes) => {
  const swPeopleTranslationModel = sequelize.define(
    'swPeopleTranslation',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING,
    },
    {
      paranoid: true,
    }
  )
  return swPeopleTranslationModel
}

module.exports = swPeopleTranslationModel
