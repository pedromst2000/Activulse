import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SvgProps } from 'react-native-svg';

type Props = {
	icon: React.FC<SvgProps>;
	className?: string;
	onPress?: () => void;
	width?: React.CSSProperties['width'];
	height?: React.CSSProperties['height'];
};

const Icon: React.FC<Props> = ({
	width,
	height,
	className,
	icon,
	onPress,
}): React.JSX.Element => {
	const IconComponent = icon;

	return (
		<>
			{onPress ? (
				<TouchableOpacity className={className} onPress={onPress} activeOpacity={1}>
					<IconComponent width={width} height={height} />
				</TouchableOpacity>
			) : (
				<View className={className}>
					<IconComponent width={width} height={height} />
				</View>
			)}
		</>
	);
};

export default Icon;
