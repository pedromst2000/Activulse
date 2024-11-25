import React from 'react';
import { TouchableOpacity } from 'react-native';

type Props = {
	disabled?: boolean;
	activeOpacity?: number;
	onPress?: () => void | Promise<void>;
} & React.ComponentProps<typeof TouchableOpacity>;

const Button: React.FC<Props> = ({ disabled, activeOpacity, ...props }): React.JSX.Element => {
	return (
		<TouchableOpacity
			disabled={disabled}
			className={`flex flex-row items-center justify-center px-[95px] py-[12px] 
				rounded-md  bg-accent-500 ${disabled ? 'opacity-50' : ''}
                rounded-[30px]`}
			activeOpacity={activeOpacity || 0.75}
			{...props}
		></TouchableOpacity>
	);
};

export default Button;
