import { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LifestyleStackParamList } from '@/src/navigation/Lifestyle';
import AnimatedComponent from '../../../../components/Animated';
import ScreenTitle from '@/src/components/ScreenTitle';
import SelectCard from '@/src/components/SelectCard';
import LightIlus from '../../../../assets/svg/ilustrations/Easy.svg';
import ModerateIlus from '../../../../assets/svg/ilustrations/Sometimes.svg';
import VigorousIlus from '../../../../assets/svg/ilustrations/HardIcon.svg';
import Button from '@/src/components/Button';

type IntensityFilterNavigationProp = NativeStackNavigationProp<
	LifestyleStackParamList,
	'IntensityFilter'
>;

const IntensityFilter: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation<IntensityFilterNavigationProp>();
	const [isLightSelected, setIsLightSelected] = useState<boolean>(false);
	const [isModerateSelected, setIsModerateSelected] = useState<boolean>(false);
	const [isVigorousSelected, setIsVigorousSelected] = useState<boolean>(false);
	const [intensity, setIntensity] = useState<'Light' | 'Moderate' | 'Vigorous' | null>(null);

	const handleSelection = (selection: 'Light' | 'Moderate' | 'Vigorous') => {
		setIntensity(selection);
		setIsLightSelected(selection === 'Light');
		setIsModerateSelected(selection === 'Moderate');
		setIsVigorousSelected(selection === 'Vigorous');
	};

	return (
		<AnimatedComponent animation="SlideInFromRight">
			<ScrollView
				showsVerticalScrollIndicator={false}
				keyboardShouldPersistTaps="handled"
				className="flex-1 bg-primary-50"
			>
				<ScreenTitle
					label="Intensity Filter"
					onPress={() => navigation.goBack()}
					onFilterBtnPress={() => navigation.navigate('IntensityFilter')}
				/>
				<View className="flex-1 mt-2 pb-10 sm:pb-12 md:pb-14 lg:pb-16">
					<View className="mt-4 mb-6 px-2 sm:px-4 md:px-6 lg:px-8">
						<Text
							className="text-[14.22px] 
								sm:text-[16.22px] md:text-[18.22px] lg:text-[20.22px] 
							text-secondary-700 font-quicksand-medium
			  leading-[24px] sm:leading-[26px] md:leading-[28px] lg:leading-[30px] text-center tracking-[0.8px]
				w-10/12 sm:w-9/12 md:w-8/12 lg:w-7/12 mx-auto 
			  "
						>
							Filter your activities by intensity
						</Text>
						<Text
							className="text-[14.22px] 
								sm:text-[16.22px] md:text-[18.22px] lg:text-[20.22px]
							text-secondary-700 font-quicksand-bold
			  leading-[22px] sm:leading-[24px] md:leading-[26px] lg:leading-[28px] text-center tracking-[0.8px] mt-2
			  "
						>
							Select one
						</Text>
					</View>
					{/* Cards Container */}
					<View className="flex justify-center items-center flex-wrap flex-row px-4 gap-[20px] mr-[30px]">
						<View className="flex flex-row justify-center gap-4 w-full">
							{/* Light Card */}

							<View>
								<SelectCard
									type="Filter"
									ilustration={LightIlus}
									onPress={() => handleSelection('Light')}
									isSelected={isLightSelected}
									label="Light"
									intensity={1}
								/>
							</View>

							{/* Moderate Card */}
							<View className="w-5/12 sm:w-4/12 md:w-3/12 lg:w-2/12">
								<SelectCard
									type="Filter"
									ilustration={ModerateIlus}
									onPress={() => handleSelection('Moderate')}
									isSelected={isModerateSelected}
									label="Moderate"
									intensity={2}
								/>
							</View>
						</View>

						<View className="flex flex-row justify-center mt-4 w-full">
							{/* Vigorous Card */}
							<View className="w-5/12 sm:w-4/12 md:w-3/12 lg:w-2/12">
								<SelectCard
									type="Filter"
									ilustration={VigorousIlus}
									onPress={() => handleSelection('Vigorous')}
									isSelected={isVigorousSelected}
									label="Vigorous"
									intensity={5}
								/>
							</View>
						</View>
					</View>
					{/* Options Filter */}
					<View className="flex flex-row justify-center items-center pt-8 sm:pt-10 md:pt-12 lg:pt-14">
						<Button
							disabled={intensity === null}
							onPress={() => navigation.navigate('FitnessFeed', { intensity: intensity })}
						>
							<Text className="font-quicksand-bold text-secondary-700 text-base">
								Apply Filter
							</Text>
						</Button>
					</View>
				</View>
			</ScrollView>
		</AnimatedComponent>
	);
};

export default IntensityFilter;
