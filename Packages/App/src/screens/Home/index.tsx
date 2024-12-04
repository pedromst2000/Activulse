import { Text, View } from 'react-native';
import AnimatedComponent from '../../components/Animated';
import TopBar from '../../components/TopBar';
import LearnI from '../../assets/svg/icons/LearnIcon.svg';
import LeaderboardI from '../../assets/svg/icons/LeaderboardIcon.svg';
import { useNavigation } from '@react-navigation/native';
import HomeCard from '../../components/HomeCard';

const Home: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation();

	return (
		<AnimatedComponent animation="FadeIn">
			{/* TopBar */}
			<TopBar />
			<View className="flex-1 py-5 justify-center items-center bg-primary-50">
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
