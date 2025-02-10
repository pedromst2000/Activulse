const { getDefaultConfig } = require('expo/metro-config');

const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const { transformer, resolver } = defaultConfig;

defaultConfig.transformer = {
	...transformer,
	babelTransformerPath: require.resolve('react-native-svg-transformer/expo'),
};

defaultConfig.resolver = {
	...resolver,
	assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
	sourceExts: [...resolver.sourceExts, 'svg'],
};

module.exports = wrapWithReanimatedMetroConfig(defaultConfig);
