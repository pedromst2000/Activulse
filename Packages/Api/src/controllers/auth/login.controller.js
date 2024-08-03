const utils = require("../../utils");
const db = require("../../db");
const services = require("../../services");
const templates = require("../../templates");

/**
 * @typedef LoginRequest
 * @property {string} email - The user's email
 * @property {string} password - The user's password
 * @property {boolean} remember_me - Whether to remember the user or not
 */

/**
 * Login controller.
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */
