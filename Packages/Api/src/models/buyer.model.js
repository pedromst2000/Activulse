const { Sequelize, DataTypes } = require("sequelize");

/**
 * @param {Sequelize} sequelize
 */
const BuyerModel = (sequelize) => {
	return sequelize.define(
		"buyer",
		{
			buy_ID: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			activity_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			recipe_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			banner_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize,
			tableName: "buyer",
			timestamps: true,
			indexes: [
				{
					name: "PRIMARY",
					unique: true,
					using: "BTREE",
					fields: [{ name: "buy_ID" }],
				},
			],
		},
	);
};

module.exports = BuyerModel;
