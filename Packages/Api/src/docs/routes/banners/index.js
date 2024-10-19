const fs = require("fs");
const YAML = require("yaml");

const getBannersStore = YAML.parse(
	fs.readFileSync("./src/docs/routes/banners/get_banners_store.yml", "utf8"),
);

const postBuyBanner = YAML.parse(
	fs.readFileSync("./src/docs/routes/banners/post_buy_banner.yml", "utf8"),
);

module.exports = {
	getBannersStore,
	postBuyBanner,
};
