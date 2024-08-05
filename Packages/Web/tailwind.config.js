/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"primary-50": "#EFF6FF",
				"secondary-50": "#73B6FF",
				"secondary-100": "#5595E7",
				"secondary-500": "#2254B5",
				"secondary-700": "#0C2C7E",
				"accent-100": "#FFDAB9",
				"accent-300": "#FFC997",
				"accent-500": "#FFB875",
				"accent-700": "#FFA653",
			},
		},
	},
	plugins: [],
};
