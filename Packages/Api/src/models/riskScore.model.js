const { Sequelize, DataTypes } = require("sequelize");

/**
 * @param {Sequelize} sequelize
 */
const RiskScoreModel = (sequelize) => {
	return sequelize.define(
		"risk_score",
		{
			risk_ID: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			score: {
				type: DataTypes.FLOAT,
				allowNull: false,
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
			tableName: "risk_score",
			timestamps: true,
			indexes: [
				{
					name: "PRIMARY",
					unique: true,
					using: "BTREE",
					fields: [{ name: "risk_ID" }],
				},
				{
					name: "user_id",
					unique: true,
					using: "BTREE",
					fields: [{ name: "user_id" }],
				},
			],
		},
	);
};

module.exports = RiskScoreModel;
