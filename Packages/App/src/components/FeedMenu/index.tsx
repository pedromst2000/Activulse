import React, { Dispatch } from 'react';
import { View } from 'react-native';
import LabelItem from './Label';

type Props = {
	type: 'Fitness' | 'Nutrition';
	items: string[];
	setSelectedNutritionCategory?: Dispatch<
		React.SetStateAction<'All' | 'Soups' | 'Main Dishes' | 'Salads' | 'Desserts' | 'Premium'>
	>;
	setSelectedFitnessCategory?: Dispatch<
		React.SetStateAction<'All' | 'Cardio' | 'Yoga' | 'Muscles' | 'Premium'>
	>;
	setSelectedStoreFitnessCategory?: Dispatch<
		React.SetStateAction<'All' | 'Cardio' | 'Yoga' | 'Muscles'>
	>;
	fitnessCategory?: 'All' | 'Cardio' | 'Yoga' | 'Muscles' | 'Premium';
	nutritionCategory?: 'All' | 'Soups' | 'Main Dishes' | 'Salads' | 'Desserts' | 'Premium';
	styleClass?: string;
};

const FeedMenu: React.FC<Props> = ({
	type,
	items,
	setSelectedFitnessCategory,
	setSelectedNutritionCategory,
	setSelectedStoreFitnessCategory,
	fitnessCategory,
	nutritionCategory,
	styleClass,
}): React.JSX.Element => {
	return (
		<View
			className="flex flex-row flex-wrap justify-center items-center space-x-2
				sm:justify-start sm:px-2
				md:justify-center md:px-4
				lg:justify-end lg:px-6"
		>
			{items.map((item, index) => {
				return (
					<View
						className={
							type === 'Fitness'
								? 'px-[8px] py-[10px]'
								: 'px-[6px] py-[10px] sm:px-1 sm:py-2 md:px-2 md:py-3 lg:px-3 lg:py-4'
						}
						key={index}
					>
						<LabelItem
							type={type}
							key={index}
							label={item}
							onPress={() => {
								if (type === 'Fitness') {
									setSelectedFitnessCategory && setSelectedFitnessCategory(item as any);
								}
								if (type === 'Nutrition') {
									setSelectedNutritionCategory && setSelectedNutritionCategory(item as any);
								} else {
									setSelectedStoreFitnessCategory &&
										setSelectedStoreFitnessCategory(item as any);
								}
							}}
							category={type === 'Fitness' ? fitnessCategory : nutritionCategory}
						/>
					</View>
				);
			})}
		</View>
	);
};

export default FeedMenu;
