import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

type Props = {
	activeOpacity?: number;
	text?: string;
	className?: string;
	onPress?: () => void | Promise<void>;
} & React.ComponentProps<typeof TouchableOpacity>;

const LastSlideButton: React.FC<Props> = ({
	activeOpacity,
	className,
	onPress,
	...props
}): React.JSX.Element => {
	return (
		<TouchableOpacity
			className={`flex flex-row items-center justify-center px-[45px] py-[10px] 
                rounded-md  rounded-[30px] ${className}`}
			activeOpacity={activeOpacity || 0.75}
			onPress={() => {
				if (onPress) {
					onPress();
				}
			}}
			{...props}
		>
			<Text className="font-quicksand-bold text-secondary-700 text-base">{props.text}</Text>
		</TouchableOpacity>
	);
};

export default LastSlideButton;
