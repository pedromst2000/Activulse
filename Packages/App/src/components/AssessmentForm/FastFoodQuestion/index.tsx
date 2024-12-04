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
import { useUserContext } from '@/src/context/user';

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
	const { loggedUser, updateUser } = useUserContext();

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
				<View className="flex justify-center items-center flex-wrap flex-row py-4 px-4 gap-[20px] mr-[30px]">
					<View className="flex flex-row justify-center gap-4 w-full">
						{/* Rare Card */}
						<TouchableOpacity activeOpacity={0.7} onPress={() => handleSelection('Rare')}>
							<View
								className={`bg-accent-100 rounded-2xl w-32 h-48 md:w-36 md:h-52 lg:w-40 lg:h-56 flex items-center justify-center mx-1 ${
									isRareSelected ? 'border-4 border-accent-700 bg-primary-50' : ''
								}`}
							>
								<Ilustration ilustration={RareIlus} width={60} height={60} />
								<View className="flex flex-col items-center justify-center bg-accent-500 rounded-2xl px-2 py-1 mt-3">
									<Text className="font-quicksand-bold text-xs md:text-sm lg:text-base text-secondary-700">
										Rare
									</Text>
								</View>
							</View>
						</TouchableOpacity>

						{/* Sometimes Card */}
						<TouchableOpacity activeOpacity={0.7} onPress={() => handleSelection('Sometimes')}>
							<View
								className={`bg-accent-100 rounded-2xl w-32 h-48 md:w-36 md:h-52 lg:w-40 lg:h-56 flex items-center justify-center mx-1 ${
									isSometimesSelected ? 'border-4 border-accent-700 bg-primary-50' : ''
								}`}
							>
								<Ilustration ilustration={SometimesIlus} width={60} height={60} />
								<View className="flex flex-col items-center justify-center bg-accent-500 rounded-2xl px-2 py-1 mt-3">
									<Text className="font-quicksand-bold text-xs md:text-sm lg:text-base text-secondary-700">
										Sometimes
									</Text>
								</View>
							</View>
						</TouchableOpacity>
					</View>

					<View className="flex flex-row justify-center mt-4 w-full">
						{/* Frequently Card */}
						<TouchableOpacity
							activeOpacity={0.7}
							onPress={() => handleSelection('Frequently')}
						>
							<View
								className={`bg-accent-100 rounded-2xl w-32 h-48 md:w-36 md:h-52 lg:w-40 lg:h-56 flex items-center justify-center mx-1 ${
									isFrequentlySelected ? 'border-4 border-accent-700 bg-primary-50' : ''
								}`}
							>
								<Ilustration ilustration={FrequentlyIlus} width={60} height={60} />
								<View className="flex flex-col items-center justify-center bg-accent-500 rounded-2xl px-2 py-1 mt-3">
									<Text className="font-quicksand-bold text-xs md:text-sm lg:text-base text-secondary-700">
										Frequently
									</Text>
								</View>
							</View>
						</TouchableOpacity>
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
				<View className="w-full">
					<Button
						disabled={FastFoodState === null}
						onPress={() => {
							handleExtraAssessment();
						}}
					>
						<Text className="font-quicksand-bold text-secondary-700 text-base">Finish</Text>
					</Button>
				</View>
			</View>
		</AnimatedComponent>
	);
};

export default FastFoodSelection;
