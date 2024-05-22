const { Sequelize, DataTypes } = require("sequelize");

/**
 * @param {Sequelize} sequelize
 */
const RecipeCategoryModel = (sequelize) => {
	return sequelize.define(
		"recipe_category",
		{
			recipe_category_ID: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			category: {
				type: DataTypes.STRING(255),
				allowNull: false,
				validate: {
					isIn: [["All", "Soups", "Main Dishes", "Salades", "Desserts", "Premium"]],
				},
			},
		},
		{
			sequelize,
			tableName: "recipe_category",
			timestamps: true,
			indexes: [
				{
					name: "PRIMARY",
					unique: true,
					using: "BTREE",
					fields: [{ name: "recipe_category_ID" }],
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

module.exports = RecipeCategoryModel;
