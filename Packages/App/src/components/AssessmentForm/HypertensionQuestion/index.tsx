import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AnimatedComponent from '../../Animated';
import Ilustration from '../../Ilustration';
import HypertensionIlus from '../../../assets/svg/ilustrations/heartRiskAssessment/TreatmentHypertension.svg';
import LastSlideButton from '../../Onboarding/LastSlideBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';

type HypertensionQuestionProps = {
	isHypertensive: boolean;
	setIsHypertensive: React.Dispatch<React.SetStateAction<boolean>>;
	handleNext: () => void;
};

const HypertensionQuestion: React.FC<HypertensionQuestionProps> = ({
	isHypertensive,
	setIsHypertensive,
	handleNext,
}): React.JSX.Element => {
	const [isYesSelected, setIsYesSelected] = useState<boolean>(false);
	const [isNoSelected, setIsNoSelected] = useState<boolean>(false);

	useEffect(() => {
		const loadHypertensionSelection = async () => {
			try {
				const savedSelection = await AsyncStorage.getItem('selectedHypertension');
				if (savedSelection) {
					setIsHypertensive(savedSelection === 'Yes');
					setIsYesSelected(savedSelection === 'Yes');
					setIsNoSelected(savedSelection === 'No');
				}
			} catch (error) {
				console.error('Failed to load hypertension selection', error);
			}
		};

		loadHypertensionSelection();
	}, [setIsHypertensive]);

	const handleHypertensionSelection = async (hypertension: 'Yes' | 'No') => {
		try {
			await AsyncStorage.setItem('selectedHypertension', hypertension);
			setIsHypertensive(hypertension === 'Yes');
			setIsYesSelected(hypertension === 'Yes');
			setIsNoSelected(hypertension === 'No');
		} catch (error) {
			console.error('Failed to save hypertension selection', error);
		}
	};

	return (
		<AnimatedComponent
			animation="SlideInFromRight"
			className="flex justify-center items-center p-4 bg-primary-50"
		>
			<View className="flex justify-center items-center p-4">
				<View className="mb-2">
					<Text className="font-merriweather-bold text-xl md:text-2xl lg:text-3xl text-secondary-700 text-center">
						Treatment for hypertension ?
					</Text>
				</View>
				<View className="mb-2">
					<Ilustration
						ilustration={HypertensionIlus}
						styleClass="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96"
					/>
				</View>

				<View className="w-full mb-4 mt-4 flex flex-row justify-around">
					<LastSlideButton
						text="Yes"
						onPress={() => {
							setIsHypertensive(true);
							handleHypertensionSelection('Yes');
							handleNext();
						}}
						className={
							isYesSelected
								? 'bg-accent-500 flex-1 mx-1'
								: 'bg-primary-50 border-[3px] border-accent-500 flex-1 mx-2'
						}
					/>
					<LastSlideButton
						text="No"
						onPress={() => {
							setIsHypertensive(false);
							handleHypertensionSelection('No');
							handleNext();
						}}
						className={
							isNoSelected
								? 'bg-accent-500 flex-1 mx-1'
								: 'bg-primary-50 border-[3px] border-accent-500 flex-1 mx-2'
						}
					/>
				</View>
			</View>
		</AnimatedComponent>
	);
};

export default HypertensionQuestion;
