const { Sequelize, DataTypes } = require("sequelize");

/**
 * @param {Sequelize} sequelize
 */
const WorkoutModel = (sequelize) => {
	return sequelize.define(
		"workout",
		{
			workout_ID: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			workout: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			activity_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize,
			tableName: "workout",
			timestamps: true,
			indexes: [
				{
					name: "PRIMARY",
					unique: true,
					using: "BTREE",
					fields: [{ name: "workout_ID" }],
				},
			],
			logging: false,
		},
	);
};

module.exports = WorkoutModel;
