import { View } from 'react-native';
import Button from '../../Button';
import Icon from '../../Icon';
import restartI from '../../../assets/svg/icons/RefreshIcon.svg';

type Props = {
	onPress: () => void;
	currentTime: number;
};

const Restart: React.FC<Props> = ({ onPress, currentTime }): React.JSX.Element => {
	return (
		<View>
			<Button disabled={currentTime === 0} isRounded={true} onPress={onPress}>
				<Icon icon={restartI} width={24} height={24} />
			</Button>
		</View>
	);
};

export default Restart;
