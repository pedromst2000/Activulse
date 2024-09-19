import { Text, View , Image, Linking } from 'react-native';
import AnimatedComponent from '@/src/components/Animated';
import { ScrollView } from 'react-native-gesture-handler';
import GoBackBtn from '@/src/components/GoBackBtn';
import { useNavigation } from '@react-navigation/native';
import Icon from '@/src/components/Icon';
import AppI from '../../assets/svg/ilustrations/Icon.svg';

const QuitSmoking: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation();

	return (
		<AnimatedComponent animation="FadeIn">
			<ScrollView keyboardShouldPersistTaps="handled">
				<View className="flex-row items-center mt-10 ml-4 z-10">
					<GoBackBtn onPress={() => navigation.navigate('HealthList' as never)} isRounded={true} />
					<Text className="font-merriweather-bold text-[22px] md:text-xl lg:text-2xl text-secondary-700 ml-14">
						Quit Smoking
					</Text>
				</View>
				<View className="flex-1 justify-center items-center px-4 py-7">
					<Image
						source={require('../../assets/images/Education/QuitSmoking.png')}
						className="w-full h-auto"
					/>
				</View>
				<View className="px-4">
					<View>
						<Text className="font-quicksand-medium text-secondary-700 text-sm md:text-base lg:text-lg text-justify leading-6 py-2">
							<Text className="font-quicksand-bold text-secondary-700">Quitting smoking </Text>
							drastically improves your health, cutting heart disease risks significantly. Did
							you know that stopping smoking reduces hospital admissions by 44% and mortality
							by 36% for heart patients? Within just 30 minutes, your heart rate starts to
							drop. One year smoke-free cuts your{' '}
							<Text className="font-quicksand-bold text-secondary-700">heart disease </Text>
							risk in half, and in 15 years, it’s like you never smoked! Get support
							now—medication and psychological help can make a huge difference. Start today for
							a healthier heart tomorrow!
						</Text>
					</View>
					<View className="flex flex-col justify-center items-center mt-2">
						<View>
							<Text className="font-merriweather-bold text-lg md:text-xl text-secondary-700 text-center">
								Tips
							</Text>
							<View className="border-b-2 border-secondary-700 w-56 mt-2 mx-auto"></View>
						</View>
						{[
							{
								title: 'Know the Benefits',
								text: 'Understand that quitting smoking reduces heart disease risk significantly. Just 30 minutes after your last cigarette, your heart rate begins to lower.',
							},
							{
								title: 'Set a Date',
								text: 'Choose a quit date and stick to it. Mark it on your calendar and prepare yourself mentally.',
							},
							{
								title: 'Seek Support',
								text: 'Use both medication and psychological support to help you quit. This combination increases your chances of success.',
							},
							{
								title: 'Stay Active',
								text: 'Engage in physical activities to combat cravings and reduce stress.',
							},
							{
								title: 'Avoid Triggers',
								text: 'Identify and avoid situations that tempt you to smoke.',
							},
							{
								title: 'Celebrate Milestones',
								text: 'Reward yourself for staying smoke-free. Each day smoke-free is a step toward a healthier heart.',
							},
						].map((tip, index) => (
							<View
								key={index}
								className="flex flex-col w-full px-4 py-6 sm:px-8 sm:py-4 gap-2 items-center"
							>
								<View className="flex flex-row gap-2 justify-center items-center">
									<Icon icon={AppI} width={25} height={25} />
									<Text className="font-merriweather-bold text-secondary-700 text-base md:text-lg tracking-wide">
										{tip.title}
									</Text>
								</View>
								<Text className="font-quicksand-medium text-secondary-700 text-sm md:text-base text-justify leading-6">
									{tip.text}
								</Text>
							</View>
						))}
					</View>

					<View className="flex flex-col mt-[-10px]">
						<View className="mb-5 mt-6">
							<Text
								className="font-quicksand-medium text-secondary-700 text-[15px] w-full text-justify leading-6 underline"
								onPress={() =>
									Linking.openURL(
										'https://www.ahajournals.org/doi/10.1161/circulationaha.107.699579#d1e386',
									)
								}
							>
								<Text className="font-quicksand-bold">1.</Text> D'Agostino RB, Vasan RS,
								Pencina MJ, et al. General cardiovascular risk profile for use in primary care:
								the Framingham Heart Study. Circulation. 2008;117(6):743-753.
							</Text>
						</View>

						<View className="mb-5 mt-2">
							<Text
								className="font-quicksand-medium text-secondary-700 text-[15px] w-full text-justify leading-6 underline"
								onPress={() =>
									Linking.openURL(
										'https://www.thieme-connect.de/products/ejournals/abstract/10.1055/s-0044-1782528',
									)
								}
							>
								<Text className="font-quicksand-bold">2.</Text> Sharifi. N., Najafi. A. et al.
								Ten-Year Cardiovascular Risk Estimation through the Framingham Risk Score among
								Commercial Motor Vehicle Drivers with High and Low Risk of Obstructive Sleep
								Apnea. Sleep Science. 2024; DOI: 10.1055/s-0044-1782528
							</Text>
						</View>

						<View className="mt-2">
							<Text
								className="font-quicksand-medium text-secondary-700 text-[15px] w-full text-justify leading-6 underline"
								onPress={() =>
									Linking.openURL(
										'https://qxmd.com/calculate/calculator_252/framingham-risk-score-2008',
									)
								}
							>
								<Text className="font-quicksand-bold">
									3. {''}
									<Text className="font-quicksand-medium">
										QxMD. Framingham Risk Score. QxMD FRS Calculator. 2008
									</Text>
								</Text>
							</Text>
						</View>
					</View>
				</View>
			</ScrollView>
		</AnimatedComponent>
	);
};

export default QuitSmoking;
