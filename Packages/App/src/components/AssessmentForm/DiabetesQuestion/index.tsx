// src/components/Onboarding/AgeQuestion.tsx
import React from 'react';
import { View, Text } from 'react-native';
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
	return (
		<AnimatedComponent animation="FadeIn" className="flex justify-center items-center p-4 bg-primary-50">
		<View className="flex justify-center items-center p-4">
			<View className="mb-2">
				<Text className="font-merriweather-bold text-xl md:text-2xl lg:text-3xl text-secondary-700 text-center">
					Do you have Diabetes ?
				</Text>
			</View>
			<View className="mb-2">
				<Ilustration ilustration={DiabetesIlus} width={270} height={270} />
			</View>

			<View className="w-full mb-4 mt-4 flex flex-row justify-around">
				<LastSlideButton
					text="Yes"
					onPress={() => {
						setIsDiabetic(true);
						handleNext();
					}}
					className="bg-primary-50 border-2 border-accent-500 flex-1 mx-2"
				/>
				<LastSlideButton
					text="No"
					onPress={() => {
						setIsDiabetic(false);
						handleNext();
					}}
					className="bg-accent-500 flex-1 mx-2"
				/>
			</View>
		</View>
		</AnimatedComponent>
	);
};

export default DiabetesQuestion;
