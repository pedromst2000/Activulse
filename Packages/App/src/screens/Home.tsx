import { Text, View } from 'react-native';
import AnimatedComponent from '../components/Animated';
import TopBar from '../components/TopBar';
import Icon from '../components/Icon';
import LearnI from '../assets/svg/icons/LearnIcon.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { MainTabParamList } from '../navigation';
import { useNavigation } from '@react-navigation/native';


const Home: React.FC = (): React.JSX.Element => {

		const navigation = useNavigation();

	return (
		<AnimatedComponent animation="FadeIn">
			<View>
				<TopBar />
			</View>
			<View className="flex-1 py-5 justify-center items-center bg-primary-50">
				<View className="flex justify-center items-center">
					<TouchableOpacity activeOpacity={0.7} className="flex justify-center items-center"
						onPress={() => 
							navigation.navigate('HealthList' as never)
						}
					>
						<View
							className="rounded-2xl  w-11/12"
							style={{
								shadowColor: '#000',
								shadowOpacity: 0.25,
								shadowRadius: 4.84,
								elevation: 48,
							}}
						>
							<LinearGradient
								colors={['#EFF6FF', '#F7D7BA', '#FFB875']}
								start={[0, 0]}
								end={[0, 1]}
								locations={[0, 0.5, 1]}
								className="rounded-[30px] p-5 justify-center items-center"
							>
								<View className="flex-row items-center">
									<View className="mr-4">
										<Icon icon={LearnI} width={70} height={70} />
									</View>
									<View className="w-[220px]">
										<Text className="text-[18px] font-merriweather-bold text-secondary-700">
											Heart Smart
										</Text>
										<Text className="text-[14px] text-secondary-700 mt-2 font-quicksand-medium">
											Empower yourself with knowledge to keep your heart healthy!
										</Text>
									</View>
								</View>
							</LinearGradient>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</AnimatedComponent>
	);
};

export default Home;
