import React, { useEffect, useState } from 'react';
import { Platform, Text, View } from 'react-native';
import AnimatedComponent from '../components/Animated';
import TopBar from '../components/TopBar';
import LearnI from '../assets/svg/icons/LearnIcon.svg';
import LeaderboardI from '../assets/svg/icons/LeaderboardIcon.svg';
import { useNavigation } from '@react-navigation/native';
import HomeCard from '../components/HomeCard';
import useHealthData from '../hooks/HealthData';

const Home: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation();
	const [date, setDate] = useState(new Date());
	const { steps } = useHealthData(date);

	// const changeDate = (numDays: number) => {
	// 	const currentDate = new Date(date); // Create a copy of the current date
	// 	// Update the date by adding/subtracting the number of days
	// 	currentDate.setDate(currentDate.getDate() + numDays);

	// 	setDate(currentDate); // Update the state variable
	// };

	useEffect(() => {
		console.log(`Android Version: ${Platform.Version}`);
	}, []);

	return (
		<AnimatedComponent animation="FadeIn">
			{/* TopBar */}
			<TopBar />
			<View className="flex-1 py-5 justify-center items-center bg-primary-50">
				{/* Track Steps & Distance*/}

				<View className="flex justify-center items-center">
					<Text className="text-2xl font-bold text-primary-700">Today's Steps</Text>
					<Text className="text-2xl font-bold text-primary-700">{steps}</Text>
				</View>

				{/* <View className="flex justify-center items-center">
					<Text className="text-2xl font-bold text-primary-700">Today's Distance</Text>
					<Text className="text-2xl font-bold text-primary-700">{distance}</Text>
				</View> */}

				{/* Home Cards Section */}
				<View className="flex justify-center items-center">
					{/* Education */}
					<HomeCard
						title="Education"
						description="Health and wellness tips to boost your heart health"
						icon={LearnI}
						onPress={() => navigation.navigate('HealthList' as never)}
					/>
					{/* Leaderboard */}
					<HomeCard
						title="Leaderboard"
						description="Meet the top 5 users excelling in cardiovascular health!"
						icon={LeaderboardI}
						onPress={() => navigation.navigate('Leaderboard' as never)}
					/>
				</View>
			</View>
		</AnimatedComponent>
	);
};

export default Home;
