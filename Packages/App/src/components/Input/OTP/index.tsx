import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Keyboard } from 'react-native';

type OTPInputProps = {
	length: number;
	onOTPChange: (otp: string) => void;
	setCountDigit: (count: number) => void;
	countDigit: number;
};

const OTPInput: React.FC<OTPInputProps> = ({ length, onOTPChange, setCountDigit }) => {
	const [otpValues, setOtpValues] = useState<string[]>(Array(length).fill(''));
	const [focusedInput, setFocusedInput] = useState<number | null>(null);
	const inputsRef = useRef<TextInput[]>([]);

	useEffect(() => {
		const allFilled = otpValues.every((digit) => digit !== '');
		if (allFilled) {
			inputsRef.current.forEach((input) => input?.blur());
			Keyboard.dismiss(); // Hide the keyboard when all inputs are filled
		}
	}, [otpValues]);

	useEffect(() => {
		// Count the number of filled inputs and update the count
		const filledCount = otpValues.filter((digit) => digit !== '').length;
		setCountDigit(filledCount);
	}, [otpValues, setCountDigit]);

	const handleChangeText = (text: string, index: number) => {
		const newOtpValues = [...otpValues];
		newOtpValues[index] = text;

		setOtpValues(newOtpValues);
		onOTPChange(newOtpValues.join(''));

		// Automatically focus the next input if a digit is entered and not the last input
		if (text && index < length - 1) {
			inputsRef.current[index + 1]?.focus();
		}
	};

	const handleKeyPress = ({ nativeEvent: { key } }: any, index: number) => {
		if (key === 'Backspace') {
			const newOtpValues = [...otpValues];
			newOtpValues[index] = '';

			setOtpValues(newOtpValues);
			onOTPChange(newOtpValues.join(''));

			// Automatically focus the previous input on delete
			if (index > 0) {
				inputsRef.current[index - 1]?.focus();
			}
		}
	};

	const getInputClassName = (index: number) => {
		const isFilled = otpValues[index] !== '';
		const isFocused = focusedInput === index;
		const baseClass = 'w-12 h-12 border-2 rounded-md text-center text-2xl ';

		let dynamicClass = '';
		if (isFocused) {
			dynamicClass =
				'bg-secondary-700 border-secondary-700 text-primary-50 font-quicksand-bold';
		} else if (isFilled) {
			dynamicClass =
				'bg-secondary-700 border-secondary-700 text-primary-50 font-quicksand-bold';
		} else {
			dynamicClass =
				'bg-primary-50 border-secondary-700 text-secondary-700 font-quicksand-bold';
		}

		return `${baseClass} ${dynamicClass}`;
	};

	return (
		<View className="flex-row justify-center items-center gap-2">
			{Array.from({ length }).map((_, index) => (
				<TextInput
					key={index}
					className={getInputClassName(index)}
					value={otpValues[index]}
					onChangeText={(text) => handleChangeText(text, index)}
					onKeyPress={(e) => handleKeyPress(e, index)}
					keyboardType="numeric"
					maxLength={1}
					ref={(el) => (inputsRef.current[index] = el!)}
					onFocus={() => setFocusedInput(index)}
					onBlur={() => setFocusedInput(null)}
				/>
			))}
		</View>
	);
};

export default OTPInput;
