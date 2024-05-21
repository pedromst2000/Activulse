/**
 * Check if a string is a valid base64 image
 * @param {any} str - The string to validate
 * @returns {boolean} True if the string is a valid base64 image, false otherwise
 */
function base64Image(str) {
	if (typeof str !== "string") {
		return false;
	}

	const base64Regex = /^data:image\/(png|jpg|jpeg);base64,/;

	// Check if the string starts with a valid base64 image header
	if (!base64Regex.test(str)) {
		return false;
	}

	// Remove the header to get the actual base64 content
	const base64Content = str.replace(base64Regex, "");

	// Check if the remaining content is a valid base64 string
	try {
		const decodedData = atob(base64Content);
		// Check if the decoded data can be converted to a Uint8Array
		const uint8Array = new Uint8Array(decodedData.length);
		for (let i = 0; i < decodedData.length; i++) {
			uint8Array[i] = decodedData.charCodeAt(i);
		}
		return true;
	} catch (error) {
		return false;
	}
}

module.exports = { base64Image };
