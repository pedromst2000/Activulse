import React from 'react';
import { TouchableOpacity } from 'react-native';

type Props = {
	disabled?: boolean;
	activeOpacity?: number;
	styleClass?: string;
	onPress?: () => void | Promise<void>;
} & React.ComponentProps<typeof TouchableOpacity>;

const Button: React.FC<Props> = ({
	disabled,
	styleClass,
	activeOpacity,
	...props
}): React.JSX.Element => {
	return (
		<TouchableOpacity
			disabled={disabled}
			className={`flex flex-row items-center justify-center px-[95px] py-[12px]  
				rounded-md bg-accent-500 ${disabled ? 'opacity-50' : ''} ${styleClass}
				sm:px-6 sm:py-4 md:px-8 md:py-5 lg:px-10 lg:py-6 xl:px-12 xl:py-7 rounded-[30px]`}
			activeOpacity={activeOpacity || 0.75}
			{...props}
		></TouchableOpacity>
	);
};

export default Button;
