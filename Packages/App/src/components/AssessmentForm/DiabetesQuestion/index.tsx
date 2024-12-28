import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import utils from '@/src/utils';
import AnimatedComponent from '../../Animated';
import Ilustration from '../../Ilustration';
import DiabetesIlus from '../../../assets/svg/ilustrations/heartRiskAssessment/Diabetes.svg';
import LastSlideButton from '../../Onboarding/LastSlideBtn';

type DiabetesQuestionProps = {
	isDiabetic: boolean;
	setIsDiabetic: React.Dispatch<React.SetStateAction<boolean>>;
	handleNext: () => void;
};

const DiabetesQuestion: React.FC<DiabetesQuestionProps> = ({
	isDiabetic,
	setIsDiabetic,
	handleNext,
}): React.JSX.Element => {
	const [isYesSelected, setIsYesSelected] = useState<boolean>(false);
	const [isNoSelected, setIsNoSelected] = useState<boolean>(false);

	useEffect(() => {
		const loadDiabetesSelection = async () => {
			try {
				const savedSelection = await utils.storage.getItem('selectedDiabetes');
				if (savedSelection) {
					setIsDiabetic(savedSelection === 'Yes');
					setIsYesSelected(savedSelection === 'Yes');
					setIsNoSelected(savedSelection === 'No');
				}
			} catch (error) {
				console.error('Failed to load diabetes selection', error);
			}
		};

		loadDiabetesSelection();
	}, [setIsDiabetic]);

	const handleDiabetesSelection = async (diabetes: 'Yes' | 'No') => {
		try {
			await utils.storage.setItem('selectedDiabetes', diabetes);
			setIsDiabetic(diabetes === 'Yes');
			setIsYesSelected(diabetes === 'Yes');
			setIsNoSelected(diabetes === 'No');
		} catch (error) {
			console.error('Failed to save diabetes selection', error);
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
						Do you have Diabetes ?
					</Text>
				</View>
				<View className="mb-2">
					<Ilustration
						ilustration={DiabetesIlus}
						styleClass="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96"
					/>
				</View>

				<View className="w-full mb-4 mt-4 flex flex-row justify-around">
					<LastSlideButton
						text="Yes"
						onPress={() => {
							setIsDiabetic(true);
							handleDiabetesSelection('Yes');
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
							setIsDiabetic(false);
							handleDiabetesSelection('No');
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

export default DiabetesQuestion;
