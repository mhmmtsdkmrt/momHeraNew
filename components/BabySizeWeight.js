import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS, SIZES } from '../constants';
import { useNavigation, useTheme } from '@react-navigation/native';
import { ProfileContext } from '../Contexts/ProfileGetApi';
import { pregnancyData } from '../data';


export default function BabySizeWeight() {
    const { colors, dark } = useTheme();
    const navigation = useNavigation();
    
   const {currentWeek} = useContext(ProfileContext);

    const data = pregnancyData[currentWeek];




  return (
    <View style={{flexDirection: 'row', marginTop: 50}}>
    {/* Bebeğin Boyu */}
    <View style={styles.container}>
        <View style={styles.icon}>
        <Entypo name="ruler" size={24} color= {COLORS.primary} />
        </View>
        <View style={styles.titleContainer}>
            <View>
            <Text style={styles.headerTitle}>Size</Text>
            <View style={styles.countContainer}>
            <Text style={styles.weightTitle}>≈{data.size}</Text>
            <Text style={styles.rateTitle}>↑{data.sizeRate}</Text>
            </View>
            </View>
        </View>
    </View>
    {/* Bebeğin kilosu */}
    <View style={styles.container}>
        <View style={styles.icon}>
          <Ionicons name="scale-outline" size={24} color={COLORS.primary} />
          </View>
        <View style={styles.titleContainer}>
            <View>
            <Text style={styles.headerTitle}>Weight</Text>
            <View style={styles.countContainer}>
            <Text style={styles.weightTitle}>≈{data.weight}</Text>
            <Text style={styles.rateTitle}>↑{data.weightRate}</Text>
            </View>
            </View>
        </View>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: (SIZES.width - 64)/2 ,
        height: 70,
        marginTop: 120,
        marginLeft: 10,
        borderRadius: 20,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        
        elevation: 6,
        opacity: 0.8,
    },
    icon: {
        backgroundColor: COLORS.tansparentPrimary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 30,
        borderRadius: 20,
        width: 50,
        height: 50,
        margin: 10,
    },
    titleContainer: {
        flexDirection: 'column',
        marginTop: 10,
        marginHorizontal: -10
    },
    headerTitle:{
        fontSize: 16,
        fontFamily: "semiBold",
        color: COLORS.black
    },
    countContainer: {
        //flexDirection: 'row',
        marginTop: 5,
    },
    weightTitle: {
        fontSize: 13,
        fontFamily: "semiBold",
        color: COLORS.black
    },
    rateTitle: {
        marginLeft: 1,
        fontSize: 12,
        fontFamily: "semiBold",
        color: COLORS.primary
    }

})