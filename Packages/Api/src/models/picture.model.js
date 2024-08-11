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

			badge_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			// diet_id: {
			// 	type: DataTypes.INTEGER,
			// 	allowNull: true,
			// },
			banner_id: {
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
			],
			logging: false,
		},
	);
};

module.exports = PictureModel;
