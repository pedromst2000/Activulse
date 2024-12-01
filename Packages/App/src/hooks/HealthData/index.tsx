/**
 * This file contains a custom React hook `useHealthData` that tracks health data such as steps, flights climbed, and distance walked/running.
 *
 * The hook supports only Android platform:
 *
 * - **Android**: Utilizes Health Connect to fetch health data. It initializes the Health Connect client, requests necessary permissions, and retrieves the data.
 *
 * The hook returns an object containing the number of steps and distance walked/running for the given date.
 *
 * @param {Date} date - The date for which to fetch the health data.
 * @returns {Object} An object containing the steps, flights climbed, and distance walked/running.
 */

import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { initialize, requestPermission, readRecords } from 'react-native-health-connect';

const useHealthData = (date: Date) => {
	const [steps, setSteps] = useState(0);
	const [distance, setDistance] = useState(0);

	// Android - Health Connect
	const readSampleData = async () => {
		try {
			console.log('Initializing Health Connect...');
			const isInitialized = await initialize();
			if (!isInitialized) {
				console.error('Health Connect initialization failed.');
				return;
			}
			console.log('Health Connect initialized.');

			console.log('Requesting permissions...');
			const permissionsGranted = await requestPermission([
				{ accessType: 'read', recordType: 'Steps' },
				{ accessType: 'read', recordType: 'Distance' },
			]);

			if (!permissionsGranted) {
				console.error('Permissions were not granted for Health Connect.');
				return;
			}
			console.log('Permissions granted.');
		} catch (error) {
			console.error('Error during Health Connect permissions request:', error);
		}
	};

	useEffect(() => {
		if (Platform.OS !== 'android') {
			return;
		}
		readSampleData();
	}, [date]);

	return {
		steps,
		distance,
	};
};

export default useHealthData;
