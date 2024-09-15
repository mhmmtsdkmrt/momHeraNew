import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
import { useTheme } from '../theme/ThemeProvider';
import { COLORS, SIZES } from '../constants';
import { ProfileContext } from '../Contexts/ProfileGetApi';
import { useNavigation } from '@react-navigation/native';


export default function EstimatedDateOfBirth() {

    const {colors, dark} = useTheme();
    const navigation = useNavigation();

    const { remainingWeeks, remainingDays, currentTrimester, formattedDate, currentWeek } = useContext(ProfileContext);




  return (
    <View style={[styles.container , { backgroundColor: dark ? COLORS.dark2 : COLORS.white } ]}>
        <View style={styles.tableContainer}>
        <Text style={styles.header}>{remainingWeeks} Hafta, {remainingDays} gün kaldı!</Text>
        <Text style={styles.trimister}>{currentTrimester}</Text> 
        {/* https://www.unibaby.com.tr/faydali-bilgiler/trimester-nedir-trimester-donemleri-nasil-belirlenir/
        1. trimester, ilk üç aylık süreci kapsar. 0-13 haftalık süreç de diyebiliriz. 
        2. trimester gebeliğinizin 14. haftası itibariyle başlar ve 27. haftasına kadar devam eder.
        28. haftadan itibaren başlayan 3. trimester 40. haftaya kadar uzanır.
        */}
        <View style={styles.row}>
        <Text style={styles.text}>Tahmini doğum {formattedDate} </Text>
        <TouchableOpacity 
        onPress={()=>navigation.navigate("EditPregnancyInfo")}
        >
          <Text style={[styles.link]}>Düzenle</Text>
        </TouchableOpacity>

        </View>

        </View>

    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        width: SIZES.width - 32,
        height: 110,
        borderWidth: 1.3,
        borderColor: COLORS.greyscale300,
        borderRadius: 20,
        marginTop: 30,
        marginRight: 12,
        padding: 7,
        backgroundColor: COLORS.primary,

    },
    tableContainer: {
        flex: 1,
        marginHorizontal: 8,
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