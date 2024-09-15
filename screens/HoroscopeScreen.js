import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES, icons } from '@/constants';
import { useTheme } from '@/theme/ThemeProvider';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import Button from '@/components/Button';


export default function HoroscopeScreen() {
    const { colors, dark } = useTheme();
    const navigation = useNavigation();

    const [selectedMomHoroscope, setSelectedMomHoroscope] = useState('');
    const [selectedBabyHoroscope, setSelectedBabyHoroscope] = useState('');
    const [showWarning, setShowWarning] = useState(false);


    const horoscopeData = [
        { label: 'Koç (21 Mart - 20 Nisan)', value: 1 }, 
        { label: 'Boğa (21 Nisan - 20 Mayıs)', value: 2 },
        { label: 'İkizler (21 Mayıs - 21 Haziran)', value: 3 }, 
        { label: 'Yengeç (22 Haziran - 22 Temmuz)', value: 4 }, 
        { label: 'Aslan (23 Temmuz - 23 Ağustos)', value: 5 },
        { label: 'Başak (24 Ağustos - 23 Eylül)', value: 6 }, 
        { label: 'Terazi (24 Eylül - 23 Ekim)', value: 7 },
        { label: 'Akrep (24 Ekim - 22 Kasım)', value: 8 }, 
        { label: 'Yay (23 Kasım - 21 Aralık)', value: 9 }, 
        { label: 'Oğlak (22 Aralık - 20 Ocak)', value: 10 },
        { label: 'Kova (21 Ocak - 19 Şubat)', value: 11 }, 
        { label: 'Balık (20 Şubat - 20 Mart)', value: 12 },
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
                }]}>Horoscope Compatibility</Text>
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
                    }]}>Annenin Burcu</Text>
                <RNPickerSelect
                    placeholder={{ label: "Annenin Burcu", value: 'Seçiniz' }}
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
                    }]}>Bebebğin Burcu</Text>
                <RNPickerSelect
                    placeholder={{ label: "Bebeğin Burcu", value: 'Seçiniz' }}
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
            <Button title="Burç Seçimi Yapınız !" filled /> ) :  <Button title="Burç Uyumunu Görün" onPress={handlePress} filled />
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