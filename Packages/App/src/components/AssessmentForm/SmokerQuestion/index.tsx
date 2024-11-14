import React from 'react';
import { View, Text } from 'react-native';
import AnimatedComponent from '../../Animated';
import Ilustration from '../../Ilustration';
import SmokeIlus from '../../../assets/svg/ilustrations/heartRiskAssessment/Smoker.svg';
import LastSlideButton from '../../Onboarding/LastSlideBtn';

type SmokerQuestionProps = {
	isSmoker: boolean;
	setIsSmoker: React.Dispatch<React.SetStateAction<boolean>>;
	handleNext: () => void;
};

const SmokerQuestion: React.FC<SmokerQuestionProps> = ({
	isSmoker,
	setIsSmoker,
	handleNext,
}): React.JSX.Element => {
	return (
		<AnimatedComponent
			animation="FadeIn"
			className="flex justify-center items-center p-4 bg-primary-50"
		>
			<View className="flex justify-center items-center p-4">
				<View className="mb-2">
					<Text className="font-merriweather-bold text-xl md:text-2xl lg:text-3xl text-secondary-700 text-center">
						Are you a Smoker ?
					</Text>
				</View>
				<View className="mb-2 mt-6">
					<Ilustration ilustration={SmokeIlus} width={270} height={270} />
				</View>

				<View className="w-full mb-4 mt-4 flex flex-row justify-around">
					<LastSlideButton
						text="Yes"
						onPress={() => {
							setIsSmoker(true);
							handleNext();
						}}
						className="bg-primary-50 border-2 border-accent-500 flex-1 mx-2"
					/>
					<LastSlideButton
						text="No"
						onPress={() => {
							setIsSmoker(false);
							handleNext();
						}}
						className="bg-accent-500 flex-1 mx-2"
					/>
				</View>
			</View>
		</AnimatedComponent>
	);
};

export default SmokerQuestion;
