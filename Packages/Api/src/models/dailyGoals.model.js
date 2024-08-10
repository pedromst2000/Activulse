const { Sequelize, DataTypes } = require("sequelize");

/**
 * @param {Sequelize} sequelize
 */
const DailyGoalsModel = (sequelize) => {
	return sequelize.define(
		"daily_goals",
		{
			daily_goal_ID: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			goal_steps: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					min: 0,
				},
			},
			steps_progress: {
				type: DataTypes.INTEGER,
				allowNull: true,
				validate: {
					min: 0,
				},
			},
			is_steps_completed: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
			goal_distance: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					min: 0,
				},
			},
			distance_progress: {
				type: DataTypes.INTEGER,
				allowNull: true,
				validate: {
					min: 0,
				},
			},
			is_distance_completed: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize,
			tableName: "daily_goals",
			timestamps: true,
			indexes: [
				{
					name: "PRIMARY",
					unique: true,
					using: "BTREE",
					fields: [{ name: "daily_goal_ID" }],
				},
			],
		},
	);
};

module.exports = DailyGoalsModel;
