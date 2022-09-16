import {useEffect, useState} from 'react';

import { View, TouchableOpacity, Image, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useRoute, useNavigation} from '@react-navigation/native';
import {Entypo} from '@expo/vector-icons'

import logoImg from '../../assets/logo-nlw-esports.png'

import { styles } from './styles';

import { THEME } from '../../theme';
import { GameParams } from '../../@types/navigation';

import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { DuoMatch } from '../../components/DuoMatch';

export function Game() {  
    const [ads, setAds] = useState<DuoCardProps[]>([]);
    const [discordDuoSelected, setDiscordDuoSelected] = useState<string>('');

    const navigation = useNavigation();
    const route = useRoute();
    const game = route.params as GameParams;

    const handleGoBack = () => {
        navigation.goBack();
    }

    const getDiscordUser = async (adsId: string) => {
        fetch(`http://192.168.15.13:3000/ads/${adsId}/discord`)
        .then(res => res.json())
        .then(data => setDiscordDuoSelected(data.discord))
    }

    const getGames = () => {
        fetch(`http://192.168.15.13:3000/games/${game.id}/ads`)
        .then(res => res.json())
        .then(data => setAds(data))
      }
    
      useEffect(() => { 
        getGames() 
      }, [])

  return (
    <Background>
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleGoBack}>
                    <Entypo 
                        name="chevron-thin-left"
                        color={THEME.COLORS.CAPTION_300}
                        size={20}

                    />
                </TouchableOpacity>

                <Image 
                    source={logoImg}
                    style={styles.logo}
                />

                <View style={styles.right} />
            </View>

            <Image 
                source={{uri: game.bannerUrl}}
                style={styles.cover}
                resizeMode="cover"
            />


            <Heading 
                title={game.title}
                subtitle="Conecte-se e comece a jogar!"
            />
            
            <FlatList 
                data={ads}
                keyExtractor={item => item.id}
                renderItem={({item}) => <DuoCard data={item} onConnect={() => getDiscordUser(item.id)}/>}
                horizontal
                style={styles.containerList}
                contentContainerStyle={[ads.length > 0 ? styles.contentList : styles.emptyListContent]}
                showsHorizontalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <Text style={styles.emptyListText}>
                        Não há anúncios ainda
                    </Text>
                )}
            />
            
            <DuoMatch 
                visible={discordDuoSelected.length > 0}
                discord="TESTE"
                onClose={() => setDiscordDuoSelected("")}
            />
        </SafeAreaView>
    </Background>
  );
}