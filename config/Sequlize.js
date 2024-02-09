const { Sequelize } = require('sequelize');
const databaseConfig = require('./Database');

const env = process.env.APP_NODE || 'development';
const config = databaseConfig[env];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
});

module.exports = sequelize;
