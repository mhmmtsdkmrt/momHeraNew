import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-virtualized-view';
import { useTheme } from '../theme/ThemeProvider';
import { COLORS, FONTS, SIZES, icons } from '../constants';
import RNPickerSelect from 'react-native-picker-select';
import { Feather } from "@expo/vector-icons";
import Dropdown from '../components/Dropdown';
import RadioButtonGroup from '../components/RadioButtonGroup';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { pregnancyData } from '@/data';
import Button from '@/components/Button';
import { useTranslation } from '@/Contexts/useTranslation';



const CalculatePregnancyScreen = ({ navigation }) => {
  const { dark, colors } = useTheme();
  const { t } = useTranslation();

  const [startedDate, setStartedDate] = useState("Select Date");
  const [selectedBasedOn, setSelectedBasedOn] = useState('');
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [embryoAge, setEmbryoAge] = useState(3); // 3 veya 5 günlük embriyo
  const [ultrasoundWeek, setUltrasoundWeek] = useState(6);
  const [ultrasoundDay, setUltrasoundDay] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();

  const [remainingWeeks, setRemainingWeeks] = useState(0);
  const [remainingDays, setRemainingDays] = useState(0);
  const [currentTrimester, setCurrentTrimester] = useState('');
  const [formattedDate, setFormattedDate] = useState('');
  const [elapsedWeeks, setElapsedWeeks] = useState(0);
  const [elapsedDays, setElapsedDays] = useState(0);
  const [currentWeek, setCurrentWeek] = useState(0);

  
  const [showResults, setShowResults] = useState(false);
  const [showWarning, setShowWarning] = useState(false);




  const basedOnDateOptions = [
      { label: `${t.knowPregnancyDay}`, value: 1 }, // I know pregnancy day
      { label: `${t.lastPeriod}` , value: 2 }, // Last period
      { label: `${t.estimateConception}`, value: 3 }, // estimate conception date
      { label: `${t.IVF}`, value: 4 }, // IVF
      { label: `${t.ultrason}`, value: 5 },
    ];


  const handleBasedOnChange = (value) => {
      setSelectedBasedOn(value);
    };

    const today = new Date();

    const getMaximumDate = () => {
        let maxDate = new Date();
        switch (selectedBasedOn) {
          case 1: //doğum tarihini biliyorsa max date 8 ay sonra  
              maxDate.setMonth(today.getMonth() + 9);
              return maxDate;
          case 2: // Son regl tarihinin ilk günü bugünden seçer
              maxDate.setDate(today.getDate() - 6);
              return maxDate;
          case 3: // tahmini gebe kalma tarihini bugünden seçer
              maxDate.setDate(today.getDate() + 8);
              return maxDate;
          case 4: // Tüp Bebek transferinin  5 gün sonrası için seçebilir.
              maxDate.setDate(today.getDate() + 5);
              return maxDate;
          case 5: // Ultrason zaten belli olmuştur. 
              return today;
        }
    };

    const getMinimumDate = () => {
        let minDate = new Date();
        switch (selectedBasedOn) {
            case 1:  // doğum tarhini biliyorsa picker bugünden başlar.
                return today;
            case 2: // Son regl tarihinin ilk günü seçimini 6 ay öncesinde yapabilir.
                minDate.setMonth(today.getMonth() - 9);
                return minDate;
            case 3: // tahmini gebe kalma tarihini seçimini 8 ay öncesinde yapabilir.
                minDate.setMonth(today.getMonth() - 8);
                return minDate;
            case 4: // Tüp Bebek transferinin min tarihi 8 ay öncesi olsun 
                minDate.setMonth(today.getMonth() - 9);
                return minDate;
            case 5: // Ultrason zaten belli olmuştur. bugünden başlasın
                minDate.setMonth(today.getMonth() - 7);
                return minDate;
        }
    };


    const handleDateChange = (event, selectedDate) => {
      setOpenStartDatePicker(false);
      if (selectedDate && event.type !== 'dismissed') {
          const formattedDate = selectedDate.toISOString();
          setStartedDate(formattedDate);
      }
  };


    const handleOnPressStartDate = () => {
      setOpenStartDatePicker(!openStartDatePicker);
    };

    const calculateDueDate = () => {
      let baseDate = new Date(startedDate);
      switch (selectedBasedOn) {
        case 1:
          return baseDate;
        case 2:
          baseDate.setDate(baseDate.getDate() + 280);
          return baseDate;
        case 3:
          baseDate.setDate(baseDate.getDate() + 266);
          return baseDate;
        case 4:
          baseDate.setDate(baseDate.getDate() + (266 - embryoAge));
          return baseDate;
        case 5:
          baseDate.setDate(baseDate.getDate() + (280 - (ultrasoundWeek * 7 + ultrasoundDay)));
          return baseDate;
        default:
          return null;
      }   
    }; 


    const dueDate = calculateDueDate();

    const startDateLocale = startedDate === 'Select Date' 
    ? 'Select Date'
    : new Date(startedDate).toLocaleDateString();


    const data = pregnancyData[elapsedWeeks];

    


    /**
     * Hesaplamalar
     */

      const calculatePregnancyDetails = () => {

        // Hamilelikte kaçıncı hafta, kaçıncı gün

        const today = new Date();
        const pregnancyDurationWeeks = 40;
        
        const totalMillisecondsRemaining = dueDate - today;
        const totalDaysRemaining = Math.floor((totalMillisecondsRemaining) / (1000 * 60 * 60 * 24));
        const weeksRemaining = Math.floor(totalDaysRemaining / 7);
        const daysRemaining = totalDaysRemaining % 7;
    
    
        setRemainingWeeks(weeksRemaining);
        setRemainingDays(daysRemaining);

        // Geçen süreyi hesapla
        const totalDaysElapsed = (pregnancyDurationWeeks * 7) - totalDaysRemaining;
        const weeksElapsed = Math.floor(totalDaysElapsed / 7);
        const daysElapsed = totalDaysElapsed % 7;
            
        setElapsedWeeks(weeksElapsed);
        setElapsedDays(daysElapsed);        

        // Hamilelikte trimester
        const currentWeek = pregnancyDurationWeeks - weeksRemaining;
        setCurrentWeek(currentWeek);
            if (currentWeek <= 13) {
            setCurrentTrimester(`${t.firstTrimester}`);
            } else if (currentWeek <= 27) {
            setCurrentTrimester(`${t.secondTrimester}`);
            } else {
            setCurrentTrimester(`${t.thirdTrimester}`);
            }
            
            
        // // Tahmini doğum tarihi format
        // const options = { day: 'numeric', month: 'short' };
        // const formatted = dueDate.toLocaleDateString('tr-TR', options);
        // setFormattedDate(formatted);


        setShowResults(true);

      };


      const handlePress = () => {
        if (selectedBasedOn === '' || startedDate === 'Select Date') {
            setShowWarning(true);  // Uyarıyı göster
            setTimeout(() => setShowWarning(false), 2000);  // 2 saniye sonra uyarıyı gizle
        } else {
          calculatePregnancyDetails();
        }
    };




  /**
 * Render header
 */
  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
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
            color: dark? COLORS.white : COLORS.greyscale900
          }]}>
            {t.calculatePregnancy}
          </Text>
        </View>
      </View>
    )
  };

  return (
      <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        
        {renderHeader()}
    
        <ScrollView showsVerticalScrollIndicator={false} >

            <View style={{ marginTop: 0}}>
                    <Text style={[styles.title, {
                        color: dark ? COLORS.white : COLORS.greyscale900
                    }]}>{t.calculateYourDate} </Text>


                        <RNPickerSelect
                            placeholder={{ label: `${t.basedOn}`, value: '' }}
                            items={basedOnDateOptions}
                            onValueChange={(value) => handleBasedOnChange(value)}
                            value={selectedBasedOn}
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

                        {selectedBasedOn === '' ? null : 
                                                <TouchableOpacity
                                                style={[styles.inputBtn, { 
                                                backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                                                borderColor: dark? COLORS.dark2 : COLORS.greyscale500,
                                                }]}
                                                onPress={handleOnPressStartDate}
                                                >
                                                {startDateLocale === "Select Date" ? 
                                                (<Text style={{ ...FONTS, color: COLORS.grayscale400}}>{t.selectDate}</Text>) : 
                                                (<Text style={{ ...FONTS, color: COLORS.grayscale400}}>{startDateLocale}</Text>)}
                                                
                                                <Feather name="calendar" size={24} color={COLORS.grayscale400} />
                                            </TouchableOpacity> }   
                
                                               
                      {openStartDatePicker && (                         
                        <RNDateTimePicker
                         testID='datePicker'
                         mode='date'
                         display='spinner'
                         value={new Date()}
                         onChange={handleDateChange}
                         maximumDate={getMaximumDate()}
                         minimumDate={getMinimumDate()}
                         />
                         )}


                        {selectedBasedOn === 4 && (
                              <RadioButtonGroup
                                  options={[
                                    { label: `${t.treeDays}`, value: 3 },
                                    { label: `${t.fiveDays}`, value: 5 },
                                    ]}
                                      selectedValue={embryoAge}
                                      onValueChange={setEmbryoAge}
                                    />
                                  )}

                      {selectedBasedOn === 5 && (
                      <>
                      <View style={styles.ultrasoundContainer}>
                        <Dropdown
                          label={t.week}
                          options={[...Array(40).keys()].map((i) => ({ label: `${i}`, value: i }))}
                          selectedValue={ultrasoundWeek}
                          onValueChange={setUltrasoundWeek}
                        />
                        <Dropdown
                          label={t.day}
                          options={[...Array(7).keys()].map((i) => ({ label: `${i}`, value: i }))}
                          selectedValue={ultrasoundDay}
                          onValueChange={setUltrasoundDay}
                        />
                        </View>
                      </>
                    )}

                        {selectedBasedOn === 1 && <Text style={[styles.subtitle, { color: dark? COLORS.secondaryWhite : COLORS.greyscale900 }]}>{t.knowPregnancyDayTitle}</Text>}
                        {selectedBasedOn === 2 && <Text style={[styles.subtitle, { color: dark? COLORS.secondaryWhite : COLORS.greyscale900 }]}>{t.lastPeriodTitle}</Text>}
                        {selectedBasedOn === 3 && <Text style={[styles.subtitle, { color: dark? COLORS.secondaryWhite : COLORS.greyscale900 }]}>{t.estimateConceptionTitle}</Text>}
                        {selectedBasedOn === 4 && <Text style={[styles.subtitle, { color: dark? COLORS.secondaryWhite : COLORS.greyscale900 }]}>{t.IVFTitle}</Text>}
                        {selectedBasedOn === 5 && <Text style={[styles.subtitle, { color: dark? COLORS.secondaryWhite : COLORS.greyscale900 }]}>{t.ultrasonTitle}</Text>}
    
            <View style={{marginTop: 25}}>
            {showWarning ? (
            <Button title={t.enterInfo} filled /> ) :  <Button title={t.calculate} onPress={handlePress} filled />
            }
            </View>



           {showResults && (           
            <><View style={styles.subResultBox}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.2, borderBottomColor: COLORS.grayscale400, margin: 5 }}>
                  <Text style={[styles.resultText, { color: dark ? COLORS.white : COLORS.greyscale900 }]}>{t.estimatedBirthDate} :</Text>
                  <Text style={[styles.resultText, { color: dark ? COLORS.white : COLORS.primary }]}>{dueDate.toLocaleDateString()} </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.2, borderBottomColor: COLORS.grayscale400, margin: 5 }}>
                  <Text style={[styles.resultText, { color: dark ? COLORS.white : COLORS.greyscale900 }]}>{t.daysToBirth} :</Text>
                  <Text style={[styles.resultText, { color: dark ? COLORS.white : COLORS.primary }]}>{(remainingWeeks * 7) + remainingDays} {t.day} </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.2, borderBottomColor: COLORS.grayscale400, margin: 5 }}>
                  <Text style={[styles.resultText, { color: dark ? COLORS.white : COLORS.greyscale900 }]}>{t.pregnantalWeek} :</Text>
                  <Text style={[styles.resultText, { color: dark ? COLORS.white : COLORS.primary }]}>{currentWeek}. {t.week}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.2, borderBottomColor: COLORS.grayscale400, margin: 5 }}>
                  <Text style={[styles.resultText, { color: dark ? COLORS.white : COLORS.greyscale900 }]}>{t.remainingInPregnancy} :</Text>
                  <Text style={[styles.resultText, { color: dark ? COLORS.white : COLORS.primary }]}>{(elapsedWeeks * 7) + elapsedDays} {t.day}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.2, borderBottomColor: COLORS.grayscale400, margin: 5 }}>
                  <Text style={[styles.resultText, { color: dark ? COLORS.white : COLORS.greyscale900 }]}>{t.trimesterPeriod} :</Text>
                  <Text style={[styles.resultText, { color: dark ? COLORS.white : COLORS.primary }]}>{currentTrimester}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.2, borderBottomColor: COLORS.grayscale400, margin: 5 }}>
                  <Text style={[styles.resultText, { color: dark ? COLORS.white : COLORS.greyscale900 }]}>{t.babysWeight} :</Text>
                  <Text style={[styles.resultText, { color: dark ? COLORS.white : COLORS.primary }]}>≈{data.weight}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.2, borderBottomColor: COLORS.grayscale400, margin: 5 }}>
                  <Text style={[styles.resultText, { color: dark ? COLORS.white : COLORS.greyscale900 }]}>{t.babysLenght} :</Text>
                  <Text style={[styles.resultText, { color: dark ? COLORS.white : COLORS.primary }]}>≈{data.size}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                  <Text style={[styles.resultText, { color: dark ? COLORS.white : COLORS.greyscale900 }]}>{t.babysSize} :</Text>
                  <Text style={[styles.resultText, { color: dark ? COLORS.white : COLORS.primary }]}>{data.title}</Text>
                </View>

              </View>
              <View style={{ borderColor: COLORS.grayscale400, borderWidth: 0.5, marginTop: 20, height: 50, borderRadius: 20}}>
              <Text style={[styles.resultText, { color: dark ? COLORS.white : COLORS.primary }]}>Buraya ilgili makeleler yapısı kurulacak.</Text>
              </View></>



              )}  
      </View>
  </ScrollView>
