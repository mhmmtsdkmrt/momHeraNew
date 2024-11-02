import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
import { useTheme } from '../theme/ThemeProvider';
import { COLORS, SIZES } from '../constants';
import { ProfileContext } from '../Contexts/ProfileGetApi';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from '@/Contexts/useTranslation';


export default function EstimatedDateOfBirth() {

    const {colors, dark} = useTheme();
    const navigation = useNavigation();
    const {t} = useTranslation();

    const { remainingWeeks, remainingDays, currentTrimester, formattedDate, currentWeek } = useContext(ProfileContext);

    const imageUri = {uri: 'https://momhera.com/Theme/dashboard/assets/dist/img/corner.png'};   


  return (
    <View style={[styles.container , { backgroundColor: dark ? COLORS.dark2 : COLORS.white } ]}>
    <ImageBackground style={styles.tableContainer} borderRadius={11}  resizeMode='cover' 
        resizeMethod='resize' source={imageUri}
        borderColor= '#f4c2c2'
        borderWidth= {0.2}>
    <Text style={styles.header}>{remainingWeeks} {t.week}, {remainingDays} {t.dayLeft}</Text>
    <Text style={styles.trimister}>{currentTrimester}</Text> 
    {/* https://www.unibaby.com.tr/faydali-bilgiler/trimester-nedir-trimester-donemleri-nasil-belirlenir/
    1. trimester, ilk üç aylık süreci kapsar. 0-13 haftalık süreç de diyebiliriz. 
    2. trimester gebeliğinizin 14. haftası itibariyle başlar ve 27. haftasına kadar devam eder.
    28. haftadan itibaren başlayan 3. trimester 40. haftaya kadar uzanır.
    */}
    <View style={styles.row}>
    <Text style={styles.text}>{t.estimatedBirth} {formattedDate} </Text>
    <TouchableOpacity 
    onPress={()=>navigation.navigate("EditPregnancyInfo")}
    >
      {/* <Text style={[styles.link]}>{t.edit}</Text> */}
    </TouchableOpacity>



    </View>
    </ImageBackground>

</View>
    // <View style={[styles.container , { backgroundColor: dark ? COLORS.dark2 : COLORS.white } ]}>
    //     <View style={styles.tableContainer}>
    //     <Text style={styles.header}>{remainingWeeks} {t.week}, {remainingDays} {t.dayLeft}</Text>
    //     <Text style={styles.trimister}>{currentTrimester}</Text> 
    //     {/* https://www.unibaby.com.tr/faydali-bilgiler/trimester-nedir-trimester-donemleri-nasil-belirlenir/
    //     1. trimester, ilk üç aylık süreci kapsar. 0-13 haftalık süreç de diyebiliriz. 
    //     2. trimester gebeliğinizin 14. haftası itibariyle başlar ve 27. haftasına kadar devam eder.
    //     28. haftadan itibaren başlayan 3. trimester 40. haftaya kadar uzanır.
    //     */}
    //     <View style={styles.row}>
    //     <Text style={styles.text}>{t.estimatedBirth} {formattedDate} </Text>
    //     <TouchableOpacity 
    //     onPress={()=>navigation.navigate("EditPregnancyInfo")}
    //     >
    //       <Text style={[styles.link]}>{t.edit}</Text>
    //     </TouchableOpacity>

    //     </View>

    //     </View>

    // </View>
  );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        width: SIZES.width - 10,
        height: 110,
        //borderWidth: 1.3,
        borderColor: COLORS.greyscale300,
        borderRadius: 11,
        marginTop: 5,
        marginRight: 0,
        padding: 7,
        backgroundColor: COLORS.primary,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 11,
        
        elevation: 6,
        opacity: 0.8,

    },
    tableContainer: {
        flex: 1,
        padding: 7,
        marginHorizontal: -5,
    },
    link: {
        // fontWeight: 'bold',
        // color: COLORS.primary,
        fontSize: 16,
        fontFamily: "medium",
        marginLeft: 12,
        color: COLORS.primary,
    },
    row: {
        marginVertical: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    header: {
        fontSize: 18,
        fontFamily: "semiBold",
        color: COLORS.text,
    },
    trimister: {
        color: COLORS.text,
    },
    text: {
        color: COLORS.text,
    },
})