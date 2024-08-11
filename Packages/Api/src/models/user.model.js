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
			OTP: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			OTP_generated_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			OTP_verified: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
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
				allowNull: true,
				validate: {
					isIn: [["Male", "Female"]],
				},
			},
			age: {
				type: DataTypes.INTEGER,
				allowNull: true,
				validate: {
					min: 30,
				},
			},
			is_smoker: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
			},
			is_diabetic: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
			},
			is_treatment_hypertension: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
			},
			systolic_blood_pressure: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			HDL_Cholesterol: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			Total_Cholesterol: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			stress_status: {
				type: DataTypes.STRING(255),
				allowNull: true,
				validate: {
					isIn: [["Rare", "Sometimes", "Frequently"]],
				},
			},
			know_diet: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
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
				allowNull: true,
			},
			selected_avatar_ID: {
				type: DataTypes.INTEGER,
				allowNull: true,
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
			],
			logging: false,
		},
	);
};

module.exports = UserModel;
