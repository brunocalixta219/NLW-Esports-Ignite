import { useState, useEffect } from 'react';
import { Image, FlatList  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native'

import logoImg from '../../assets/logo-nlw-esports.png'
import { Background } from '../../components/Background';

import { GameCard, GameCardProps } from '../../components/GameCard';
import { Heading } from '../../components/Heading';

import { styles } from './styles';

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([])

  const navigation = useNavigation()

  const handleOpenGame = ({id, title, bannerUrl}: GameCardProps) => {
    navigation.navigate('game', {id, title, bannerUrl});
  }

  const getGames = () => {
    fetch('http://192.168.15.13:3000/games')
    .then(res => res.json())
    .then(data => setGames(data))
  }

  useEffect(() => { 
    getGames() 
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image 
          source={logoImg}
          style={styles.logo}
        />

        <Heading 
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar..."
        />

        <FlatList 
          data={games}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <GameCard 
              data={item}
              onPress={() => handleOpenGame(item)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
        
        />

      </SafeAreaView>
    </Background>
  );
}