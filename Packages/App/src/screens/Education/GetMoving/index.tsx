import { Text, View, Image, Linking } from 'react-native';
import AnimatedComponent from '@/src/components/Animated';
import { ScrollView } from 'react-native-gesture-handler';
import GoBackBtn from '@/src/components/GoBackBtn';
import { useNavigation } from '@react-navigation/native';
import Icon from '@/src/components/Icon';
import IntensityI from '../../../assets/svg/icons/FrequencyIcon.svg';
import TimeI from '../../../assets/svg/icons/TimeIcon.svg';
import CalendarI from '../../../assets/svg/icons/CalendarIcon.svg';

const GetMoving: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation();

	return (
		<AnimatedComponent animation="FadeIn">
			<ScrollView keyboardShouldPersistTaps="handled">
				<View className="flex-row items-center mt-10 ml-4 z-10">
					<GoBackBtn
						onPress={() => navigation.navigate('HealthList' as never)}
						isRounded={true}
					/>
					<Text className="font-merriweather-bold text-[22px] md:text-xl lg:text-2xl text-secondary-700 ml-14">
						Get Moving
					</Text>
				</View>

				<View className="flex-1 justify-center items-center px-4 py-7">
					<Image
						source={require('../../../assets/images/Education/GetMoving01.png')}
						className="w-full h-auto"
					/>
				</View>

				<View className="px-4">
					<View className="items-center mt-2 w-full">
						<Text className="font-merriweather-bold text-xl md:text-2xl lg:text-3xl text-center text-secondary-700">
							Combat sedentary lifestyle by WHO
						</Text>
					</View>

					<View className="py-2">
						<Text className="font-quicksand-medium text-secondary-700 text-sm md:text-base lg:text-lg text-justify leading-6">
							<Text className="font-quicksand-bold text-secondary-700">Adults </Text>
							should aim for at least
							<Text className="font-quicksand-bold text-secondary-700">
								{' '}
								150 to 300 minutes{' '}
							</Text>
							of{' '}
							<Text className="font-quicksand-bold text-secondary-700">
								moderate-intensity aerobic physical activity
							</Text>
							, or at least{' '}
							<Text className="font-quicksand-bold text-secondary-700">
								75 to 150 minutes{' '}
							</Text>{' '}
							of vigorous-intensity aerobic physical activity, or an equivalent combination of
							both, per week for substantial health benefits.
						</Text>
					</View>

					<View className="flex-row justify-between mt-4">
						<View className="flex-row items-center">
							<Icon icon={IntensityI} width={35} height={35} />
							<View className="flex-row ml-2">
								{[...Array(5)].map((_, index) => (
									<View
										key={index}
										className={`w-3 h-3 rounded-full mx-1 ${index < 2 ? 'bg-secondary-700' : 'bg-secondary-50'}`}
									/>
								))}
							</View>
						</View>
						<View className="flex-row items-center gap-2">
							<Icon icon={TimeI} width={22} height={22} />
							<Text className="font-quicksand-medium text-secondary-700 text-sm md:text-base lg:text-lg leading-6">
								150-300 minutes
							</Text>
						</View>
					</View>
					<View className="flex-row justify-between mt-4">
						<View className="flex-row items-center">
							<Icon icon={IntensityI} width={35} height={35} />
							<View className="flex-row ml-2">
								{[...Array(5)].map((_, index) => (
									<View
										key={index}
										className={`w-3 h-3 rounded-full mx-1 ${index < 5 ? 'bg-secondary-700' : 'bg-secondary-50'}`}
									/>
								))}
							</View>
						</View>
						<View className="flex-row items-center gap-2">
							<Icon icon={TimeI} width={22} height={22} />
							<Text className="font-quicksand-medium text-secondary-700 text-sm md:text-base lg:text-lg leading-6">
								75-150 minutes
							</Text>
						</View>
					</View>
				</View>

				<View className="flex-1 justify-center items-center px-4 py-7">
					<Image
						source={require('../../../assets/images/Education/GetMoving02.png')}
						className="w-full h-auto"
					/>
				</View>

				<View className="px-4">
					<Text className="font-quicksand-medium text-secondary-700 text-sm md:text-base lg:text-lg text-justify leading-6 py-2">
						Adults should also engage in moderate or higher intensity muscle-strengthening
						activities involving major muscle groups at least two days per week, as these
						provide additional health benefits.
					</Text>

					<View className="flex-row justify-between mt-4">
						<View className="flex-row items-center">
							<Icon icon={IntensityI} width={35} height={35} />
							<View className="flex-row ml-2">
								{[...Array(5)].map((_, index) => (
									<View
										key={index}
										className={`w-3 h-3 rounded-full mx-1 ${index < 2 ? 'bg-secondary-700' : 'bg-secondary-50'}`}
									/>
								))}
							</View>
						</View>
						<View className="flex-row items-center gap-2">
							<Icon icon={CalendarI} width={22} height={22} />
							<Text className="font-quicksand-medium text-secondary-700 text-sm md:text-base lg:text-lg leading-6">
								2 days per week
							</Text>
						</View>
					</View>
					<View className="flex-row justify-between mt-4">
						<View className="flex-row items-center">
							<Icon icon={IntensityI} width={35} height={35} />
							<View className="flex-row ml-2">
								{[...Array(5)].map((_, index) => (
									<View
										key={index}
										className={`w-3 h-3 rounded-full mx-1 ${index < 5 ? 'bg-secondary-700' : 'bg-secondary-50'}`}
									/>
								))}
							</View>
						</View>
						<View className="flex-row items-center gap-2">
							<Icon icon={CalendarI} width={22} height={22} />
							<Text className="font-quicksand-medium text-secondary-700 text-sm md:text-base lg:text-lg leading-6">
								2 days per week
							</Text>
						</View>
					</View>
				</View>

				<View className="flex-1 justify-center items-center px-4 py-7">
					<Image
						source={require('../../../assets/images/Education/GetMoving03.png')}
						className="w-full h-auto"
					/>
				</View>

				<View className="px-4">
					<Text className="font-quicksand-medium text-secondary-700 text-sm md:text-base lg:text-lg text-justify leading-6 py-2">
						Adults should also engage in moderate or higher intensity muscle-strengthening
						activities involving major muscle groups at least two days per week, as these
						provide additional health benefits.
					</Text>

					<View className="flex-row justify-between mt-4">
						<View className="flex-row items-center">
							<Icon icon={IntensityI} width={35} height={35} />
							<View className="flex-row ml-2">
								{[...Array(5)].map((_, index) => (
									<View
										key={index}
										className={`w-3 h-3 rounded-full mx-1 ${index < 2 ? 'bg-secondary-700' : 'bg-secondary-50'}`}
									/>
								))}
							</View>
						</View>
						<View className="flex-row items-center gap-2">
							<Icon icon={TimeI} width={22} height={22} />
							<Text className="font-quicksand-medium text-secondary-700 text-sm md:text-base lg:text-lg leading-6">
								+ 300 minutes
							</Text>
						</View>
					</View>
					<View className="flex-row justify-between mt-4">
						<View className="flex-row items-center">
							<Icon icon={IntensityI} width={35} height={35} />
							<View className="flex-row ml-2">
								{[...Array(5)].map((_, index) => (
									<View
										key={index}
										className={`w-3 h-3 rounded-full mx-1 ${index < 5 ? 'bg-secondary-700' : 'bg-secondary-50'}`}
									/>
								))}
							</View>
						</View>
						<View className="flex-row items-center gap-2">
							<Icon icon={TimeI} width={22} height={22} />
							<Text className="font-quicksand-medium text-secondary-700 text-sm md:text-base lg:text-lg leading-6">
								+ 150 minutes
							</Text>
						</View>
					</View>
				</View>

				<View className="flex-1 justify-center items-center px-4 py-7">
					<Image
						source={require('../../../assets/images/Education/GetMoving04.png')}
						className="w-full h-auto"
					/>
				</View>

				<View className="px-4">
					<View className="items-center mt-2 w-full">
						<Text className="font-merriweather-bold text-xl md:text-2xl lg:text-3xl text-center text-secondary-700">
							LIMIT AND REPLACE sedentary behavior time
						</Text>
					</View>

					<View className="py-2">
						<Text className="font-quicksand-medium text-secondary-700 text-sm md:text-base lg:text-lg text-justify leading-6">
							Adults should limit sedentary behavior time. Replacing sedentary time with
							physical activities of any intensity (even low intensity) provides health
							benefits.
						</Text>
					</View>
				</View>

				<View
					className="
					flex-1 justify-center items-center px-4 py-7
				"
				>
					<Text
						className="font-quicksand-medium text-secondary-700 text-base text-justify leading-6 underline"
						onPress={() =>
							Linking.openURL(
								'https://iris.who.int/bitstream/handle/10665/346252/WHO-HEP-HPR-RUN-2021.2-eng.pdf?sequence=1#page=5.46',
							)
						}
					>
						<Text className="font-quicksand-bold">1.</Text> [ENG] WHO. Physical activity Fact
						sheet.2021. Available at:
						https://iris.who.int/bitstream/handle/10665/346252/WHO-HEP-HPR-RUN-2021.2-eng.pdf?sequence=1#page=5.46
					</Text>
				</View>

				<View
					className="
					flex-1 justify-center items-center px-4 py-2
				"
				>
					<Text
						className="font-quicksand-medium text-secondary-700 text-base text-justify leading-6 underline"
						onPress={() =>
							Linking.openURL(
								'https://www.mun-setubal.pt/wp-content/uploads/2021/02/OMS-recomendacoes-exercicio-sedentarismo.pdf',
							)
						}
					>
						<Text className="font-quicksand-bold">2.</Text> [PT] OMS. Physical activity Fact
						sheet.2021. Available at:
						https://www.mun-setubal.pt/wp-content/uploads/2021/02/OMS-recomendacoes-exercicio-sedentarismo.pdf
					</Text>
				</View>
			</ScrollView>
		</AnimatedComponent>
	);
};

export default GetMoving;
