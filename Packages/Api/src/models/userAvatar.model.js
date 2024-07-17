const { Sequelize, DataTypes } = require("sequelize");

/**
 * @param {Sequelize} sequelize
 */
const UserAvatarModel = (sequelize) => {
	return sequelize.define(
		"user_avatar",
		{
			user_avatar_ID: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			avatar_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize,
			tableName: "user_avatar",
			timestamps: true,
			indexes: [
				{
					name: "PRIMARY",
					unique: true,
					using: "BTREE",
					fields: [{ name: "user_avatar_ID" }],
				},
				{
					name: "user_id",
					using: "BTREE",
					fields: [{ name: "user_id" }],
				},
				{
					name: "avatar_id",
					using: "BTREE",
					fields: [{ name: "avatar_id" }],
				},
			],
		},
	);
};

module.exports = UserAvatarModel;
