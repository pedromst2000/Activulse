import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AnimatedComponent from '../../Animated';
import RareIlus from '../../../assets/svg/ilustrations/Easy.svg';
import SometimesIlus from '../../../assets/svg/ilustrations/Sometimes.svg';
import FrequentlyIlus from '../../../assets/svg/ilustrations/HardIcon.svg';
import Button from '../../Button';
import SelectCard from '../../SelectCard';

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
		<AnimatedComponent animation="SlideInFromRight">
			<View className="flex-1 justify-center items-center gap-5 w-full h-full px-4 md:px-8 lg:px-16 bg-primary-50 mb-8">
				<View>
					<Text className="font-merriweather-bold text-lg md:text-xl lg:text-2xl text-secondary-700 text-center">
						How frequently do you have stress?
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

				{/* Next Button */}
				<View className="w-full px-4 md:px-8 lg:px-16">
					<Button disabled={selectedStress === null} onPress={() => handleNext()}>
						<Text className="font-quicksand-bold text-secondary-700 text-base md:text-lg lg:text-xl text-center">
							Next
						</Text>
					</Button>
				</View>
			</View>
		</AnimatedComponent>
	);
};

export default StressSelection;
