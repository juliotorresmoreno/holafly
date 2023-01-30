'use strict'

/**
 *
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 * @returns
 */

const loggingModel = (sequelize, DataTypes) => {
  const logging = sequelize.define('logging', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    action: DataTypes.STRING,
    header: DataTypes.STRING,
    ip: DataTypes.STRING,
  })
  return logging
}

module.exports = loggingModel
