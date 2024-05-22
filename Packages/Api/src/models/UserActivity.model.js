const { Sequelize, DataTypes } = require("sequelize");

/**
 * @param {Sequelize} sequelize
 */
const UserActivityModel = (sequelize) => {
	return sequelize.define(
		"user_activity",
		{
			user_activity_ID: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			total_steps: {
				type: DataTypes.INTEGER,
				allowNull: true,
				validate: {
					min: 0,
				},
			},
			total_distance: {
				type: DataTypes.INTEGER,
				allowNull: true,
				validate: {
					min: 0,
				},
			},
			total_time_workout: {
				type: DataTypes.INTEGER,
				allowNull: true,
				validate: {
					min: 0,
				},
			},
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize,
			tableName: "user_activity",
			timestamps: true,
			indexes: [
				{
					name: "PRIMARY",
					unique: true,
					using: "BTREE",
					fields: [{ name: "user_activity_ID" }],
				},
				{
					name: "user_id",
					using: "BTREE",
					fields: [{ name: "user_id" }],
				},
			],
		},
	);
};

module.exports = UserActivityModel;
