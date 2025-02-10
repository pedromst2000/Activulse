import React from 'react';
import { TouchableOpacity } from 'react-native';

type Props = {
	disabled?: boolean;
	isRounded?: boolean;
	activeOpacity?: number;
	styleClass?: string;
	onPress?: () => void | Promise<void>;
} & React.ComponentProps<typeof TouchableOpacity>;

const Button: React.FC<Props> = ({
	disabled,
	isRounded,
	styleClass,
	activeOpacity,
	...props
}): React.JSX.Element => {
	return (
		<TouchableOpacity
			disabled={disabled}
			className={`flex flex-row items-center justify-center ${isRounded ? 'w-[50px] h-[50px]' : 'px-[95px] py-[12px]'}  
				${isRounded ? 'rounded-full' : 'rounded-[30px]'}  bg-accent-500 ${disabled ? 'opacity-50' : ''} ${styleClass}
				sm:px-6 sm:py-4 md:px-8 md:py-5 lg:px-10 lg:py-6 xl:px-12 xl:py-7`}
			activeOpacity={activeOpacity || 0.75}
			{...props}
		></TouchableOpacity>
	);
};

export default Button;
