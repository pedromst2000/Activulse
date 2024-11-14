import { Text, TouchableOpacity, View } from 'react-native';
import AnimatedComponent from '@/src/components/Animated';
import { ScrollView } from 'react-native-gesture-handler';
import GoBackBtn from '@/src/components/GoBackBtn';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from '@/src/components/Icon';
import NoSmokeI from '../../assets/svg/icons/NoSmokeIcon.svg';
import MovingI from '../../assets/svg/icons/MovingIcon.svg';

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
						<TouchableOpacity
							activeOpacity={0.7}
							className="flex justify-center items-center shadow-lg mb-4
                                px-2 py-2 w-full
                                "
							onPress={() => navigation.navigate('QuitSmoking' as never)}
						>
							<View className="rounded-2xl py-10 shadow-lg">
								<LinearGradient
									colors={['#EFF6FF', '#F7D7BA', '#FFB875']}
									start={[0, 0]}
									end={[0, 1]}
									locations={[0, 0.5, 1]}
									style={{
										shadowColor: '#000',
										elevation: 48,
									}}
									className="rounded-[30px] p-5 justify-center items-center"
								>
									<View className="flex-row items-center">
										<View className="mr-4">
											<Icon icon={NoSmokeI} width={70} height={70} />
										</View>
										<View className="w-[180px]">
											<Text className="text-[18px] md:text-xl lg:text-2xl font-merriweather-bold text-center text-secondary-700">
												Quit Smoking for boost your health
											</Text>
										</View>
									</View>
								</LinearGradient>
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={0.7}
							className="flex justify-center items-center shadow-lg"
							onPress={() => navigation.navigate('GetMoving' as never)}
						>
							<View className="rounded-2xl py-10 shadow-lg">
								<LinearGradient
									colors={['#EFF6FF', '#F7D7BA', '#FFB875']}
									start={[0, 0]}
									end={[0, 1]}
									locations={[0, 0.5, 1]}
									style={{
										shadowColor: '#000',
										elevation: 48,
									}}
									className="rounded-[30px] p-5 justify-center items-center"
								>
									<View className="flex-row items-center">
										<View className="mr-4">
											<Icon icon={MovingI} width={70} height={70} />
										</View>
										<View className="w-[180px]">
											<Text className="text-[18px] md:text-xl lg:text-2xl font-merriweather-bold text-center text-secondary-700">
												Get Moving, Get Healthy
											</Text>
										</View>
									</View>
								</LinearGradient>
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</AnimatedComponent>
	);
};

export default HealthList;
