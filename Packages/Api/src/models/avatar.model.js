const { Sequelize, DataTypes } = require("sequelize");

/**
 * @param {Sequelize} sequelize
 */
const AvatarModel = (sequelize) => {
	return sequelize.define(
		"avatar",
		{
			avatar_ID: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
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
			tableName: "avatar",
			timestamps: true,
			indexes: [
				{
					name: "PRIMARY",
					unique: true,
					using: "BTREE",
					fields: [{ name: "avatar_ID" }],
				},
			],
		},
	);
};

module.exports = AvatarModel;
