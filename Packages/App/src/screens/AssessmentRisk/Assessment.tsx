import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import AnimatedComponent from '@/src/components/Animated';
import ProgressBar from '@/src/components/AssessmentForm/ProgressBar';
import ArrowLeftI from '@/src/assets/svg/icons/ArrowLeftIcon.svg';
import Icon from '@/src/components/Icon';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import GenderSelection from '@/src/components/AssessmentForm/GenderSelection';
import AgeQuestion from '@/src/components/AssessmentForm/AgeQuestion';
import SmokerQuestion from '@/src/components/AssessmentForm/SmokerQuestion';
import DiabetesQuestion from '@/src/components/AssessmentForm/DiabetesQuestion';
import HypertensionQuestion from '@/src/components/AssessmentForm/HypertensionQuestion';
import BloodPressureQuestion from '@/src/components/AssessmentForm/BloodPressureQuestion';
import CholesterolQuestion from '@/src/components/AssessmentForm/CholesterolQuestion';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Assessment: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation();
	const [step, setStep] = useState<number>(1);
	const [selectedGender, setSelectedGender] = useState<'Male' | 'Female' | null>(null);
	const [age, setAge] = useState<string>('');
	const [isSmoker, setIsSmoker] = useState<boolean>(false);
	const [isDiabetic, setIsDiabetic] = useState<boolean>(false);
	const [isHypertensive, setIsHypertensive] = useState<boolean>(false);
	const [bloodPressure, setBloodPressure] = useState<string>('');
	const [HDL, setHDL] = useState<string>('');
	const [totalCholesterol, setTotalCholesterol] = useState<string>('');

	const handleNext = (): void => {
		if (step < 7) setStep(step + 1);
		else console.log('Assessment Finished');
	};

	const handlePrev = (): void => {
		if (step > 1) setStep(step - 1);
	};

	useEffect(() => {
		//unmount
		return () => {
			//reseting the form
			setSelectedGender(null);
			setAge('');
			setIsSmoker(false);
			setIsDiabetic(false);
			setIsHypertensive(false);
			setBloodPressure('');
			setHDL('');
			setTotalCholesterol('');

			AsyncStorage.removeItem('selectedGender');
			AsyncStorage.removeItem('selectedSmoke');
			AsyncStorage.removeItem('selectedDiabetes');
			AsyncStorage.removeItem('selectedHypertension');
		};
	}, []);

	return (
		<AnimatedComponent animation="FadeIn">
			<ScrollView keyboardShouldPersistTaps="handled" className="bg-primary-50">
				{/* Heading  */}
				<View className="items-center my-5">
					{/* Back Button */}
					<View className="absolute top-8 left-5">
						<Icon
							icon={ArrowLeftI}
							onPress={() => {
								if (step === 1) {
									navigation.goBack();
								} else {
									handlePrev();
								}
							}}
							width={30}
							height={30}
						/>
					</View>

					{/* Progress Bar */}
					<View className="flex-row items-center justify-center w-full px-4 md:px-8 lg:px-16">
						<ProgressBar current={step} total={7} />
					</View>
				</View>
				{/* Assessment Content */}
				<View className="flex-1 justify-center items-center w-full px-4 md:px-8 lg:px-16">
					{step === 1 && (
						<GenderSelection
							selectedGender={selectedGender}
							setSelectedGender={setSelectedGender}
							handleNext={handleNext}
						/>
					)}
					{step === 2 && <AgeQuestion age={age} setAge={setAge} handleNext={handleNext} />}
					{step === 3 && (
						<SmokerQuestion
							isSmoker={isSmoker}
							setIsSmoker={setIsSmoker}
							handleNext={handleNext}
						/>
					)}
					{step === 4 && (
						<DiabetesQuestion
							isDiabetic={isDiabetic}
							setIsDiabetic={setIsDiabetic}
							handleNext={handleNext}
						/>
					)}
					{step === 5 && (
						<HypertensionQuestion
							isHypertensive={isHypertensive}
							setIsHypertensive={setIsHypertensive}
							handleNext={handleNext}
						/>
					)}
					{step === 6 && (
						<BloodPressureQuestion
							bloodPressure={bloodPressure}
							setBloodPressure={setBloodPressure}
							handleNext={handleNext}
						/>
					)}
					{step === 7 && (
						<CholesterolQuestion
							gender={selectedGender}
							age={age}
							isSmoker={isSmoker}
							isDiabetic={isDiabetic}
							isHypertensive={isHypertensive}
							bloodPressure={bloodPressure}
							HDL={HDL}
							totalCholesterol={totalCholesterol}
							setHDL={setHDL}
							setTotalCholesterol={setTotalCholesterol}
						/>
					)}
				</View>
			</ScrollView>
		</AnimatedComponent>
	);
};

export default Assessment;
