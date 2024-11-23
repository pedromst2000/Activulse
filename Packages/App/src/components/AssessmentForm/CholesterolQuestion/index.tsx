import React, { useEffect, useRef } from 'react';
import { View, Text } from 'react-native';
import utils from '@/src/utils';
import useHeartRiskAssessment from '@/src/hooks/ReactQuery/users/heartRiskAssessment';
import Ilustration from '../../Ilustration';
import CholesterolIlus from '../../../assets/svg/ilustrations/heartRiskAssessment/Cholesterol.svg';
import InfoI from '../../../assets/svg/icons/InfoIcon.svg';
import AnimatedComponent from '../../Animated';
import Input from '../../Input';
import Button from '../../Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AssessmentRiskStackParamList } from '@/src/navigation/AssessmentRisk';
import Icon from '../../Icon';

type CholesterolQuestiondNavigationProp = NativeStackNavigationProp<
	AssessmentRiskStackParamList,
	'AssessmentRisk'
>;

type CholesterolQuestionProps = {
	gender: 'Male' | 'Female' | null;
	age: string;
	isSmoker: boolean;
	isDiabetic: boolean;
	isHypertensive: boolean;
	bloodPressure: string;
	HDL: string;
	setHDL: React.Dispatch<React.SetStateAction<string>>;
	totalCholesterol: string;
	setTotalCholesterol: React.Dispatch<React.SetStateAction<string>>;
};

const CholesterolQuestion: React.FC<CholesterolQuestionProps> = ({
	gender,
	age,
	isSmoker,
	isDiabetic,
	isHypertensive,
	bloodPressure,
	HDL,
	setHDL,
	totalCholesterol,
	setTotalCholesterol,
}): React.JSX.Element => {
	const [isValidHDL, setIsValidHDL] = React.useState<boolean>(true);
	const [isValidTotalCholesterol, setIsValidTotalCholesterol] = React.useState<boolean>(true);
	const [showError, setShowError] = React.useState<boolean>(false);
	const [errorMessage, setErrorMessage] = React.useState<string>('');
	const timeoutRef = useRef<NodeJS.Timeout | null>(null); // Manage the timeout for the error message
	const navigation = useNavigation<CholesterolQuestiondNavigationProp>();
	const { mutateAsync } = useHeartRiskAssessment({
		gender: gender,
		age: parseInt(age),
		smoker: isSmoker,
		diabetes: isDiabetic,
		treatment_for_hypertension: isHypertensive,
		systolic_blood_pressure: parseInt(bloodPressure),
		HDL_cholesterol: parseInt(HDL),
		total_cholesterol: parseInt(totalCholesterol),
	});

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

	const handleValidation = (): void => {
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

	const handleAssessment = async (): Promise<void> => {
		try {
			const resData = await mutateAsync({
				gender,
				age: parseInt(age),
				smoker: isSmoker,
				diabetes: isDiabetic,
				treatment_for_hypertension: isHypertensive,
				systolic_blood_pressure: parseInt(bloodPressure),
				HDL_cholesterol: parseInt(HDL),
				total_cholesterol: parseInt(totalCholesterol),
			});

			if (resData.success && resData.data) {
				const { riskScore, typeRisk, health_data } = resData.data;

				navigation.navigate('AssessmentRiskResult', {
					riskScore,
					typeRisk,
					health_data: {
						gender: health_data.gender,
						age: health_data.age,
						smoker: health_data.smoker,
						diabetes: health_data.diabetes,
						treatment_for_hypertension: health_data.treatment_for_hypertension,
						systolic_blood_pressure: health_data.systolic_blood_pressure,
						HDL_cholesterol: health_data.HDL_cholesterol,
						total_cholesterol: health_data.total_cholesterol,
					},
				});
			} else {
				console.log('Error: Data is undefined.');
			}
		} catch (error: any) {
			const errorMessage = utils.error.getMessage(error);
			setErrorMessage(errorMessage);
			setShowError(true);
		}
	};

	return (
		<AnimatedComponent
			animation="FadeIn"
			className="flex justify-center items-center p-4 bg-primary-50"
		>
			<View className="flex justify-center items-center p-4">
				<View className="flex flex-row w-full px-2 py-2 gap-2 sm:px-8 sm:py-4 items-center mb-[18px]">
					<Icon icon={InfoI} width={20} height={20} />
					<Text className="font-quicksand-semi-bold text-secondary-700 text-[12px] tracking-[1px] flex-1">
						Check the previous data filled in the previous steps before continuing.
					</Text>
				</View>
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
								className=" w-[70%] sm:w-[80%] md:w-[70%] lg:w-[60%]"
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
							handleAssessment();
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
