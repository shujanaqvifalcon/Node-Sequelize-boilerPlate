/**
 * User schema
 * @author Shuja Naqvi
 */

// Schema
const { Sequelize, DataTypes } = require('sequelize');
const moment = require('moment-timezone');
const db = require('../database');
const User = db.sequelize.define(
  'tbl_users',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('1', '0'),
      allowNull: false,
      defaultValue: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      allowNull: false,
    },
  },
  {
    modelName: 'User',
  }
);

// sync model
db.sequelize.sync();
//export
module.exports = User;
