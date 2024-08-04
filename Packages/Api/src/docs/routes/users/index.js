const fs = require("fs");
const YAML = require("yaml");


const patchVerifyUser = YAML.parse(
    fs.readFileSync("./src/docs/routes/users/patch_verify_user.yml", "utf8"),
);

module.exports = {
    patchVerifyUser,
};