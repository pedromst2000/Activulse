module.exports = {
	env: {
		browser: false,
		node: true,
		commonjs: true,
		es2021: true,
	},
	extends: "eslint:recommended",
	overrides: [
		{
			env: {
				node: true,
			},
			files: [".eslintrc.{js,cjs}"],
			parserOptions: {
				sourceType: "script",
			},
		},
	],
	parserOptions: {
		ecmaVersion: "latest",
	},
	plugins: ["prettier", "jsdoc"],
	rules: {
		"prettier/prettier": "error",
		"jsdoc/no-undefined-types": 1,
	},
};
