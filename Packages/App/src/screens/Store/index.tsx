import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AnimatedComponent from '@/src/components/Animated';
import TopBar from '@/src/components/TopBar';
import TopBarNav from '@/src/components/TopBar/Nav';
import LeaderboardBtn from '@/src/components/LeaderboardBtn';
import { ScrollView } from 'react-native-gesture-handler';
import OptionCard from '@/src/components/OptionCard';

/**
 * TODO
 * - Add two Cards for selecting Fitness and Nutrition Premium Feeds
 */

const Store: React.FC = (): React.JSX.Element => {
	const [selectedTopBarOpt, setSelectedTopBarOpt] = useState<'Premium' | 'Banners'>('Premium');
	const navigation = useNavigation();

	useEffect(() => {
		console.log(`selectedTopBarOpt: ${selectedTopBarOpt}`);
	}, [selectedTopBarOpt]);

	return (
		<AnimatedComponent animation="FadeIn">
			<TopBar />
			<TopBarNav
				items={['Premium', 'Banners']}
				setSelectedTopBarOpt={setSelectedTopBarOpt}
				selectedTopBarOpt={selectedTopBarOpt}
			/>
			<ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
				{/* Layout Select Feed Cards */}
				<View className="w-full flex-1 bg-primary-50 px-4 mb-4">
					{/* Title & Subtitle */}
					<View className="mt-8 mb-6">
						<Text
							className="text-[22px] sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] text-secondary-700 font-merriweather-bold
			  leading-[24px] sm:leading-[26px] md:leading-[28px] lg:leading-[30px] xl:leading-[32px] text-center tracking-[0.8px]"
						>
							Premium Lifestyle Choices
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
							description="Unlock exclusive activities to elevate your fitness journey designed to boost your cardio health."
							sourceImg={require('../../assets/images/StoreFitness.png')}
							onPress={() => console.log('Fitness Card Pressed' as never)}
						/>

						{/* Nutrition Card */}
						<OptionCard
							label="Nutrition"
							description="Unlock exclusive recipes crafted to nourish your body and support your heart health."
							sourceImg={require('../../assets/images/StoreNutrition.png')}
							onPress={() => console.log('Nutrition Card Pressed' as never)}
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

export default Store;
