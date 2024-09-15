import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Entypo } from '@expo/vector-icons';
import Button from './Button';
import { COLORS, SIZES } from '../constants';
import { useNavigation, useRoute } from '@react-navigation/native';
import { WeightControl } from '@/screens';
import { WeightContext } from '@/Contexts/WeightContext';


export default function WeightComp() {

        const navigation = useNavigation();

        const {lastWeight} = useContext(WeightContext);

        useEffect(() => {}, [lastWeight]);

        console.log('comp: ', lastWeight);
 

    return (
        <View style={styles.container}>
            <Text style={styles.weightText}> {lastWeight ? `${lastWeight} KG` : '0 KG'}</Text>
            <View>
                <Entypo name="ruler" size={30} color={COLORS.primary} style={styles.icon}/>
                <Text style={styles.text}>Annenin Kilosu</Text>
                <Button style={styles.button} filled onPress={()=> navigation.navigate('WeightControl')} title= 'Kilo Ekleyin' />
            </View>
        </View>
      );
    }
    
    const styles = StyleSheet.create({
        container: {
            width: SIZES.width - 32,
            height: 260,
            borderRadius: 20,
            borderTopWidth: 1,
            marginTop: 20,
            borderColor: COLORS.greyscale300,
            borderWidth: 1,
        },
        weightText: {
            fontSize: 70,
            textAlign: 'center',
            color: COLORS.primary,
            fontWeight: 'bold',
            borderBottomColor: COLORS.greyscale300,
            borderBottomWidth: 1,
        },
        text: {
            fontSize: 18,
            color: COLORS.primary,
            fontWeight: 'bold',
            textAlign: 'center',
        },
        icon: {
            marginLeft: 10,
            marginTop: 10,
        },
        button: {
            width: SIZES.width - 32,
            borderRadius: 30,
            marginVertical: 6,
        }

    })