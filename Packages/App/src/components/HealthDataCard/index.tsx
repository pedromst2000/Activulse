import React from 'react';
import { View, Text } from 'react-native';

type Props = {
	gender: string;
	age: number;
	smoker: 'Yes' | 'No';
	diabetes: 'Yes' | 'No';
	hypertension: 'Yes' | 'No';
	SBP: number;
	HDL: number;
	total_chol: number;
};

const HealthDataCard: React.FC<Props> = ({
	gender,
	age,
	smoker,
	diabetes,
	hypertension,
	SBP,
	HDL,
	total_chol,
}): React.JSX.Element => {
	return (
		<View className="flex-1 bg-accent-100 rounded-3xl mt-5 w-11/12 sm:w-4/5 mx-auto p-3 shadow-2xl">
			<View className="space-y-3">
				<View className="flex-row justify-between px-2 sm:px-4">
					<View>
						<Text className="font-quicksand-bold text-[13px] sm:text-[14px] text-secondary-700">
							Gender
						</Text>
					</View>
					<View>
						<Text className="font-quicksand-medium text-[13px] sm:text-[14px] text-secondary-700 tracking-wide">
							{gender}
						</Text>
					</View>
				</View>
				<View className="flex-row justify-between px-2 sm:px-4">
					<View>
						<Text className="font-quicksand-bold text-[13px] sm:text-[14px] text-secondary-700">
							Age
						</Text>
					</View>
					<View>
						<Text className="font-quicksand-medium text-[13px] sm:text-[14px] text-secondary-700 tracking-wide">
							{age}
						</Text>
					</View>
				</View>
				<View className="flex-row justify-between px-2 sm:px-4">
					<View>
						<Text className="font-quicksand-bold text-[13px] sm:text-[14px] text-secondary-700">
							Smoker
						</Text>
					</View>
					<View>
						<Text className="font-quicksand-medium text-[13px] sm:text-[14px] text-secondary-700 tracking-wide">
							{smoker}
						</Text>
					</View>
				</View>
				<View className="flex-row justify-between px-2 sm:px-4">
					<View>
						<Text className="font-quicksand-bold [14px] sm:text-[14px] text-secondary-700">
							Diabetes
						</Text>
					</View>
					<View>
						<Text className="font-quicksand-medium text-[13px] sm:text-[14px] text-secondary-700 tracking-wide">
							{diabetes}
						</Text>
					</View>
				</View>
				<View className="flex-row justify-between px-2 sm:px-4">
					<View>
						<Text className="font-quicksand-bold text-[13px] sm:text-[14px] text-secondary-700">
							Hypertension
						</Text>
					</View>
					<View>
						<Text className="font-quicksand-medium text-[13px] sm:text-[14px] text-secondary-700 tracking-wide">
							{hypertension}
						</Text>
					</View>
				</View>
				<View className="flex-row justify-between px-2 sm:px-4">
					<View>
						<Text className="font-quicksand-bold text-[13px] sm:text-[14px] text-secondary-700">
							SBP
						</Text>
					</View>
					<View>
						<Text className="font-quicksand-medium text-[13px] sm:text-[14px] text-secondary-700 tracking-wide">
							{SBP} mmHg
						</Text>
					</View>
				</View>
				<View className="flex-row justify-between px-2 sm:px-4">
					<View>
						<Text className="font-quicksand-bold text-[13px] sm:text-[14px] text-secondary-700">
							HDL
						</Text>
					</View>
					<View>
						<Text className="font-quicksand-medium text-[13px] sm:text-[14px] text-secondary-700 tracking-wide">
							{HDL} mg/dl
						</Text>
					</View>
				</View>
				<View className="flex-row justify-between px-2 sm:px-4">
					<View>
						<Text className="font-quicksand-bold text-[13px] sm:text-[14px] text-secondary-700 tracking-wide">
							Total Cholesterol
						</Text>
					</View>
					<View>
						<Text className="font-quicksand-medium text-[13px] sm:text-[14px] text-secondary-700 tracking-wide">
							{total_chol} mg/dl
						</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

export default HealthDataCard;
