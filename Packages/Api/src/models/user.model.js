const { Sequelize, DataTypes } = require("sequelize");

/**
 * @param {Sequelize} sequelize
 */
const UserModel = (sequelize) => {
	return sequelize.define(
		"user",
		{
			user_ID: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			email: {
				type: DataTypes.STRING(255),
				allowNull: false,
				validate: {
					isEmail: true,
				},
			},
			username: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			password: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			change_password_token: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			change_password_expires_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			OTP_token: {
				type: DataTypes.STRING(4),
				allowNull: true,
			},
			OTP_expires_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			verify_user_token: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			is_verified: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
			gender: {
				type: DataTypes.STRING(255),
				allowNull: false,
				validate: {
					isIn: [["Male", "Female"]],
				},
			},
			age: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					min: 30,
				},
			},
			is_smoker: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
			is_diabetic: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
			is_treatment_hypertension: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
			systolic_blood_pressure: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			HDL_Cholesterol: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			Total_Cholesterol: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			stress_status: {
				type: DataTypes.STRING(255),
				allowNull: false,
				validate: {
					isIn: [["Rare", "Sometimes", "Frequently"]],
				},
			},
			know_diet: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
			fast_food_status: {
				type: DataTypes.STRING(255),
				allowNull: true,
				validate: {
					isIn: [["Rare", "Sometimes", "Frequently"]],
				},
			},
			points: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
				validate: {
					min: 0,
				},
			},
			diet_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			selected_banner_ID: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			selected_avatar_ID: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize,
			tableName: "user",
			timestamps: true,
			indexes: [
				{
					name: "PRIMARY",
					unique: true,
					using: "BTREE",
					fields: [{ name: "user_ID" }],
				},
				{
					name: "email",
					unique: true,
					using: "BTREE",
					fields: [{ name: "email" }],
				},
				{
					name: "username",
					unique: true,
					using: "BTREE",
					fields: [{ name: "username" }],
				},
				{
					name: "change_password_token",
					unique: true,
					using: "BTREE",
					fields: [{ name: "change_password_token" }],
				},
				{
					name: "OTP_token",
					unique: true,
					using: "BTREE",
					fields: [{ name: "OTP_token" }],
				},
				{
					name: "verify_user_token",
					unique: true,
					using: "BTREE",
					fields: [{ name: "verify_user_token" }],
				},
				{
					name: "diet_id",
					using: "BTREE",
					fields: [{ name: "diet_id" }],
				},
				{
					name: "selected_banner_ID",
					using: "BTREE",
					fields: [{ name: "selected_banner_ID" }],
				},
				{
					name: "selected_avatar_ID",
					using: "BTREE",
					fields: [{ name: "selected_avatar_ID" }],
				},
			],
		},
	);
};

module.exports = UserModel;
