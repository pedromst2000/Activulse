import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import utils from '@/src/utils';
import AnimatedComponent from '../../Animated';
import MaleIlus from '../../../assets/svg/ilustrations/heartRiskAssessment/maleGender.svg';
import FemaleIlus from '../../../assets/svg/ilustrations/heartRiskAssessment/femaleGender.svg';
import Button from '../../Button';
import SelectCard from '../../SelectCard';

type GenderSelectionProps = {
	selectedGender: 'Male' | 'Female' | null;
	setSelectedGender: React.Dispatch<React.SetStateAction<'Male' | 'Female' | null>>;
	handleNext: () => void;
};

const GenderSelection: React.FC<GenderSelectionProps> = ({
	selectedGender,
	setSelectedGender,
	handleNext,
}): React.JSX.Element => {
	const [isMaleSelected, setIsMaleSelected] = useState<boolean>(false);
	const [isFemaleSelected, setIsFemaleSelected] = useState<boolean>(false);

	useEffect(() => {
		const loadGenderSelection = async () => {
			try {
				const savedGender = await utils.storage.getItem('selectedGender');
				if (savedGender) {
					setSelectedGender(savedGender as 'Male' | 'Female');
					setIsMaleSelected(savedGender === 'Male');
					setIsFemaleSelected(savedGender === 'Female');
				}
			} catch (error) {
				console.error('Failed to load gender selection', error);
			}
		};

		loadGenderSelection();
	}, [setSelectedGender]);

	const handleGenderSelection = async (gender: 'Male' | 'Female') => {
		try {
			await utils.storage.setItem('selectedGender', gender);
			setSelectedGender(gender);
			setIsMaleSelected(gender === 'Male');
			setIsFemaleSelected(gender === 'Female');
		} catch (error) {
			console.error('Failed to save gender selection', error);
		}
	};

	return (
		<AnimatedComponent animation="SlideInFromRight">
			<View className="flex-1 justify-center items-center gap-5 w-full h-full px-4 md:px-8 lg:px-16 bg-primary-50 mb-8">
				<View className="mb-[-20px] sm:mb-[-30px] md:mb-[-40px] lg:mb-[-50px] sm:w-40 sm:h-40 md:w-44 md:h-44 lg:w-48 lg:h-48">
					<Text className="font-merriweather-bold text-xl md:text-2xl lg:text-3xl text-secondary-700 text-center">
						Let us know who you are ?
					</Text>
				</View>
				<View className="flex justify-center items-center flex-wrap gap-5 px-4 md:px-8 lg:px-16">
					<View>
						<SelectCard
							type="Status"
							ilustration={MaleIlus}
							onPress={() => handleGenderSelection('Male')}
							isSelected={isMaleSelected}
							label="Male"
							CardDimensionsStyle="w-36 h-56 sm:w-40 sm:h-60 md:w-44 md:h-64 lg:w-48 lg:h-72"
							ilustrationStyle="w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 lg:w-48 lg:h-48"
							labelStyle="px-4 py-1 mt-4"
							labelSize="text-sm sm:text-base md:text-lg lg:text-xl"
						/>
					</View>

					<View>
						<SelectCard
							type="Status"
							ilustration={FemaleIlus}
							onPress={() => handleGenderSelection('Female')}
							isSelected={isFemaleSelected}
							label="Female"
							CardDimensionsStyle="w-36 h-56 sm:w-40 sm:h-60 md:w-44 md:h-64 lg:w-48 lg:h-72"
							ilustrationStyle="w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 lg:w-48 lg:h-48"
							labelStyle="px-4 py-1 mt-4"
							labelSize="text-sm sm:text-base md:text-lg lg:text-xl"
						/>
					</View>
				</View>
				<View className="w-full flex justify-center items-center mt-8">
					<Button disabled={selectedGender === null} onPress={() => handleNext()}>
						<Text className="font-quicksand-bold text-secondary-700 text-base sm:text-lg md:text-xl lg:text-2xl">
							Next
						</Text>
					</Button>
				</View>
			</View>
		</AnimatedComponent>
	);
};

export default GenderSelection;
