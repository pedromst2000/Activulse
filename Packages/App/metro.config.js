const { getDefaultConfig } = require('expo/metro-config');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

module.exports = (() => {
	// Get the default Expo Metro configuration
	const config = getDefaultConfig(__dirname);

	const { transformer, resolver } = config;

	// Modify the transformer and resolver to support SVG
	config.transformer = {
		...transformer,
		babelTransformerPath: require.resolve('react-native-svg-transformer/expo'),
	};
	config.resolver = {
		...resolver,
		assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
		sourceExts: [...resolver.sourceExts, 'svg'],
	};

	// Wrap the modified configuration with Reanimated Metro config
	return wrapWithReanimatedMetroConfig(config);
})();
