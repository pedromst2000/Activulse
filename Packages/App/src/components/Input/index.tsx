import React, { createRef, useEffect, useState } from 'react';
import { KeyboardTypeOptions, TextInput, View } from 'react-native';
import { SvgProps } from 'react-native-svg';
import Icon from '../Icon';
import VisibleEyeI from '../../assets/svg/icons/VisibleEyeIcon.svg';
import HiddenEyeI from '../../assets/svg/icons/HideEyeIcon.svg';
import removeI from '../../assets/svg/icons/ErrorIcon.svg';

type Props = {
	placeholder: string;
	hideText?: boolean;
	value: string;
	onChange: (text: string) => void;
	icon?: React.FC<SvgProps>;
	className?: string;
	iconClassName?: string;
	textInputClassName?: string;
	multiLine?: boolean;
	numberOfLines?: number;
	keyboardType?: KeyboardTypeOptions;
	havesError?: boolean;
};

const Input: React.FC<Props> = ({
	placeholder,
	hideText,
	value,
	onChange,
	icon,
	className,
	iconClassName,
	textInputClassName,
	multiLine,
	numberOfLines,
	keyboardType,
	havesError,
}): React.JSX.Element => {
	const inputRef = createRef<TextInput>();
	const [isHidden, setIsHidden] = useState<boolean>(hideText || false);
	const [showClearButton, setShowClearButton] = useState<boolean>(false);

	// Toggle the visibility of the password field
	const toggleVisibility = (): void => {
		setIsHidden(!isHidden);
	};

	// Handle clearing the text input
	const handleClear = (): void => {
		onChange('');
		setShowClearButton(false);
	};

	useEffect(() => {
		setShowClearButton(value.length > 0);
	}, [value]);

	return (
		<View
			className={`flex flex-row items-center w-full max-w-[300px] h-[50px] rounded-[20px] border-2 border-secondary-700 ${className}`}
		>
			{/* Icon Container */}
			{icon && (
				<View className={`pl-2 ${iconClassName}`}>
					<Icon width={23} height={23} icon={icon} onPress={() => inputRef.current?.focus()} />
				</View>
			)}

			{/* Text Input */}
			<TextInput
				ref={inputRef}
				placeholder={placeholder}
				className={`flex-1 text-[16px] text-secondary-700 font-quicksand-medium px-2 ${textInputClassName}`}
				value={value}
				onChangeText={onChange}
				secureTextEntry={isHidden}
				multiline={multiLine || false}
				numberOfLines={numberOfLines || 1}
				keyboardType={keyboardType || 'default'}
			/>

			{/* Clear Button */}
			{showClearButton && (
				<View className="pr-2">
					<Icon width={13} height={13} icon={removeI} onPress={handleClear} />
				</View>
			)}

			{/* Password Visibility Toggle */}
			{hideText && (
				<View className="pr-2">
					<Icon
						width={23}
						height={23}
						icon={isHidden ? VisibleEyeI : HiddenEyeI}
						onPress={toggleVisibility}
					/>
				</View>
			)}
		</View>
	);
};

export default Input;
