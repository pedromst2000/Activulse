import React from 'react';
import { View } from 'react-native';
import { SvgProps } from 'react-native-svg';

type Props = {
	ilustration: React.FC<SvgProps>;
	className?: string;
	width?: React.CSSProperties['width'];
	height?: React.CSSProperties['height'];
};

const Ilustration: React.FC<Props> = ({
	className,
	ilustration,
	width,
	height,
}): React.JSX.Element => {
	const IlustrationComponent = ilustration;

	return (
		<>
			<View className={className}>
				<IlustrationComponent width={width} height={height} />
			</View>
		</>
	);
};

export default Ilustration;
