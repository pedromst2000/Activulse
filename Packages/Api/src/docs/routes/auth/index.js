const fs = require("fs");
const YAML = require("yaml");

const postRegister = YAML.parse(
	fs.readFileSync("./src/docs/routes/auth/post_register.yml", "utf8"),
);

module.exports = {
	postRegister,
};
