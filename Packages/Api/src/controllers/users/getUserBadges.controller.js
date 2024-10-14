const db = require("../../db");
const utils = require("../../utils");
const { Op } = require("sequelize");


/**
 * Returns the logged user data or the user data by id
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */