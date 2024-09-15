import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { COLORS, SIZES } from '../constants';
import { ProfileContext } from '../Contexts/ProfileGetApi';
import { useNavigation } from '@react-navigation/native';
import { pregnancyData } from '../data';


export default function HowMuchToday () {

        const navigation = useNavigation();

        const {currentWeek} = useContext(ProfileContext);

        const data = pregnancyData[currentWeek];


  return (
    <View style={styles.container}>
        <Image 
        style={styles.image}
        source={data.image}/>
        {currentWeek < 4 ? <Text style={styles.text}>{data.title}</Text> :  <Text style={styles.text}>Bebeğinizin boyutu {data.title} büyüklüğünde</Text>}

    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        width: SIZES.width - 32,
        height: 190,
        borderRadius: 20,
        borderTopWidth: 1,
        marginTop: 20,
        borderColor: COLORS.greyscale300,
        borderWidth: 1,
    },
    image: {
        resizeMode: 'contain',
        resizeMethod: 'resize',
        width: 140,
        height: 140,
        marginLeft: 130,
    },
    text: {
        fontSize: 17,
        textAlign: 'center',
        color: COLORS.primary,
        fontWeight: 'bold',
    },

})