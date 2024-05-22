const { Sequelize, DataTypes } = require("sequelize");

/**
 * @param {Sequelize} sequelize
 */
const RecipeModel = (sequelize) => {
	return sequelize.define(
		"recipe",
		{
			recipe_ID: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			title: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			duration_conf: {
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
			isPremium: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
				allowNull: false,
			},
			price: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					min: 0,
				},
			},
			video_time: {
				type: DataTypes.INTEGER,
				allowNull: true,
				validate: {
					min: 0,
				},
			},
			category_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			diet_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize,
			tableName: "recipe",
			timestamps: true,
			indexes: [
				{
					name: "PRIMARY",
					unique: true,
					using: "BTREE",
					fields: [{ name: "recipe_ID" }],
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
					name: "isPremium",
					using: "BTREE",
					fields: [{ name: "isPremium" }],
				},
				{
					name: "price",
					using: "BTREE",
					fields: [{ name: "price" }],
				},
				{
					name: "video_time",
					using: "BTREE",
					fields: [{ name: "video_time" }],
				},
				{
					name: "diet_id",
					using: "BTREE",
					fields: [{ name: "diet_id" }],
				},
			],
		},
	);
};

module.exports = RecipeModel;
