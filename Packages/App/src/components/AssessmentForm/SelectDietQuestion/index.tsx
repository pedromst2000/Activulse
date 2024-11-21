import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import AnimatedComponent from '../../Animated';
import useExtraAssessment from '@/src/hooks/ReactQuery/users/extraAssessment';
import utils from '@/src/utils';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BonusAssessmentStackParamList } from '@/src/navigation/BonusAssessment';
import { useUserContext } from '@/src/context/user';

type DietSelectionProps = {
	diet: 'DASH' | 'Vegan' | 'Mediterranean' | null;
	setDiet: React.Dispatch<React.SetStateAction<'DASH' | 'Vegan' | 'Mediterranean' | null>>;
	stressState: 'Rare' | 'Sometimes' | 'Frequently' | null;
	KnowDietState: boolean;
	FastFoodState: 'Rare' | 'Sometimes' | 'Frequently' | null;
};

type SelectDietNavigationProp = NativeStackNavigationProp<
	BonusAssessmentStackParamList,
	'BonusAssessment'
>;

const DietSelection: React.FC<DietSelectionProps> = ({
	diet,
	setDiet,
	stressState,
	KnowDietState,
	FastFoodState,
}) => {
	const navigation = useNavigation<SelectDietNavigationProp>();

	const [selectedDiet, setSelectedDiet] = useState<'DASH' | 'Vegan' | 'Mediterranean' | null>(
		null,
	);

	const { loggedUser, updateUser } = useUserContext();

	const handleDietSelection = (dietType: 'DASH' | 'Vegan' | 'Mediterranean') => {
		setSelectedDiet(dietType);
		setDiet(dietType);
	};

	const [showError, setShowError] = React.useState<boolean>(false);
	const [errorMessage, setErrorMessage] = React.useState<string>('');
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const { mutateAsync } = useExtraAssessment({
		stress: stressState ?? undefined,
		havesDiet: KnowDietState ?? undefined,
		diet: selectedDiet ?? undefined,
	});

	useEffect(() => {
		if (showError) {
			timeoutRef.current = setTimeout(() => {
				setShowError(false);
			}, 5000);
		}

		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [showError]);

	const handleExtraAssessment = async (): Promise<void> => {
		try {
			const resData = await mutateAsync({
				stress: stressState,
				havesDiet: KnowDietState,
				diet: selectedDiet,
			});

			if (resData.success) {
				if (loggedUser) {
					const update = {
						diet: selectedDiet ?? '',
					};

					updateUser({ ...loggedUser, ...update });
				}

				navigation.navigate('BonusOnboarding', {
					isFastFood:
						FastFoodState === 'Frequently' || FastFoodState === 'Sometimes' ? true : false,
					stressState: stressState,
					fastFoodState: FastFoodState,
				});
			}
		} catch (error: any) {
			const errorMessage = utils.error.getMessage(error);
			setErrorMessage(errorMessage);
			setShowError(true);
		}
	};

	// Triggering the API call when `selectedDiet` is updated
	useEffect(() => {
		if (selectedDiet) {
			handleExtraAssessment();
		}
	}, [selectedDiet]);

	return (
		<AnimatedComponent
			animation="FadeIn"
			className="flex justify-center items-center p-4 bg-primary-50"
		>
			<View className="flex-1 justify-center items-center gap-5 w-full h-full px-4 bg-primary-50">
				{/* Title */}
				<View>
					<Text className="font-merriweather-bold text-lg text-secondary-700 text-center">
						Let us know about your Diet?
					</Text>
					<Text className="font-quicksand-medium text-secondary-700 text-[14.22px] text-center">
						Select one
					</Text>
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

				{/* Cards Container */}
				<View className="flex flex-col md:flex-row justify-center items-center flex-wrap gap-5 px-4">
					<TouchableOpacity activeOpacity={0.8} onPress={() => handleDietSelection('DASH')}>
						<View className="relative">
							<Image
								className="w-[220px] h-[180px] md:w-[200px] md:h-[240px] rounded-[20px] md:rounded-[30px]"
								source={require('../../../assets/images/DashDiet.png')}
							/>
							<View className="absolute top-0 left-0 w-full h-full bg-black opacity-5 rounded-[20px] md:rounded-[30px]" />
							<View className="absolute top-2 left-2 bg-accent-700 px-2 py-1 rounded-[20px] md:rounded-[30px]">
								<Text className="font-quicksand-bold text-secondary-700">DASH</Text>
							</View>
						</View>
					</TouchableOpacity>

					<TouchableOpacity activeOpacity={0.8} onPress={() => handleDietSelection('Vegan')}>
						<View className="relative">
							<Image
								className="w-[220px] h-[180px] md:w-[200px] md:h-[240px] rounded-[20px] md:rounded-[30px]"
								source={require('../../../assets/images/VeganDiet.png')}
							/>
							<View className="absolute top-0 left-0 w-full h-full bg-black opacity-5 rounded-[20px] md:rounded-[30px]" />
							<View className="absolute top-2 left-2 bg-accent-700 px-2 py-1 rounded-[20px] md:rounded-[30px]">
								<Text className="font-quicksand-bold text-secondary-700">Vegan</Text>
							</View>
						</View>
					</TouchableOpacity>

					<TouchableOpacity
						activeOpacity={0.8}
						onPress={() => handleDietSelection('Mediterranean')}
					>
						<View className="relative">
							<Image
								className="w-[220px] h-[180px] md:w-[200px] md:h-[240px] rounded-[20px] md:rounded-[30px]"
								source={require('../../../assets/images/MediterraneanDiet.png')}
							/>
							<View className="absolute top-0 left-0 w-full h-full bg-black opacity-5 rounded-[20px] md:rounded-[30px]" />
							<View className="absolute top-2 left-2 bg-accent-700 px-2 py-1 rounded-[20px] md:rounded-[30px]">
								<Text className="font-quicksand-bold text-secondary-700">Mediterranean</Text>
							</View>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</AnimatedComponent>
	);
};

export default DietSelection;
