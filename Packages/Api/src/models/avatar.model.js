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
			logging: false,
		},
	);
};

module.exports = AvatarModel;
