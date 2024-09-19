import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AnimatedComponent from '../../Animated';
import RareIlus from '../../../assets/svg/ilustrations/Easy.svg';
import SometimesIlus from '../../../assets/svg/ilustrations/Sometimes.svg';
import FrequentlyIlus from '../../../assets/svg/ilustrations/HardIcon.svg';
import Ilustration from '../../Ilustration';
import Button from '../../Button';

type StressSelectionProps = {
	selectedStress: 'Rare' | 'Sometimes' | 'Frequently' | null;
	setSelectedStress: React.Dispatch<
		React.SetStateAction<'Rare' | 'Sometimes' | 'Frequently' | null>
	>;
	handleNext: () => void;
};

const StressSelection: React.FC<StressSelectionProps> = ({
	selectedStress,
	setSelectedStress,
	handleNext,
}): React.JSX.Element => {
	const [isRareSelected, setIsRareSelected] = useState<boolean>(false);
	const [isSometimesSelected, setIsSometimesSelected] = useState<boolean>(false);
	const [isFrequentlySelected, setIsFrequentlySelected] = useState<boolean>(false);

	useEffect(() => {
		const loadSelection = async () => {
			try {
				const savedSelection = await AsyncStorage.getItem('selectedStress');
				if (savedSelection) {
					setSelectedStress(savedSelection as 'Rare' | 'Sometimes' | 'Frequently');
					if (savedSelection === 'Rare') setIsRareSelected(true);
					if (savedSelection === 'Sometimes') setIsSometimesSelected(true);
					if (savedSelection === 'Frequently') setIsFrequentlySelected(true);
				}
			} catch (error) {
				console.error('Failed to load the selection from AsyncStorage', error);
			}
		};

		loadSelection();
	}, [setSelectedStress]);

	const handleSelection = async (selection: 'Rare' | 'Sometimes' | 'Frequently') => {
		try {
			await AsyncStorage.setItem('selectedStress', selection);
			setSelectedStress(selection);
			setIsRareSelected(selection === 'Rare');
			setIsSometimesSelected(selection === 'Sometimes');
			setIsFrequentlySelected(selection === 'Frequently');
		} catch (error) {
			console.error('Failed to save the selection to AsyncStorage', error);
		}
	};

	return (
		<AnimatedComponent animation="FadeIn">
			<View className="flex-1 justify-center items-center gap-5 w-full h-full px-4 md:px-8 lg:px-16 bg-primary-50">
				<View>
					<Text className="font-merriweather-bold text-lg md:text-xl lg:text-2xl text-secondary-700 text-center">
						How frequently do you have stress?
					</Text>
				</View>

				{/* Cards Container */}
				<View className="flex justify-center items-center flex-wrap flex-row py-4 px-4 gap-[20px] mr-[30px]">
					<View className="flex flex-row justify-center gap-4 w-full">
						{/* Rare Card */}
						<TouchableOpacity activeOpacity={0.7} onPress={() => handleSelection('Rare')}>
							<View
								className={`bg-accent-100 rounded-2xl w-32 h-48 md:w-36 md:h-52 lg:w-40 lg:h-56 flex items-center justify-center mx-1 ${
									isRareSelected ? 'border-4 border-accent-700 bg-primary-50 ' : ''
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

				{/* Next Button */}
				<View className="w-full">
					<Button disabled={selectedStress === null} onPress={() => handleNext()}>
						<Text className="font-quicksand-bold text-secondary-700 text-base">Next</Text>
					</Button>
				</View>
			</View>
		</AnimatedComponent>
	);
};

export default StressSelection;
