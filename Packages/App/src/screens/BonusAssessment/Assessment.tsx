import React, { useState } from 'react';
import { View } from 'react-native';
import AnimatedComponent from '@/src/components/Animated';
import ProgressBar from '@/src/components/AssessmentForm/ProgressBar';
import ArrowLeftI from '@/src/assets/svg/icons/ArrowLeftIcon.svg';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Icon from '@/src/components/Icon';
import StressSelection from '@/src/components/AssessmentForm/StressQuestion';
import KnowDietQuestion from '@/src/components/AssessmentForm/KnowDietQuestion';
import FastFoodSelection from '@/src/components/AssessmentForm/FastFoodQuestion';
import DietSelection from '@/src/components/AssessmentForm/SelectDietQuestion';

const BonusAssessment: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation();
	const [step, setStep] = useState<number>(1);
	const [stressState, setStressState] = useState<'Rare' | 'Sometimes' | 'Frequently' | null>(
		null,
	);
	const [knowDietState, setKnowDietState] = useState<boolean>(false);
	const [FastFoodState, setFastFoodState] = useState<
		'Rare' | 'Sometimes' | 'Frequently' | null
	>(null);
	const [diet, setDiet] = useState<'DASH' | 'Vegan' | 'Mediterranean' | null>(null);

	const handleNext = (): void => {
		if (step < 3) setStep(step + 1);
		else console.log('Assessment Finished');
	};

	const handlePrev = (): void => {
		if (step > 1) setStep(step - 1);
	};

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
						<ProgressBar current={step} total={3} />
					</View>
				</View>

				{/* Assessment Content */}
				<View className="flex-1 justify-center items-center w-full px-4 md:px-8 lg:px-16">
					{step === 1 && (
						<StressSelection
							selectedStress={stressState}
							setSelectedStress={setStressState}
							handleNext={handleNext}
						/>
					)}

					{step === 2 && (
						<KnowDietQuestion
							knowDietState={knowDietState}
							setKnowDietState={setKnowDietState}
							handleNext={handleNext}
						/>
					)}

					{step === 3 &&
						(knowDietState ? (
							<DietSelection
								diet={diet}
								setDiet={setDiet}
								stressState={stressState}
								KnowDietState={knowDietState}
								FastFoodState={FastFoodState}
							/>
						) : (
							<FastFoodSelection
								FastFoodState={FastFoodState}
								setFastFoodState={setFastFoodState}
								stressState={stressState}
								KnowDietState={knowDietState}
							/>
						))}
				</View>
			</ScrollView>
		</AnimatedComponent>
	);
};

export default BonusAssessment;
