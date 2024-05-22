const { Sequelize, DataTypes } = require("sequelize");

/**
 * @param {Sequelize} sequelize
 */
const ChallengeCategoryModel = (sequelize) => {
	return sequelize.define(
		"challenge_category",
		{
			challenge_category_ID: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			category: {
				type: DataTypes.STRING(255),
				allowNull: false,
				validate: {
					isIn: [["All", "Walk", "Jogging", "Run", "Marathone"]],
				},
			},
		},
		{
			sequelize,
			tableName: "challenge_category",
			timestamps: true,
			indexes: [
				{
					name: "PRIMARY",
					unique: true,
					using: "BTREE",
					fields: [{ name: "challenge_category_ID" }],
				},
				{
					name: "category",
					using: "BTREE",
					fields: [{ name: "category" }],
				},
			],
		},
	);
};

module.exports = ChallengeCategoryModel;
