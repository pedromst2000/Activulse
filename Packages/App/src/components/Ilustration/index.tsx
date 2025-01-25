import React from 'react';
import { View } from 'react-native';
import { SvgProps } from 'react-native-svg';

type Props = {
	ilustration: React.FC<SvgProps> | null;
	styleClass?: string;
	width?: React.CSSProperties['width'];
	height?: React.CSSProperties['height'];
};

const Ilustration: React.FC<Props> = ({
	styleClass,
	ilustration,
	width,
	height,
}): React.JSX.Element => {
	const IlustrationComponent = ilustration;

	return (
		<>
			<View className={styleClass}>
				{IlustrationComponent && <IlustrationComponent width={width} height={height} />}
			</View>
		</>
	);
};

export default Ilustration;
