const { Sequelize, DataTypes } = require("sequelize");

/**
 * @param {Sequelize} sequelize
 */
const AssetModel = (sequelize) => {
	return sequelize.define(
		"asset",
		{
			Asset_ID: {
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

			badge_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			banner_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			avatar_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},

			provider_image_id: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			provider_image_url: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			provider_video_id: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			provider_video_url: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
		},
		{
			sequelize,
			tableName: "asset",
			timestamps: true,
			indexes: [
				{
					name: "PRIMARY",
					unique: true,
					using: "BTREE",
					fields: [{ name: "Asset_ID" }],
				},
			],
			logging: false,
		},
	);
};

module.exports = AssetModel;
