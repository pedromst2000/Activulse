import React, { useEffect, useRef } from 'react';
import { View, Text } from 'react-native';
import utils from '@/src/utils';
import Ilustration from '../../Ilustration';
import CholesterolIlus from '../../../assets/svg/ilustrations/heartRiskAssessment/Cholesterol.svg';
import AnimatedComponent from '../../Animated';
import Input from '../../Input';
import Button from '../../Button';

type CholesterolQuestionProps = {
	HDL: string;
	setHDL: React.Dispatch<React.SetStateAction<string>>;
	totalCholesterol: string;
	setTotalCholesterol: React.Dispatch<React.SetStateAction<string>>;
	handleNext: () => void;
};

const CholesterolQuestion: React.FC<CholesterolQuestionProps> = ({
	HDL,
	setHDL,
	totalCholesterol,
	setTotalCholesterol,
	handleNext,
}): React.JSX.Element => {
	const [isValidHDL, setIsValidHDL] = React.useState<boolean>(true);
	const [isValidTotalCholesterol, setIsValidTotalCholesterol] = React.useState<boolean>(true);
	const [showError, setShowError] = React.useState<boolean>(false);
	const [errorMessage, setErrorMessage] = React.useState<string>('');
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

	const handleValidation = () => {
		// Validate HDL
		const isHDLValid = utils.validateData.isValid(HDL, 'HDL');
		const isTotalCholesterolValid = utils.validateData.isValid(
			totalCholesterol,
			'TotalCholesterol',
		);

		if (!isHDLValid) {
			setIsValidHDL(false);
			setErrorMessage('HDL must be between 20 and 100');
			setShowError(true);
		} else if (!isTotalCholesterolValid) {
			setIsValidTotalCholesterol(false);
			setErrorMessage('Total Cholesterol must be between 100 and 300');
			setShowError(true);
		} else {
			setIsValidHDL(true);
			setIsValidTotalCholesterol(true);
			setShowError(false);
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
						Let us know about your Cholesterol
					</Text>
				</View>
				<View className="mb-2">
					<Ilustration ilustration={CholesterolIlus} width={300} height={300} />
				</View>

				{/* ERROR MESSAGE */}
				{showError && (
					<AnimatedComponent animation="FadeIn">
						<View className="mb-2">
							<Text className="font-quicksand-bold text-red-500 text-xs md:text-sm lg:text-base text-center">
								{errorMessage}
							</Text>
						</View>
					</AnimatedComponent>
				)}

				<View className="mb-4 w-full flex flex-col justify-center items-center gap-4">
					{['HDL', 'Total'].map((label, index) => (
						<View
							key={index}
							className="relative flex-1 flex flex-row justify-center items-center  max-w-md"
						>
							<Text className="mr-2 font-quicksand-bold text-secondary-700 text-sm md:text-base lg:text-lg">
								{label}
							</Text>

							<Input
								placeholder={`Insert your ${label}`}
								value={label === 'HDL' ? HDL : totalCholesterol}
								onChange={(text) =>
									label === 'HDL' ? setHDL(text) : setTotalCholesterol(text)
								}
								keyboardType="numeric"
								className="flex-1 pr-2 py-2"
							/>
							<Text className="ml-2 font-quicksand-bold text-secondary-700 text-xs sm:text-sm md:text-base">
								mg/dL
							</Text>
						</View>
					))}
				</View>

				<View className="w-full mb-4 mt-4 flex justify-center items-center">
					<Button
						disabled={HDL === '' || totalCholesterol === ''}
						onPress={() => {
							handleValidation();
							console.log('Finished Assessment');
						}}
					>
						<Text className="font-quicksand-bold text-secondary-700 text-sm sm:text-base md:text-lg lg:text-xl text-center">
							Finish
						</Text>
					</Button>
				</View>
			</View>
		</AnimatedComponent>
	);
};

export default CholesterolQuestion;
