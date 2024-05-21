const { Sequelize } = require("sequelize");
const config = require("../config");
// const models = require("../models");

const sequelize = new Sequelize(
	config.db.mysql.database,
	config.db.mysql.username,
	config.db.mysql.password,
	{
		host: config.db.mysql.host,
		dialect: config.db.mysql.dialect,
		pool: {
			max: config.db.mysql.pool.max,
			min: config.db.mysql.pool.min,
			acquire: config.db.mysql.pool.acquire,
			idle: config.db.mysql.pool.idle,
		},
		logging: config.db.mysql.logging,
	},
);

// HARD RESET (DROP ALL TABLES)
const forceSync = () => sequelize.sync({ force: true });

// Sync all the models (create the tables and add the foreign keys)
const alterSync = () => sequelize.sync({ alter: true });

const mysql = { sequelize, ...models.init(sequelize), forceSync, alterSync };

module.exports = mysql;
