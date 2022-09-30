/**
 * Admin schema
 * @author Shuja Naqvi
 */

// Schema
const { DataTypes } = require('sequelize');
const moment = require('moment-timezone');
const db = require('../database');
const Admin = db.sequelize.define(
  'tbl_admins',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
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
    modelName: 'Admin',
  }
);

// sync model
db.sequelize.sync();
//export
module.exports = Admin;
