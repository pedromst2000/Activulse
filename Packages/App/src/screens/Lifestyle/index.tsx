import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LifestyleStackParamList } from '@/src/navigation/Lifestyle';
import AnimatedComponent from '@/src/components/Animated';
import { useUserContext } from '@/src/context/user';
import TopBar from '@/src/components/TopBar';
import OptionCard from '@/src/components/OptionCard';
import LeaderboardBtn from '@/src/components/LeaderboardBtn';

type LifestyleNavigationProp = NativeStackNavigationProp<
	LifestyleStackParamList,
	'NutritionFeed'
>;

const Lifestyle: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation<LifestyleNavigationProp>();
	const { loggedUser } = useUserContext();

	return (
		<AnimatedComponent animation="FadeIn">
			<TopBar />
			<ScrollView
				keyboardShouldPersistTaps="handled"
				showsVerticalScrollIndicator={false}
				className="flex-1 bg-primary-50"
			>
				<View className="w-full flex-1 bg-primary-50 px-4 mb-4">
					{/* Title & Subtitle */}
					<View className="mt-8 mb-6">
						<Text
							className="text-[22px] sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] text-secondary-700 font-merriweather-bold
			  leading-[24px] sm:leading-[26px] md:leading-[28px] lg:leading-[30px] xl:leading-[32px] text-center tracking-[0.8px]"
						>
							Ready to Change Your Lifestyle
						</Text>
						<Text
							className="text-[14px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] text-secondary-700 font-quicksand-medium
			  leading-[22px] sm:leading-[24px] md:leading-[26px] lg:leading-[28px] xl:leading-[30px] text-center tracking-[0.8px] mt-2"
						>
							Select your preference section
						</Text>
					</View>

					{/* Cards */}
					<View className="flex flex-col items-center space-y-4">
						{/* Fitness Card */}
						<OptionCard
							label="Fitness"
							description="Elevate your fitness game and discover tailored workouts to boost your cardio health."
							sourceImg={require('../../assets/images/Fitness.png')}
							onPress={() => navigation.navigate('FitnessFeed' as never)}
						/>

						{/* Nutrition Card */}
						<OptionCard
							label="Nutrition"
							description="Discover the best diet plan for you and get access to personalized meal plans."
							sourceImg={require('../../assets/images/Nutrition.png')}
							onPress={() =>
								loggedUser?.diet === 'Unknown'
									? navigation.navigate('SelectFeed' as never)
									: navigation.navigate('NutritionFeed', { diet: loggedUser?.diet } as never)
							}
						/>
					</View>
				</View>
			</ScrollView>
			{/* Leaderboard Button */}
			<View className="absolute bottom-6 right-4 md:bottom-20 md:right-8">
				<LeaderboardBtn onPress={() => navigation.navigate('Leaderboard' as never)} />
			</View>
		</AnimatedComponent>
	);
};

export default Lifestyle;
