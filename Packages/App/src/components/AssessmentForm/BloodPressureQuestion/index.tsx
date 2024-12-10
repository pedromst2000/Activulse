// src/components/Onboarding/AgeQuestion.tsx
import React, { useEffect, useRef } from 'react';
import { View, Text } from 'react-native';
import Ilustration from '../../Ilustration';
import BloodPressureIlus from '../../../assets/svg/ilustrations/heartRiskAssessment/BloodPressure.svg';
import Button from '../../Button';
import Input from '../../Input';
import utils from '@/src/utils';
import AnimatedComponent from '../../Animated';

type BloodPressureQuestionProps = {
	bloodPressure: string;
	setBloodPressure: React.Dispatch<React.SetStateAction<string>>;
	handleNext: () => void;
};

const BloodPressureQuestion: React.FC<BloodPressureQuestionProps> = ({
	bloodPressure,
	setBloodPressure,
	handleNext,
}): React.JSX.Element => {
	const [isValidSBP, setIsValidSBP] = React.useState<boolean>(true);
	const [showError, setShowError] = React.useState<boolean>(false);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null); // Manage the timeout for the error message

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

	return (
		<AnimatedComponent
			animation="SlideInFromRight"
			className="flex justify-center items-center p-4 bg-primary-50"
		>
			<View className="flex justify-center items-center p-4">
				<View className="mb-2">
					<Text className="font-merriweather-bold text-xl md:text-2xl lg:text-3xl text-secondary-700 text-center">
						What is your Systolic Blood Pressure (SBP) ?
					</Text>
				</View>
				<View className="mb-2 w-full flex justify-center items-center">
					<Ilustration
						ilustration={BloodPressureIlus}
						styleClass="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96"
					/>
				</View>
				{/* ERROR MESSAGE */}
				{showError && (
					<AnimatedComponent animation="FadeIn">
						<View className="mb-2">
							<Text className="font-quicksand-bold text-red-500 text-xs sm:text-sm md:text-base lg:text-lg text-center">
								SBP must be between 70 and 230 mmHg
							</Text>
						</View>
					</AnimatedComponent>
				)}
				<View className="mb-4 w-full flex flex-row justify-center items-center">
					<View className="relative flex-1 flex flex-row justify-center items-center">
						<Input
							placeholder="Insert your SBP"
							value={bloodPressure}
							onChange={(text) => setBloodPressure(text)}
							keyboardType="numeric"
							className="w-[60%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%]"
						/>
						<Text className="ml-2 font-quicksand-bold text-secondary-700 text-xs sm:text-sm md:text-base lg:text-lg">
							mmHg
						</Text>
					</View>
				</View>

				<View className="w-full mb-4 mt-4 flex justify-center items-center">
					<Button
						disabled={bloodPressure === ''}
						onPress={() => {
							if (!utils.validateData.isValid(bloodPressure, 'BloodPressure')) {
								setIsValidSBP(false);
								setShowError(true);
							} else {
								setIsValidSBP(true);
								setShowError(false);
								handleNext();
							}
						}}
						styleClass="w-full sm:w-3/4 md:w-2/3 lg:w-1/2"
					>
						<Text className="font-quicksand-bold text-secondary-700 text-sm sm:text-base md:text-lg lg:text-xl text-center">
							Next
						</Text>
					</Button>
				</View>
			</View>
		</AnimatedComponent>
	);
};

export default BloodPressureQuestion;
