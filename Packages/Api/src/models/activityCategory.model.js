const { Sequelize, DataTypes } = require("sequelize");

/**
 * @param {Sequelize} sequelize
 */
const ActivityCategoryModel = (sequelize) => {
	return sequelize.define(
		"activity_category",
		{
			activity_category_ID: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			category: {
				type: DataTypes.STRING(255),
				allowNull: false,
				validate: {
					isIn: [["All", "Cardio", "Yoga", "Muscles", "Premium"]],
				},
			},
		},
		{
			sequelize,
			tableName: "activity_category",
			timestamps: true,
			indexes: [
				{
					name: "PRIMARY",
					unique: true,
					using: "BTREE",
					fields: [{ name: "activity_category_ID" }],
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

module.exports = ActivityCategoryModel;
