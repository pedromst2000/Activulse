const { Sequelize, DataTypes } = require("sequelize");

/**
 * @param {Sequelize} sequelize
 */
const ChallengeProgressModel = (sequelize) => {
	return sequelize.define(
		"challenge_progress",
		{
			challenge_progress_ID: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
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
			status: {
				type: DataTypes.STRING(255),
				allowNull: true,
				defaultValue: "In Progress",
				validate: {
					isIn: [["In Progress", "Completed"]],
				},
			},
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			challenge_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
		},
		{
			sequelize,
			tableName: "challenge_progress",
			timestamps: true,
			indexes: [
				{
					name: "PRIMARY",
					unique: true,
					using: "BTREE",
					fields: [{ name: "challenge_progress_ID" }],
				},
			],
		},
	);
};

module.exports = ChallengeProgressModel;
