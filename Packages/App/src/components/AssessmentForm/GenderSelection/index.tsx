// src/components/Onboarding/GenderSelection.tsx
import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import AnimatedComponent from '../../Animated';
import MaleIlus from '../../../assets/svg/ilustrations/heartRiskAssessment/maleGender.svg';
import FemaleIlus from '../../../assets/svg/ilustrations/heartRiskAssessment/femaleGender.svg';
import Ilustration from '../../Ilustration';
import Button from '../../Button';

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

	return (
		<AnimatedComponent animation="FadeIn">
			<View className="flex-1 justify-center items-center gap-5 w-full h-full px-4 md:px-8 lg:px-16 bg-primary-50">
				<View>
					<Text className="font-merriweather-bold text-xl md:text-2xl lg:text-3xl text-secondary-700 text-center">
						Let us know who you are ?
					</Text>
				</View>
				<View className="flex  justify-center items-center flex-wrap">
					<View
						className="flex  justify-center items-center
				flex-wrap gap-5  px-4 md:px-8 lg:px-16
"
					>
						<TouchableOpacity
							activeOpacity={0.7}
							onPress={() => {
								setIsMaleSelected(true);
								setIsFemaleSelected(false);
								setSelectedGender('Male');
							}}
						>
							<View
								className={`bg-accent-100 rounded-2xl w-40 h-60 md:w-44 md:h-64 lg:w-48 lg:h-72 flex items-center justify-center mx-2 ${
									isMaleSelected ? 'border-4 border-accent-700' : ''
								}`}
							>
								<Ilustration ilustration={MaleIlus} width={160} height={160} />
								<View
									className="flex flex-col items-center justify-center bg-accent-500 rounded-2xl px-4 py-1
								mt-4
							"
								>
									<Text className="font-quicksand-bold text-sm md:text-base lg:text-lg text-secondary-700">
										Male
									</Text>
								</View>
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={0.7}
							onPress={() => {
								setIsMaleSelected(false);
								setIsFemaleSelected(true);
								setSelectedGender('Female');
							}}
						>
							<View
								className={`bg-accent-100 rounded-2xl w-40 h-60 md:w-44 md:h-64 lg:w-48 lg:h-72 flex items-center justify-center mx-2 ${
									isFemaleSelected ? 'border-4 border-accent-700' : ''
								}`}
							>
								<Ilustration ilustration={FemaleIlus} width={160} height={160} />
								<View className="flex flex-col items-center justify-center bg-accent-500 rounded-2xl px-4 py-1 mt-4">
									<Text className="font-quicksand-bold text-sm md:text-base lg:text-lg text-secondary-700">
										Female
									</Text>
								</View>
							</View>
						</TouchableOpacity>
					</View>
				</View>
				<View>
					<Button disabled={selectedGender === null} onPress={() => handleNext()}>
						<Text className="font-quicksand-bold text-secondary-700 text-base">Next</Text>
					</Button>
				</View>
			</View>
		</AnimatedComponent>
	);
};

export default GenderSelection;
