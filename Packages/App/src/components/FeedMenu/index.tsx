import React, { Dispatch } from 'react';
import { View } from 'react-native';
import LabelItem from './Label';

type Props = {
	type: 'Fitness' | 'Nutrition';
	items: string[];
	setSelectedCategory?: Dispatch<React.SetStateAction<string>>;
	category?: string;
	styleClass?: string;
};

const FeedMenu: React.FC<Props> = ({
	type,
	items,
	setSelectedCategory,
	category,
	styleClass,
}): React.JSX.Element => {
	return (
		<View
			className="flex flex-row flex-wrap justify-center items-center w-full
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
							onPress={() => setSelectedCategory && setSelectedCategory(item)}
							category={category}
						/>
					</View>
				);
			})}
		</View>
	);
};

export default FeedMenu;
