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
			animation="FadeIn"
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
						width={250}
						height={250}
						className="md:w-64 md:h-64 lg:w-72 lg:h-72"
					/>
				</View>
				{/* ERROR MESSAGE */}
				{showError && (
					<AnimatedComponent animation="FadeIn">
						<View className="mb-2">
							<Text className="font-quicksand-bold text-red-500 text-xs md:text-sm lg:text-base text-center">
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
							className=" w-[70%] sm:w-[80%] md:w-[70%] lg:w-[60%]"
						/>
						<Text className="ml-2 font-quicksand-bold text-secondary-700 text-xs sm:text-sm md:text-base">
							mmHg
						</Text>
					</View>
				</View>

				<View className="w-full mb-4 mt-4  flex justify-center items-center">
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
