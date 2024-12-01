const { withAndroidManifest } = require('@expo/config-plugins');

module.exports = function androidManifestPlugin(config) {
	return withAndroidManifest(config, async (config) => {
		let androidManifest = config.modResults.manifest;
		const mainActivity = androidManifest.application[0].activity[0];
		const intentFilterExists = mainActivity['intent-filter'].some((intentFilter) =>
			intentFilter.action.some(
				(action) => action['$']['android:name'] === 'androidx.health.ACTION_SHOW_PERMISSIONS_RATIONALE',
			)
		);

		if (!intentFilterExists) {
			mainActivity['intent-filter'].push({
				action: [
					{
						$: {
							'android:name': 'androidx.health.ACTION_SHOW_PERMISSIONS_RATIONALE',
						},
					},
				],
			});
		} else {
			// Removing duplicate intent-filters
			mainActivity['intent-filter'] = mainActivity['intent-filter'].filter((intentFilter, index, self) => {
				if (intentFilter.action.some((action) => action['$']['android:name'] === 'androidx.health.ACTION_SHOW_PERMISSIONS_RATIONALE')) {
					return index === self.findIndex((t) =>
						t.action.some(
							(action) => action['$']['android:name'] === 'androidx.health.ACTION_SHOW_PERMISSIONS_RATIONALE',
						)
					);
				}
				return true;
			});
		}

		return config;
	});
};
