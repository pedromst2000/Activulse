import React, { Dispatch } from 'react';
import { View } from 'react-native';
import LabelTop from '../LabelTop';

type Props = {
	items: string[];
	setSelectedTopBarOpt?: Dispatch<React.SetStateAction<'Premium' | 'Banners'>>;
	selectedTopBarOpt?: 'Premium' | 'Banners' | string;
};

const TopBarNav: React.FC<Props> = ({
	items,
	setSelectedTopBarOpt,
	selectedTopBarOpt,
}): React.JSX.Element => {
	return (
		<View className="flex flex-row justify-between items-center w-full bg-primary-50">
			{items.map((item, index) => {
				return (
					<LabelTop
						key={index}
						label={item}
						selectedLabel={selectedTopBarOpt}
						onPress={() => {
							setSelectedTopBarOpt && setSelectedTopBarOpt(item as any);
						}}
					/>
				);
			})}
		</View>
	);
};

export default TopBarNav;
