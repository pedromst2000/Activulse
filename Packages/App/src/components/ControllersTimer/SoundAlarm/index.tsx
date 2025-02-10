import { View } from 'react-native';
import Button from '../../Button';
import Icon from '../../Icon';
import soundI from '../../../assets/svg/icons/SoundIcon.svg';
import muteI from '../../../assets/svg/icons/MuteSoundIcon.svg';

type Props = {
	onPress: () => void;
	isSoundOn: boolean;
};

const SoundAlarm: React.FC<Props> = ({ onPress, isSoundOn }): React.JSX.Element => {
	return (
		<View>
			<Button isRounded={true} onPress={onPress}>
				<Icon icon={isSoundOn ? soundI : muteI} width={24} height={24} />
			</Button>
		</View>
	);
};

export default SoundAlarm;
