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
			// Foreign Key
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "user",
					key: "user_ID",
				},
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
				{
					name: "activity_id",
					using: "BTREE",
					fields: [{ name: "activity_id" }],
				},
				{
					name: "recipe_id",
					using: "BTREE",
					fields: [{ name: "recipe_id" }],
				},
				{
					name: "banner_id",
					using: "BTREE",
					fields: [{ name: "banner_id" }],
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

module.exports = BuyerModel;
