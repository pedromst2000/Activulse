const db = require("../../db");
const utils = require("../../utils");
const { Op } = require("sequelize");

/**
 * @typedef activityDetailsParams
 * @property {number} id - The activity's id
 */

/**
 * Returns one activity data by id
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */

async function activityDetails(req, res) {
	try {
		const { id } = req.params;
		const loggedUserId = req.userId;

		const activity = await db.mysql.Activity.findByPk(id, {});
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
}

module.exports = activityDetails;
