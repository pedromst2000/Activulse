import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AnimatedComponent from '../../Animated';
import useExtraAssessment from '@/src/hooks/ReactQuery/users/extraAssessment';
import RareIlus from '../../../assets/svg/ilustrations/Easy.svg';
import SometimesIlus from '../../../assets/svg/ilustrations/Sometimes.svg';
import FrequentlyIlus from '../../../assets/svg/ilustrations/HardIcon.svg';
import Ilustration from '../../Ilustration';
import Button from '../../Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BonusAssessmentStackParamList } from '@/src/navigation/BonusAssessment';
import utils from '@/src/utils';
import SelectCard from '../../SelectCard';

type FastFoodSelectionProps = {
	FastFoodState: 'Rare' | 'Sometimes' | 'Frequently' | null;
	setFastFoodState: React.Dispatch<
		React.SetStateAction<'Rare' | 'Sometimes' | 'Frequently' | null>
	>;
	stressState: 'Rare' | 'Sometimes' | 'Frequently' | null;
	KnowDietState: boolean;
};

type FastFooddNavigationProp = NativeStackNavigationProp<
	BonusAssessmentStackParamList,
	'BonusAssessment'
>;

const FastFoodSelection: React.FC<FastFoodSelectionProps> = ({
	FastFoodState,
	setFastFoodState,
	stressState,
	KnowDietState,
}): React.JSX.Element => {
	const navigation = useNavigation<FastFooddNavigationProp>();
	const [isRareSelected, setIsRareSelected] = useState<boolean>(false);
	const [isSometimesSelected, setIsSometimesSelected] = useState<boolean>(false);
	const [isFrequentlySelected, setIsFrequentlySelected] = useState<boolean>(false);
	const [showError, setShowError] = React.useState<boolean>(false);
	const [errorMessage, setErrorMessage] = React.useState<string>('');
	const timeoutRef = useRef<NodeJS.Timeout | null>(null); // Manage the timeout for the error message

	const { mutateAsync } = useExtraAssessment({
		stress: stressState,
		havesDiet: KnowDietState,
		fastFoodStatus: FastFoodState,
	});

	useEffect(() => {
		const loadSelection = async () => {
			try {
				const savedState = await AsyncStorage.getItem('FastFoodState');
				if (savedState) {
					setFastFoodState(savedState as 'Rare' | 'Sometimes' | 'Frequently');
					if (savedState === 'Rare') setIsRareSelected(true);
					if (savedState === 'Sometimes') setIsSometimesSelected(true);
					if (savedState === 'Frequently') setIsFrequentlySelected(true);
				}
			} catch (error) {
				console.error('Failed to load the selection from AsyncStorage', error);
			}
		};

		loadSelection();
	}, [setFastFoodState]);

	useEffect(() => {
		if (showError) {
			timeoutRef.current = setTimeout(() => {
				setShowError(false);
			}, 5000); // Hide the error message after 5 seconds
		}

		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [showError]);

	const handleSelection = async (selection: 'Rare' | 'Sometimes' | 'Frequently') => {
		try {
			await AsyncStorage.setItem('FastFoodState', selection);
			setFastFoodState(selection);
			setIsRareSelected(selection === 'Rare');
			setIsSometimesSelected(selection === 'Sometimes');
			setIsFrequentlySelected(selection === 'Frequently');
		} catch (error) {
			console.error('Failed to save the selection to AsyncStorage', error);
		}
	};

	const handleExtraAssessment = async (): Promise<void> => {
		try {
			const resData = await mutateAsync({
				stress: stressState,
				havesDiet: KnowDietState,
				fastFoodStatus: FastFoodState,
			});

			if (resData.success) {
				navigation.navigate('BonusOnboarding', {
					isFastFood:
						FastFoodState === 'Frequently' || FastFoodState === 'Sometimes' ? true : false,
					fastFoodState: FastFoodState,
					stressState: stressState,
				});
			}
		} catch (error: any) {
			const errorMessage = utils.error.getMessage(error);
			setErrorMessage(errorMessage);
			setShowError(true);
		}
	};

	return (
		<AnimatedComponent animation="FadeIn">
			<View className="flex-1 justify-center items-center gap-5 w-full h-full px-4 md:px-8 lg:px-16 bg-primary-50 mb-8">
				<View>
					<Text className="font-merriweather-bold text-lg md:text-xl lg:text-2xl text-secondary-700 text-center">
						How frequently do you eat junk/fast food ?
					</Text>
				</View>

				{/* Cards Container */}
				<View className="flex justify-center items-center flex-wrap flex-row px-4 gap-[20px] mr-[30px]">
					<View className="flex flex-row justify-center gap-4 w-full">
						{/* Rare Card */}

						<View>
							<SelectCard
								type="Status"
								ilustration={RareIlus}
								onPress={() => handleSelection('Rare')}
								isSelected={isRareSelected}
								label="Rare"
							/>
						</View>

						{/* Sometimes Card */}
						<View>
							<SelectCard
								type="Status"
								ilustration={SometimesIlus}
								onPress={() => handleSelection('Sometimes')}
								isSelected={isSometimesSelected}
								label="Sometimes"
							/>
						</View>
					</View>

					<View className="flex flex-row justify-center mt-4 w-full">
						{/* Frequently Card */}
						<View>
							<SelectCard
								type="Status"
								ilustration={FrequentlyIlus}
								onPress={() => handleSelection('Frequently')}
								isSelected={isFrequentlySelected}
								label="Frequently"
							/>
						</View>
					</View>
				</View>

				{/* ERROR MESSAGE */}
				{showError && (
					<AnimatedComponent animation="FadeIn">
						<View className="mb-2">
							<Text className="font-quicksand-bold text-red-500 text-xs md:text-sm lg:text-base text-center">
								{errorMessage}
							</Text>
						</View>
					</AnimatedComponent>
				)}

				{/* Next Button */}
				<View className="w-full px-4 md:px-8 lg:px-16">
					<Button
						disabled={FastFoodState === null}
						onPress={() => {
							handleExtraAssessment();
						}}
					>
						<Text className="font-quicksand-bold text-secondary-700 text-base md:text-lg lg:text-xl">
							Finish
						</Text>
					</Button>
				</View>
			</View>
		</AnimatedComponent>
	);
};

export default FastFoodSelection;
