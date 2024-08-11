const { Sequelize, DataTypes } = require("sequelize");

/**
 * @param {Sequelize} sequelize
 */
const ActivityModel = (sequelize) => {
	return sequelize.define(
		"activity",
		{
			activity_ID: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			title: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			intensity: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					min: 1,
					max: 5,
				},
			},
			duration: {
				type: DataTypes.INTEGER,
				allowNull: true,
				validate: {
					min: 0,
				},
			},
			description: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			isPremium: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
			price: {
				type: DataTypes.INTEGER,
				allowNull: true,
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
			tag: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			category_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "activity_category",
					key: "activity_category_ID",
				},
			},
		},
		{
			sequelize,
			tableName: "activity",
			timestamps: true,
			indexes: [
				{
					name: "PRIMARY",
					unique: true,
					using: "BTREE",
					fields: [{ name: "activity_ID" }],
				},
			],
			logging: false,
		},
	);
};

module.exports = ActivityModel;
