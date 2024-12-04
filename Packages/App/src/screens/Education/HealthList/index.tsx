import { Text, View } from 'react-native';
import AnimatedComponent from '@/src/components/Animated';
import { ScrollView } from 'react-native-gesture-handler';
import GoBackBtn from '@/src/components/GoBackBtn';
import { useNavigation } from '@react-navigation/native';
import NoSmokeI from '../../../assets/svg/icons/NoSmokeIcon.svg';
import MovingI from '../../../assets/svg/icons/MovingIcon.svg';
import HomeCard from '@/src/components/HomeCard';

const HealthList: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation();
	return (
		<AnimatedComponent animation="SlideInFromRight">
			<ScrollView keyboardShouldPersistTaps="handled">
				<View className="flex-row items-center mt-10 ml-4 z-10">
					<GoBackBtn onPress={() => navigation.goBack()} isRounded={true} />
					<Text className="font-merriweather-bold text-[22px] md:text-xl lg:text-2xl text-secondary-700 ml-14">
						Health Tips
					</Text>
				</View>

				<View className="flex-1 justify-center items-center px-4 py-7">
					<View className="flex justify-center items-center">
						<View>
							<Text className="font-merriweather-bold text-lg md:text-xl lg:text-2xl text-secondary-700 text-center">
								Boost Your Heart Health
							</Text>
						</View>
						<View>
							<Text className="font-quicksand-medium text-secondary-700 text-sm md:text-base lg:text-lg w-full text-justify text-center leading-6">
								Tap on the card to more info
							</Text>
						</View>
					</View>

					<View
						className="flex justify-center items-center mt-2
                            space-y-[-60px] w-full
                        "
					>
						<HomeCard
							title="Quit Smoking"
							icon={NoSmokeI}
							onPress={() => navigation.navigate('QuitSmoking' as never)}
						/>

						<HomeCard
							title="Get Moving"
							icon={MovingI}
							onPress={() => navigation.navigate('GetMoving' as never)}
						/>
					</View>
				</View>
			</ScrollView>
		</AnimatedComponent>
	);
};

export default HealthList;
