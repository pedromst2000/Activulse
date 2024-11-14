import AnimatedComponent from '@/src/components/Animated';
import React from 'react';
import { View, Text } from 'react-native';
import Ilustration from '@/src/components/Ilustration';
import Icon from '@/src/components/Icon';
import HeartAssessmentIlus from '../../assets/svg/ilustrations/heartRiskAssessment/HeartAssessment.svg';
import InfoI from '../../assets/svg/icons/InfoIcon.svg';
import Button from '@/src/components/Button';
import LastSlideButton from '@/src/components/Onboarding/LastSlideBtn';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import utils from '@/src/utils';
import { useUserContext } from '@/src/context/user';

const InitAssessment: React.FC = (): React.JSX.Element => {
	const navigation = useNavigation();
	const { setLoggedUser } = useUserContext();

	const handleSignOut = async (): Promise<void> => {
		// Remove the tokens from the device storage
		await utils.storage.removeItem('authToken');
		await utils.storage.removeItem('refreshToken');

		// Update the global state
		setLoggedUser(null);
	};

	return (
		<AnimatedComponent animation="FadeIn">
			<ScrollView keyboardShouldPersistTaps="handled" className="bg-primary-50">
				<View className="flex-1 justify-center items-center min-h-screen px-4 py-5 gap-4 bg-primary-50 mt-2">
					{/* Heading Section */}
					<View>
						<Text className="font-merriweather-bold text-[25px] text-secondary-700 text-center">
							Risk Heart Assessment
						</Text>
					</View>

					{/* Info section */}
					<View className="flex flex-row w-full px-4 py-2 gap-2 sm:px-8 sm:py-4 items-center">
						<Icon icon={InfoI} width={20} height={20} />
						<Text className="font-quicksand-medium text-secondary-700 text-[12px] tracking-[1px] flex-1">
							We recommend to check out the assessment guidelines in ‘How It Works’ before you
							start your assessment.
						</Text>
					</View>

					{/* Ilustration Section */}
					<View className="w-full items-center">
						<Ilustration ilustration={HeartAssessmentIlus} width={340} height={170} />
					</View>

					{/* Start Assessment Description */}
					<View className="px-4">
						<Text className="font-quicksand-medium text-secondary-700 text-[14.22px] text-center">
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
							>
								<Text className="font-quicksand-bold text-secondary-700 text-base">Start</Text>
							</Button>
						</View>
						<View className="flex-1">
							<LastSlideButton
								text="How It Works"
								onPress={() => {
									navigation.navigate('HowItWorks' as never);
								}}
								className="bg-primary-50 border-2 border-accent-500"
							/>
						</View>
						<Button
							onPress={handleSignOut}
							className="flex-1 bg-primary-50 border-2 border-accent-500"
						>
							<Text className="font-quicksand-bold text-secondary-700 text-base text-center">
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
