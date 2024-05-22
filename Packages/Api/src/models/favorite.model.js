const { Sequelize, DataTypes } = require("sequelize");

/**
 * @param {Sequelize} sequelize
 */
const FavoriteModel = (sequelize) => {
	return sequelize.define(
		"favorite",
		{
			fav_ID: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			recipe_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},

			activity_id: {
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
			tableName: "favorite",
			timestamps: true,
			indexes: [
				{
					name: "PRIMARY",
					unique: true,
					using: "BTREE",
					fields: [{ name: "favorite_ID" }],
				},
				{
					name: "recipe_id",
					using: "BTREE",
					fields: [{ name: "recipe_id" }],
				},

				{
					name: "activity_id",
					using: "BTREE",
					fields: [{ name: "activity_id" }],
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

module.exports = FavoriteModel;
