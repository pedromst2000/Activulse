const { Sequelize, DataTypes } = require("sequelize");

/**
 * @param {Sequelize} sequelize
 */
const PictureModel = (sequelize) => {
	return sequelize.define(
		"picture",
		{
			picture_ID: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			challenge_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			recipe_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			activity_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			banner_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			// diet_id: {
			// 	type: DataTypes.INTEGER,
			// 	allowNull: true,
			// },
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},

			badge_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			provider_id: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			provider_url: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			user_avatar: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
		},
		{
			sequelize,
			tableName: "picture",
			timestamps: true,
			indexes: [
				{
					name: "PRIMARY",
					unique: true,
					using: "BTREE",
					fields: [{ name: "picture_ID" }],
				},
				{
					name: "challenge_id",
					using: "BTREE",
					fields: [{ name: "challenge_id" }],
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
					name: "banner_id",
					using: "BTREE",
					fields: [{ name: "banner_id" }],
				},
				// {
				// 	name: "diet_id",
				// 	using: "BTREE",
				// 	fields: [{ name: "diet_id" }],
				// },
				{
					name: "user_id",
					using: "BTREE",
					fields: [{ name: "user_id" }],
				},
				{
					name: "badge_id",
					using: "BTREE",
					fields: [{ name: "badge_id" }],
				},
			],
		},
	);
};

module.exports = PictureModel;
