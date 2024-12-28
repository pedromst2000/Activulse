import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import utils from '@/src/utils';
import AnimatedComponent from '../../Animated';
import Ilustration from '../../Ilustration';
import KnowDietIlus from '../../../assets/svg/ilustrations/PersonalizedAssessment/KnowDiet.svg';
import LastSlideButton from '../../Onboarding/LastSlideBtn';

type KnowDietQuestionProps = {
	knowDietState: boolean;
	setKnowDietState: React.Dispatch<React.SetStateAction<boolean>>;
	handleNext: () => void;
};

const KnowDietQuestion: React.FC<KnowDietQuestionProps> = ({
	knowDietState,
	setKnowDietState,
	handleNext,
}): React.JSX.Element => {
	const [isYesSelected, setIsYesSelected] = useState<boolean>(false);
	const [isNoSelected, setIsNoSelected] = useState<boolean>(false);

	useEffect(() => {
		const loadKnowDietSelection = async () => {
			try {
				const savedSelection = await utils.storage.getItem('selectedKnowDiet');
				if (savedSelection) {
					setKnowDietState(savedSelection === 'Yes');
					setIsYesSelected(savedSelection === 'Yes');
					setIsNoSelected(savedSelection === 'No');
				}
			} catch (error) {
				console.error('Failed to load know diet selection', error);
			}
		};

		loadKnowDietSelection();
	}, [setKnowDietState]);

	const handleKnowDietSelection = async (knowDiet: 'Yes' | 'No') => {
		try {
			await utils.storage.setItem('selectedKnowDiet', knowDiet);
			setKnowDietState(knowDiet === 'Yes');
			setIsYesSelected(knowDiet === 'Yes');
			setIsNoSelected(knowDiet === 'No');
		} catch (error) {
			console.error('Failed to save know diet selection', error);
		}
	};

	return (
		<AnimatedComponent
			animation="FadeIn"
			className="flex justify-center items-center p-4 bg-primary-50"
		>
			<View className="flex justify-center items-center p-4">
				<View className="mb-2">
					<Text className="font-merriweather-bold text-xl md:text-2xl lg:text-3xl text-secondary-700 text-center">
						Do you know your Diet ?
					</Text>
				</View>
				<View className="mb-2 mt-6">
					<Ilustration
						ilustration={KnowDietIlus}
						styleClass="w-64 h-60 md:w-80 md:h-72 lg:w-96 lg:h-80"
					/>
				</View>

				<View className="w-full mb-4 mt-4 flex flex-row justify-around">
					<LastSlideButton
						text="Yes"
						onPress={() => {
							setKnowDietState(true);
							handleKnowDietSelection('Yes');
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
							setKnowDietState(false);
							handleKnowDietSelection('No');
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

export default KnowDietQuestion;
