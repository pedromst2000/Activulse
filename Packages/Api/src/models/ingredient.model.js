const { Sequelize, DataTypes } = require("sequelize");

/**
 * @param {Sequelize} sequelize
 */
const IngredientModel = (sequelize) => {
	return sequelize.define(
		"ingredient",
		{
			ingredient_ID: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			ingredient: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			recipe_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize,
			tableName: "ingredient",
			timestamps: true,
			indexes: [
				{
					name: "PRIMARY",
					unique: true,
					using: "BTREE",
					fields: [{ name: "ingredient_ID" }],
				},
				{
					name: "ingredient",
					using: "BTREE",
					fields: [{ name: "ingredient" }],
				},
				{
					name: "recipe_id",
					using: "BTREE",
					fields: [{ name: "recipe_id" }],
				},
			],
		},
	);
};

module.exports = IngredientModel;
