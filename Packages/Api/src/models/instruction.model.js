const { Sequelize, DataTypes } = require("sequelize");

/**
 * @param {Sequelize} sequelize
 */
const InstructionModel = (sequelize) => {
	return sequelize.define(
		"instruction",
		{
			instruction_ID: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			instruction: {
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
			tableName: "instruction",
			timestamps: true,
			indexes: [
				{
					name: "PRIMARY",
					unique: true,
					using: "BTREE",
					fields: [{ name: "instruction_ID" }],
				},
			],
		},
	);
};

module.exports = InstructionModel;
