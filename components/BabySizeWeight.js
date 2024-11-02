import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS, SIZES } from '../constants';
import { useNavigation, useTheme } from '@react-navigation/native';
import { ProfileContext } from '../Contexts/ProfileGetApi';
import { pregnancyData } from '../data';
import { useTranslation } from '@/Contexts/useTranslation';


export default function BabySizeWeight() {
    const { colors, dark } = useTheme();
    const navigation = useNavigation();


    const {t} = useTranslation(); 
    const {currentWeek} = useContext(ProfileContext);

    const data = pregnancyData[currentWeek];
    const imageUri = {uri: 'https://momhera.com/Theme/dashboard/assets/dist/img/corner.png'};    




  return (
    <View style={{flexDirection: 'row', marginTop: 50}}>
    {/* Bebeğin Boyu */}
    <ImageBackground style={styles.container} borderRadius={11} resizeMode='cover' 
        resizeMethod='resize' source={imageUri}>
            <View style={{flexDirection: 'row' }}>
            <View style={{flexDirection: 'row'}}>
        <View style={styles.icon}>
        <Entypo name="ruler" size={24} color= '#f4c2c2' />
        </View>
        <View style={styles.titleContainer}>
            <View>
            <Text style={styles.headerTitle}>{t.size}</Text>
            <View style={styles.countContainer}>
            <Text style={styles.weightTitle}>≈{data.size}</Text>
            <Text style={styles.rateTitle}>↑{data.sizeRate}</Text>
            </View>
            </View>
        </View>
        </View>
        <View style={{flexDirection: 'row', marginLeft: 10}}> 
        <View style={styles.icon}>
          <Ionicons name="scale-outline" size={24} color='#f4c2c2' />
          </View>
        <View style={styles.titleContainer}>
            <View>
            <Text style={styles.headerTitle}>{t.weight}</Text>
            <View style={styles.countContainer}>
            <Text style={styles.weightTitle}>≈{data.weight}</Text>
            <Text style={styles.rateTitle}>↑{data.weightRate}</Text>
            </View>
            </View>
        </View>
        </View>
        </View>
    </ImageBackground>
    {/* <View style={styles.container}>
        <View style={styles.icon}>
        <Entypo name="ruler" size={24} color= {COLORS.primary} />
        </View>
        <View style={styles.titleContainer}>
            <View>
            <Text style={styles.headerTitle}>{t.size}</Text>
            <View style={styles.countContainer}>
            <Text style={styles.weightTitle}>≈{data.size}</Text>
            <Text style={styles.rateTitle}>↑{data.sizeRate}</Text>
            </View>
            </View>
        </View>
    </View> */}
    {/* Bebeğin kilosu */}

    {/* <ImageBackground style={styles.container}  resizeMode='cover' borderRadius={11}
        resizeMethod='resize' source={imageUri}>
        <View style={styles.icon}>
          <Ionicons name="scale-outline" size={24} color='#f4c2c2' />
          </View>
        <View style={styles.titleContainer}>
            <View>
            <Text style={styles.headerTitle}>{t.weight}</Text>
            <View style={styles.countContainer}>
            <Text style={styles.weightTitle}>≈{data.weight}</Text>
            <Text style={styles.rateTitle}>↑{data.weightRate}</Text>
            </View>
            </View>
        </View>
    </ImageBackground> */}
    {/* <View style={styles.container}>
        <View style={styles.icon}>
          <Ionicons name="scale-outline" size={24} color={COLORS.primary} />
          </View>
        <View style={styles.titleContainer}>
            <View>
            <Text style={styles.headerTitle}>{t.weight}</Text>
            <View style={styles.countContainer}>
            <Text style={styles.weightTitle}>≈{data.weight}</Text>
            <Text style={styles.rateTitle}>↑{data.weightRate}</Text>
            </View>
            </View>
        </View>
    </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: (SIZES.width - 20) ,
        height: 70,
        marginTop: 170,
        marginLeft: 0,
        borderRadius: 11,
        backgroundColor: 'white',
        borderColor: '#f4c2c2',
        borderWidth: 0.2,
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
        //backgroundColor: '#e7dfe4', 
        //backgroundColor: COLORS.tansparentPrimary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 30,
        borderRadius: 20,
        width: 50,
        height: 50,
        margin: 10,
        borderColor: '#f4c2c2',
        borderWidth: 0.5,
        //marginLeft: 20,
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