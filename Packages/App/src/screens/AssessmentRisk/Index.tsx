import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { useUserContext } from '@/src/context/user';
import AnimatedComponent from '@/src/components/Animated';
import Ilustration from '@/src/components/Ilustration';
import Icon from '@/src/components/Icon';
import HeartAssessmentIlus from '../../assets/svg/ilustrations/heartRiskAssessment/HeartAssessment.svg';
import InfoI from '../../assets/svg/icons/InfoIcon.svg';
import Button from '@/src/components/Button';
import LastSlideButton from '@/src/components/Onboarding/LastSlideBtn';

const InitAssessment: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation();
	const { signOut } = useUserContext();

	return (
		<AnimatedComponent animation="FadeIn">
			<ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
				<View className="flex-1 justify-center items-center min-h-screen px-4 py-5 gap-4 bg-primary-50 mt-2">
					{/* Heading Section */}
					<View className="w-full px-4 sm:px-8">
						<Text className="font-merriweather-bold text-[22px] sm:text-[25px] text-secondary-700 text-center">
							Risk Heart Assessment
						</Text>
					</View>

					{/* Info section */}
					<View className="flex flex-row w-full px-4 py-2 gap-2 items-center sm:px-8 sm:py-4">
						<Icon icon={InfoI} width={20} height={20} />
						<Text className="font-quicksand-medium text-secondary-700 text-[12px] tracking-[1px] flex-1 sm:text-[14px] sm:tracking-[1.2px]">
							We recommend to check out the assessment guidelines in ‘How It Works’ before you
							start your assessment.
						</Text>
					</View>

					{/* Ilustration Section */}
					<View className="w-full items-center">
						<Ilustration
							ilustration={HeartAssessmentIlus}
							styleClass="w-[300px] h-[150px] sm:w-[340px] sm:h-[170px] md:w-[380px] md:h-[190px]"
						/>
					</View>

					{/* Start Assessment Description */}
					<View className="px-4 sm:px-8">
						<Text className="font-quicksand-medium text-secondary-700 text-[14px] sm:text-[16px] text-center">
							Prepare for an exciting journey to a healthier heart! This assessment reveals
							your heart's secrets and guides you toward a future full of energy. We're
							thrilled to join you on this adventure. Let's dive in!
						</Text>
					</View>

					{/* Start Assessment Options */}
					<View className="flex w-full px-4 py-1 gap-4 sm:px-8 sm:py-4">
						<View className="flex-1">
							<Button
								onPress={() => {
									navigation.navigate('AssessmentRisk' as never);
								}}
								className="bg-accent-500 py-2 sm:py-3"
							>
								<Text className="font-quicksand-bold text-secondary-700 text-base sm:text-lg text-center">
									Start
								</Text>
							</Button>
						</View>
						<View className="flex-1">
							<LastSlideButton
								text="How It Works"
								onPress={() => {
									navigation.navigate('HowItWorks' as never);
								}}
								className="bg-primary-50 border-2 border-accent-500 py-2 sm:py-3"
							/>
						</View>
						<Button
							onPress={signOut}
							className="flex-1 bg-primary-50 border-2 border-accent-500 py-2 sm:py-3"
						>
							<Text className="font-quicksand-bold text-secondary-700 text-base sm:text-lg text-center">
								Sign Out
							</Text>
						</Button>
					</View>
				</View>
			</ScrollView>
		</AnimatedComponent>
	);
};

export default InitAssessment;