</View>
</SafeAreaView>
  );
};

const styles = StyleSheet.create({
    area: {
      flex: 1,
      backgroundColor: COLORS.white
    },
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
      padding: 16
    },
    title: {
      fontSize: 18,
      fontFamily: "medium",
      color: COLORS.greyscale900,
      textAlign: "center",
      marginVertical: 64
    },
    inputBtn: {
        borderWidth: 1,
        borderRadius: 12,
        borderColor: COLORS.greyscale500,
        height: 50,
        paddingLeft: 8,
        fontSize: 18,
        justifyContent: "space-between",
        marginTop: 12,
        backgroundColor: COLORS.greyscale500,
        flexDirection: "row",
        alignItems: "center",
        paddingRight: 8
      },
    headerContainer: {
      flexDirection: "row",
      width: SIZES.width - 32,
      justifyContent: "space-between",
      marginBottom: 16
    },
    headerLeft: {
      flexDirection: "row",
      alignItems: "center"
    },
    backIcon: {
      height: 24,
      width: 24,
      tintColor: COLORS.black
    },
    headerTitle: {
      fontSize: 20,
      fontFamily: 'bold',
      color: COLORS.black,
      marginLeft: 16
    },
    bottomTitle: {
      fontSize: 24,
      fontFamily: "semiBold",
      color: COLORS.black,
      textAlign: "center",
      marginTop: 12
    },
    codeContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 24,
        justifyContent: "center"
    },
    code: {
        fontSize: 18,
        fontFamily: "medium",
        color: COLORS.greyscale900,
        textAlign: "center"
    },
    time: {
        fontFamily: "medium",
        fontSize: 18,
        color: COLORS.primary
    },
    button: {
        borderRadius: 32,
        marginVertical: 32,
        width: 200,
    },
      subtitle: {
        fontSize: 14,
        color: COLORS.greyscale900,
        fontFamily: "medium",
        marginTop: 4
      },
      bottomContainer: {
        alignItems: "flex-end",
        marginRight: 20,
      },
      ultrasoundContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      resultBox: {
        borderWidth: 1,
        borderRadius: 16,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 100,
        padding: 8
      },
      resultText: {
        fontSize: 18,
        fontFamily: "medium",
        margin: 5
      },
      subResultBox: {
        borderColor: COLORS.grayscale400,
        borderWidth: 0.5,
        marginTop: 20,
        height: 350,
        borderRadius: 20
      }

  })
  
  export default CalculatePregnancyScreen