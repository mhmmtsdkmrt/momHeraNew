import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES, icons } from '@/constants';
import { useTheme } from '@/theme/ThemeProvider';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import Button from '@/components/Button';
import { useTranslation } from '@/Contexts/useTranslation';


export default function HoroscopeScreen() {
    const { colors, dark } = useTheme();
    const navigation = useNavigation();

    const [selectedMomHoroscope, setSelectedMomHoroscope] = useState('');
    const [selectedBabyHoroscope, setSelectedBabyHoroscope] = useState('');
    const [showWarning, setShowWarning] = useState(false);
    const { t } = useTranslation();


    const horoscopeData = [
        { label: `${t.aries}`, value: 1 }, 
        { label: `${t.taurus}`, value: 2 },
        { label: `${t.gemini}`, value: 3 }, 
        { label: `${t.cancer}`, value: 4 }, 
        { label: `${t.leo}`, value: 5 },
        { label: `${t.virgo}`, value: 6 }, 
        { label: `${t.libra}`, value: 7 },
        { label: `${t.scorpio}`, value: 8 }, 
        { label: `${t.sagittarius}`, value: 9 }, 
        { label: `${t.capricorn}`, value: 10 },
        { label: `${t.aquarius}`, value: 11 }, 
        { label: `${t.pisces}`, value: 12 },
      ];


    const handleMomHoroscopeChange = (value) => {
        setSelectedMomHoroscope(value);
    };
    
    const handleBabyHoroscopeChange = (value) => {
        setSelectedBabyHoroscope(value);
    }; 
    
    
    const handlePress = () => {
        if (!selectedMomHoroscope || !selectedBabyHoroscope) {
            setShowWarning(true);  // Uyarıyı göster
            setTimeout(() => setShowWarning(false), 2000);  // 2 saniye sonra uyarıyı gizle
        } else {
            navigation.navigate('HoroscopeDetailScreen', { momHoroscope: selectedMomHoroscope, babyHoroscope: selectedBabyHoroscope });
        }
    };




   /**
   * render header
   */
    const renderHeader = ()=>{
        return (
          <View style={styles.headerContainer}>
             <View style={styles.headerLeftContainer}>
             <TouchableOpacity
                onPress={() => navigation.goBack()}>
                <Image
                  source={icons.back}
                  resizeMode='contain'
                  style={[styles.backIcon, { 
                    tintColor: dark? COLORS.white : COLORS.greyscale900
                  }]}
                />
              </TouchableOpacity>
                <Text style={[styles.headerTitle, {
                  color: dark ? COLORS.white : COLORS.greyscale900
                }]}>{t.horoscopeCompatibility}</Text>
             </View>
          </View>
        )
      }


  return (
    <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {renderHeader()}

        <View style={[styles.subContainer, { backgroundColor: colors.background}]}>
        <Text style={[styles.title, {
                        color: dark ? COLORS.white : COLORS.greyscale900
                    }]}>{t.momHoroscope}</Text>
                <RNPickerSelect
                    placeholder={{ label: `${t.momHoroscope}`, value: 'Seçiniz' }}
                    items={horoscopeData}
                    onValueChange={(value) => handleMomHoroscopeChange(value)}
                    value={selectedMomHoroscope}
                    style={{
                    inputIOS: {
                        marginTop: 8,
                        fontSize: 16,
                        paddingHorizontal: 10,
                        borderRadius: 4,
                        color: COLORS.greyscale600,
                        paddingRight: 30,
                        height: 52,
                        width: SIZES.width - 32,
                        alignItems: 'center',
                        backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                        borderRadius: 16
                    },
                    inputAndroid: {
                        marginTop: 8,
                        fontSize: 16,
                        paddingHorizontal: 10,
                        borderRadius: 8,
                        color: COLORS.greyscale600,
                        paddingRight: 30,
                        height: 52,
                        width: SIZES.width - 32,
                        alignItems: 'center',
                        backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                        borderRadius: 16
                    },
                    }}
                    />   
        <Text style={[styles.title, {
                        color: dark ? COLORS.white : COLORS.greyscale900
                    }]}>{t.babyHoroscope}</Text>
                <RNPickerSelect
                    placeholder={{ label: `${t.babyHoroscope}`, value: 'Seçiniz' }}
                    items={horoscopeData}
                    onValueChange={(value) => handleBabyHoroscopeChange(value)}
                    value={selectedBabyHoroscope}
                    style={{
                    inputIOS: {
                        marginTop: 8,
                        fontSize: 16,
                        paddingHorizontal: 10,
                        borderRadius: 4,
                        color: COLORS.greyscale600,
                        paddingRight: 30,
                        height: 52,
                        width: SIZES.width - 32,
                        alignItems: 'center',
                        backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                        borderRadius: 16
                    },
                    inputAndroid: {
                        marginTop: 8,
                        fontSize: 16,
                        paddingHorizontal: 10,
                        borderRadius: 8,
                        color: COLORS.greyscale600,
                        paddingRight: 30,
                        height: 52,
                        width: SIZES.width - 32,
                        alignItems: 'center',
                        backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                        borderRadius: 16
                    },
                    }}
                    /> 


            <View style={{marginTop: 25}}>
            {showWarning ? (
            <Button title={t.chooseHoroscope} filled /> ) :  <Button title={t.seeHoroscope} onPress={handlePress} filled />
            }
            </View>



    </View>  
    </View>
    </SafeAreaView>
    
  );
  
}




const styles = StyleSheet.create({
    area: {
        flex: 1,
        backgroundColor: COLORS.white
      },
      container: {
        flex: 1,
        backgroundColor: COLORS.white,
        width: SIZES.width - 32,
      },
      headerContainer: {
        width: SIZES.width - 32,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginLeft: 12,
        paddingTop: getStatusBarHeight(),
      },
      headerLeftContainer: {
        flexDirection: "row",
        alignItems: "center"
      },
      backIcon: {
        height: 24,
        width: 24,
        tintColor: COLORS.black
      },
      headerTitle: {
        fontSize: 22,
        fontFamily: "bold",
        color: COLORS.greyscale900,
        marginLeft: 12
      },
      subContainer: {
        margin: 15,
        marginTop: 100
      },
      title: {
        fontSize: 18, 
        fontFamily: "medium",
        textAlign: 'left',
        marginVertical: 15
      },
})