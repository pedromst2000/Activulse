const { Sequelize, DataTypes } = require("sequelize");

/**
 * @param {Sequelize} sequelize
 */
const BadgeModel = (sequelize) => {
	return sequelize.define(
		"badge",
		{
			badge_ID: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			title: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			description: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			earn_points: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize,
			tableName: "badge",
			timestamps: true,
			indexes: [
				{
					name: "PRIMARY",
					unique: true,
					using: "BTREE",
					fields: [{ name: "badge_ID" }],
				},
			],
			logging: false,
		},
	);
};

module.exports = BadgeModel;
