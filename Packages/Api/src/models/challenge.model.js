const { Sequelize, DataTypes } = require("sequelize");

/**
 * @param {Sequelize} sequelize
 */
const ChallengeModel = (sequelize) => {
	return sequelize.define(
		"challenge",
		{
			challenge_ID: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			title: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			difficulty: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					min: 1,
					max: 5,
				},
			},
			earn_points: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					min: 0,
				},
			},
			description: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			challenge_steps: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					min: 0,
				},
			},
			challenge_distance: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					min: 0,
				},
			},
			category_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize,
			tableName: "challenge",
			timestamps: true,
			indexes: [
				{
					name: "PRIMARY",
					unique: true,
					using: "BTREE",
					fields: [{ name: "challenge_ID" }],
				},
				{
					name: "category_id",
					using: "BTREE",
					fields: [{ name: "category_id" }],
				},
				{
					name: "title",
					using: "BTREE",
					fields: [{ name: "title" }],
				},
				{
					name: "difficulty",
					using: "BTREE",
					fields: [{ name: "difficulty" }],
				},
				{
					name: "earn_points",
					using: "BTREE",
					fields: [{ name: "earn_points" }],
				},
			],
		},
	);
};

module.exports = ChallengeModel;
