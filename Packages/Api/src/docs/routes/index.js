const fs = require("fs");
const YAML = require("yaml");

const getHelloWorld = YAML.parse(
	fs.readFileSync("./src/docs/routes/default/get_hello_world.yml", "utf8"),
);
const notFound = YAML.parse(
	fs.readFileSync("./src/docs/routes/default/not_found.yml", "utf8"),
);

module.exports = { default: { getHelloWorld, notFound } };
