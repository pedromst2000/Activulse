import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import utils from '@/src/utils';
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
	const [isYesSelected, setIsYesSelected] = useState<boolean>(false);
	const [isNoSelected, setIsNoSelected] = useState<boolean>(false);

	useEffect(() => {
		const loadSmokeSelection = async () => {
			try {
				const savedSelection = await utils.storage.getItem('selectedSmoke');
				if (savedSelection) {
					setIsSmoker(savedSelection === 'Yes');
					setIsYesSelected(savedSelection === 'Yes');
					setIsNoSelected(savedSelection === 'No');
				}
			} catch (error) {
				console.error('Failed to load smoke selection', error);
			}
		};

		loadSmokeSelection();
	}, [setIsSmoker]);

	const handleSmokeSelection = async (smoker: 'Yes' | 'No') => {
		try {
			await utils.storage.setItem('selectedSmoke', smoker);
			setIsSmoker(smoker === 'Yes');
			setIsYesSelected(smoker === 'Yes');
			setIsNoSelected(smoker === 'No');
		} catch (error) {
			console.error('Failed to save smoke selection', error);
		}
	};

	return (
		<AnimatedComponent
			animation="SlideInFromRight"
			className="flex justify-center items-center p-4 bg-primary-50"
		>
			<View className="flex justify-center items-center p-4">
				<View className="mb-2">
					<Text className="font-merriweather-bold text-xl md:text-2xl lg:text-3xl text-secondary-700 text-center">
						Are you a Smoker ?
					</Text>
				</View>
				<View className="mb-2 mt-6">
					<Ilustration
						ilustration={SmokeIlus}
						styleClass="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96"
					/>
				</View>

				<View className="w-full mb-4 mt-4 flex flex-row justify-around">
					<LastSlideButton
						text="Yes"
						onPress={() => {
							setIsSmoker(true);
							handleSmokeSelection('Yes');
							handleNext();
						}}
						className={
							isYesSelected
								? 'bg-accent-500 flex-1 mx-1'
								: 'bg-primary-50 border-[3px] border-accent-500 flex-1 mx-2'
						}
					/>
					<LastSlideButton
						text="No"
						onPress={() => {
							setIsSmoker(false);
							handleSmokeSelection('No');
							handleNext();
						}}
						className={
							isNoSelected
								? 'bg-accent-500 flex-1 mx-1'
								: 'bg-primary-50 border-[3px] border-accent-500 flex-1 mx-2'
						}
					/>
				</View>
			</View>
		</AnimatedComponent>
	);
};

export default SmokerQuestion;
