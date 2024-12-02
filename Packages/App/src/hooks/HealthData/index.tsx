import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import {Pedometer} from 'expo-sensors'
import {
	initialize,
	requestPermission,
	insertRecords,
	readRecords,
	RecordingMethod,
	DeviceType,
} from 'react-native-health-connect';

const useHealthData = (date: Date) => {
	const [steps, setSteps] = useState(0);
	
	const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
	const [pastStepCount, setPastStepCount] = useState(0);
	const [currentStepCount, setCurrentStepCount] = useState(0);

	const subscribe = async () => {
		const isAvailable = await Pedometer.isAvailableAsync();
		setIsPedometerAvailable(String(isAvailable));

		if (isAvailable) {
			const end = new Date();
			const start = new Date();
			start.setDate(end.getDate() - 1);

			const pastStepCountResult = await Pedometer.getStepCountAsync(start, end);
			if (pastStepCountResult) {
				setPastStepCount(pastStepCountResult.steps);
			}

			return Pedometer.watchStepCount((result) => {
				setCurrentStepCount(result.steps);
			});
		}
	};

	useEffect(() : void => {
		const subscription = subscribe();
		subscription.then(sub => {
			return () => {
				sub && sub.remove();
			};
		});
	}, []);

	
	
	// const [distance, setDistance] = useState(0);
	// const [lastStepTime, setLastStepTime] = useState(null);

	// Function to insert the current step count into Health Connect
	// const insertStepData = async (stepCount: number) => {
	// 	const currentTime = new Date();
	// 	const startTime = currentTime.toISOString();
	// 	const endTime = new Date(currentTime.getTime() + 1000).toISOString(); // 1 second interval

	// 	try {
	// 		await insertRecords([
	// 			{
	// 				recordType: 'Steps',
	// 				count: stepCount,
	// 				startTime: startTime,
	// 				endTime: endTime,
	// 				metadata: {
	// 					recordingMethod: RecordingMethod.RECORDING_METHOD_AUTOMATICALLY_RECORDED,
	// 					device: {
	// 						manufacturer: Platform.constants.Manufacturer,
	// 						model: Platform.constants.Model,
	// 						type: DeviceType.TYPE_PHONE,
	// 					},
	// 				},
	// 			},
	// 		]);
	// 		console.log(`Inserted ${stepCount} steps at ${startTime}`);
	// 	} catch (error) {
	// 		console.error('Error inserting step record: ', error);
	// 	}
	// };

	// // Read sample data from Health Connect (Steps and Distance)
	// const readSampleData = async () => {
	// 	const isInitialized = await initialize();
	// 	if (!isInitialized) {
	// 		return;
	// 	}

	// 	await requestPermission([
	// 		{ accessType: 'read', recordType: 'Steps' },
	// 		{ accessType: 'read', recordType: 'Distance' },
	// 	]);

	// 	const timeRangeFilter: { operator: "between"; startTime: string; endTime: string } = {
	// 		operator: "between",
	// 		startTime: new Date(date.setHours(0, 0, 0, 0)).toISOString(),
	// 		endTime: new Date(date.setHours(23, 59, 59, 999)).toISOString(),
	// 	};

	// 	// Steps data
	// 	const stepsData = await readRecords('Steps', { timeRangeFilter });
	// 	const totalSteps = stepsData.records.reduce((sum, cur) => sum + cur.count, 0);
	// 	setSteps(totalSteps);

	// 	// Distance data
	// 	const distanceData = await readRecords('Distance', { timeRangeFilter });
	// 	const totalDistance = distanceData.records.reduce(
	// 		(sum, cur) => sum + cur.distance.inMeters,
	// 		0,
	// 	);
	// 	setDistance(totalDistance);
	// };

	// useEffect(() => {
	// 	if (Platform.OS !== 'android') {
	// 		return;
	// 	}

	// 	const interval = setInterval(() => {
	// 		// For the sake of this example, we increment steps when walking
	// 		const newStepCount = steps + 1; // Increment by 1 step
	// 		setSteps(newStepCount);
	// 		insertStepData(newStepCount);
	// 	}, 1000); // Check every second

	// 	return () => {
	// 		clearInterval(interval);
	// 	};
	// }, [steps]);

	// useEffect(() => {
	// 	if (Platform.OS !== 'android') {
	// 		return;
	// 	}

	// 	readSampleData();
	// }, [date]);

	return {
		steps : currentStepCount,
		
	};
};

export default useHealthData;
