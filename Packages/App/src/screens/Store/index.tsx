import { useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AnimatedComponent from '@/src/components/Animated';
import TopBar from '@/src/components/TopBar';
import TopBarNav from '@/src/components/TopBar/Nav';
import LeaderboardBtn from '@/src/components/LeaderboardBtn';
import SelectPremiumLayout from '@/src/components/Layout/SelectPremium';
import BannersLayout from '@/src/components/Layout/Banners';

const Store: React.FC = (): React.JSX.Element => {
	const [selectedTopBarOpt, setSelectedTopBarOpt] = useState<'Premium' | 'Banners'>('Premium');
	const navigation = useNavigation();

	/**
	 * TODO:
	 * 4. Fix Glitch Bug of Modal Showing unecessary!
	 * Fix blank screen while fetching data after showing the loading skeleton and the data is not yet fetched
	 */

	return (
		<AnimatedComponent animation="FadeIn">
			<TopBar />
			<TopBarNav
				items={['Premium', 'Banners']}
				setSelectedTopBarOpt={setSelectedTopBarOpt}
				selectedTopBarOpt={selectedTopBarOpt}
			/>

			{/* Store Layout */}

			<AnimatedComponent animation="FadeIn">
				{selectedTopBarOpt === 'Premium' ? (
					<SelectPremiumLayout navigation={navigation} />
				) : (
					<BannersLayout />
				)}
			</AnimatedComponent>

			{/* Leaderboard Button */}
			<View className="absolute bottom-6 right-4 md:bottom-20 md:right-8">
				<LeaderboardBtn onPress={() => navigation.navigate('Leaderboard' as never)} />
			</View>
		</AnimatedComponent>
	);
};

export default Store;
