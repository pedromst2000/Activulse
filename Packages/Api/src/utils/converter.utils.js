/**
 * @function metersToSteps
 * @description Converts meters to steps
 * @param {number} steps - The number of steps
 * @returns {number} The number of meters
 */

function stepsToMeters(steps) {
	const meters = steps * 0.762;

	return Math.round(meters);
}

/**
 * @function stepsToMeters
 * @description Converts steps to meters
 * @param {number} meters - The number of meters
 * @returns {number} The number of steps
 */

function metersToSteps(meters) {
	let step = 1.31234; // 1 meter to steps

	let steps = meters * step;

	return Math.round(steps);
}

module.exports = {
	stepsToMeters,
	metersToSteps,
};
