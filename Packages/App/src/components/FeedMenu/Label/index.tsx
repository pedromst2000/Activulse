import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type Props = {
	type: 'Fitness' | 'Nutrition' | 'StoreFitness' | 'StoreNutrition';
	activeOpacity?: number;
	label: string;
	category?: string;
	onPress?: () => void | Promise<void>;
} & React.ComponentProps<typeof TouchableOpacity>;

const LabelItem: React.FC<Props> = ({
	type,
	activeOpacity,
	label,
	category,
	onPress,
}): React.JSX.Element => {
	const isSelected = category === label;
	const isPremium = label === 'Premium';

	if (isPremium && !isSelected) {
		return (
			<View className="flex items-center justify-center relative overflow-hidden rounded-full">
				<LinearGradient
					colors={['#EFF6FF', '#73B6FF', '#FFA653', '#2254B5']}
					locations={[0.05, 0.25, 0.55, 0.95]}
					start={{ x: 0, y: 1 }}
					end={{ x: 1, y: 0 }}
					style={{ flex: 1, borderRadius: 100 }}
				>
					<TouchableOpacity
						className={
							type === 'Fitness'
								? 'px-6 py-2 rounded-full mx-1 md:mx-2 lg:mx-3 xl:mx-4'
								: 'px-4 py-2 rounded-full mx-1 md:mx-2 lg:mx-3 xl:mx-4'
						}
						style={{ elevation: 5 }}
						activeOpacity={activeOpacity || 0.75}
						onPress={onPress}
					>
						<Text className="font-quicksand-bold text-primary-50 text-[13.2px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px]">
							Premium
						</Text>
					</TouchableOpacity>
				</LinearGradient>
			</View>
		);
	}

	return (
		<TouchableOpacity
			className={`self-start ${
				isSelected ? 'bg-accent-700' : 'bg-primary-50 border-[2px] border-accent-700'
			}  ${type === 'Fitness' ? 'px-6' : 'px-4'}  py-2 rounded-full mx-1 md:mx-2 lg:mx-3 xl:mx-4`}
			style={{ elevation: 5 }}
			activeOpacity={activeOpacity || 0.75}
			onPress={onPress}
		>
			<View className="flex items-center justify-center relative overflow-hidden rounded-full">
				<Text className="font-quicksand-bold  text-secondary-700 text-[13.2px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px]">
					{label}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default LabelItem;
