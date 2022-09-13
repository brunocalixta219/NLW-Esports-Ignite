import { ImageBackground } from 'react-native';

import { styles } from './styles';

import backgroundImg from '../../assets/background-galaxy.png';

interface Props {
    children: React.ReactNode;
}

export function Background( {children}: Props) {
  return (
    <ImageBackground 
        style={styles.container}
        defaultSource={backgroundImg}
        source={backgroundImg}
    >
        {children}
    </ImageBackground>
  );
}