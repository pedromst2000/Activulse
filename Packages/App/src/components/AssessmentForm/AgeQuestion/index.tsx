import React, { useEffect, useRef } from 'react';
import { View, Text } from 'react-native';
import utils from '@/src/utils';
import Input from '@/src/components/Input';
import AnimatedComponent from '../../Animated';
import Ilustration from '../../Ilustration';
import AgeIlus from '../../../assets/svg/ilustrations/heartRiskAssessment/age.svg';
import Button from '../../Button';

type AgeQuestionProps = {
	age: string;
	setAge: React.Dispatch<React.SetStateAction<string>>;
	handleNext: () => void;
};

const AgeQuestion: React.FC<AgeQuestionProps> = ({
	age,
	setAge,
	handleNext,
}): React.JSX.Element => {
	const [isValidAge, setIsValidAge] = React.useState<boolean>(true);
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
		<AnimatedComponent animation="SlideInFromRight">
			<View className="flex justify-center items-center p-4">
				<View className="mb-2">
					<Text className="font-merriweather-bold text-xl md:text-2xl lg:text-3xl text-secondary-700 text-center">
						How old are you ?
					</Text>
				</View>
				<View className="mb-2">
					<Ilustration
						ilustration={AgeIlus}
						styleClass="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96"
					/>
				</View>
				{/* ERROR MESSAGE */}
				{showError && (
					<AnimatedComponent animation="FadeIn">
						<View className="mb-2">
							<Text className="font-quicksand-bold text-red-500 text-xs sm:text-sm md:text-base lg:text-lg text-center">
								Age must be between 30 and 99
							</Text>
						</View>
					</AnimatedComponent>
				)}

				<View className="mb-4 w-full flex justify-center items-center p-1">
					<Input
						placeholder="Insert your age"
						value={age}
						onChange={(text) => setAge(text)}
						keyboardType="numeric"
						className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 text-base sm:text-lg md:text-xl lg:text-2xl"
					/>
				</View>
				<View className="w-full mb-4 mt-4 flex justify-center items-center p-2">
					<Button
						disabled={age === ''}
						onPress={() => {
							if (!utils.validateData.isValid(age, 'age')) {
								setIsValidAge(false);
								setShowError(true);
							} else {
								setIsValidAge(true);
								setShowError(false);
								handleNext();
							}
						}}
						styleClass="w-full sm:w-3/4 md:w-2/3 lg:w-1/2"
					>
						<Text className="font-quicksand-bold text-secondary-700 text-base text-center sm:text-lg md:text-xl lg:text-2xl">
							Next
						</Text>
					</Button>
				</View>
			</View>
		</AnimatedComponent>
	);
};

export default AgeQuestion;
