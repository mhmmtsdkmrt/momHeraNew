import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { ScrollView } from "react-native-virtualized-view";
import Button from "../components/Button";
import { useTheme } from '../theme/ThemeProvider';
import RNPickerSelect from 'react-native-picker-select';
import { COLORS, SIZES, FONTS, icons  } from '../constants';
import { Feather } from "@expo/vector-icons";
import Dropdown from '../components/Dropdown';
import RadioButtonGroup from '../components/RadioButtonGroup';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { getToken } from '../apiConnections/RegisterApi';
import { apiProfile, apiProfileGet, apiProfilePut } from '../apiConnections/ProfilesApi';
import { useTranslation } from '@/Contexts/useTranslation';


const EditPregnancyInfo = ({ navigation }) => {
    const { colors, dark } = useTheme();
    const { t } = useTranslation();

    const [startedDate, setStartedDate] = useState("Select Date");
    const [selectedBasedOn, setSelectedBasedOn] = useState('');
    const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
    const [embryoAge, setEmbryoAge] = useState(3); // 3 veya 5 günlük embriyo
    const [ultrasoundWeek, setUltrasoundWeek] = useState(6);
    const [ultrasoundDay, setUltrasoundDay] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState();

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
          maxDate.setFullYear(today.getFullYear() + 1);
          return maxDate;
      };
  
      const getMinimumDate = () => {
          let minDate = new Date();
          switch (selectedBasedOn) {
              case '1':
                  return today;
              default:
                  minDate.setMonth(today.getMonth() - 3);
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


      const dueDateLocale = new Date(calculateDueDate()).toLocaleDateString();
      const dueDate = calculateDueDate();

      const startDateLocale =  new Date(startedDate).toLocaleDateString();


            // API Operations

            const handleSubmit = async () => {

              const token = await getToken();
      
            if(!token) {
              Alert.alert(`${t.anErrorOccured}`, `${t.tokenNotFound}`);
              return;
            }
      
            //const id = 'D30431AE-BF3B-4A92-7749-08DCBEB7E17E';
            const userId = '000258F6-9121-41D6-DB97-08DCC4241ECB';
      
            const existingData = await apiProfileGet(userId, token);
      
            console.log('userıd:', existingData.userId);
      
      
            if (!existingData) {
                Alert.alert(`${t.anErrorOccured}`, `${t.notPullData}`);
                return;
            }
      
            const data = {
              babyName: existingData.babyName,
              enumBabyGender: existingData.enumBabyGender,
              enumParentType: existingData.enumParentType,
              firstName: existingData.firstName,
              id: existingData.id,
              isBabyBorn: existingData.isBabyBorn,
              isMiscarriage: existingData.isMiscarriage,
              lastName: existingData.lastName,
              motherAge: existingData.motherAge,
              nickName: existingData.nickName,
              userId: userId,
              isPregnant: existingData.isPregnant,
              //güncellenecekler
              enumPregnancyCalculateType: selectedBasedOn,
              estimatedBirthDate: dueDate,
            };
      
            setIsSubmitting(true);
            console.log(token);
          
            try {
              const response = await apiProfilePut(data); 
              Alert.alert(`${t.success}`, `${t.successfullyUpdate}`);
              console.log('Response:', response);
              // Burada başka bir sayfaya yönlendirme
              navigation.navigate("Profile");
            } catch (error) {
              Alert.alert(`${t.error}`, `${t.notCreatingProfile}`);
              console.error('There was an error!', error);
            } finally {
              setIsSubmitting(false);
            }
          };
 

    return (
        <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <Header title={t.setPregnancyDate} />
                <ScrollView contentContainerStyle={styles.center}>
                    <Text style={[styles.title, {
                        color: dark ? COLORS.white : COLORS.greyscale900
                    }]}>{t.calculateYourDate}</Text>

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
                                                >{ startDateLocale === 'Invalid Date' ? <Text style={{ ...FONTS.body4, color: COLORS.grayscale400}}>{t.selectDate}</Text> : <Text style={{ ...FONTS.body4, color: COLORS.grayscale400}}>{startDateLocale}</Text>}
                                                
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
    

          {selectedBasedOn !== '' && ( 
            <View style={[styles.resultBox, {
              backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500,
              borderColor: dark ? COLORS.dark2 : COLORS.greyscale500,
            }]}>
                {dueDateLocale === 'Invalid Date' ? '' :
              <Text style={[styles.resultText, { color: dark ? COLORS.white : COLORS.greyscale900 }]}>
                {t.estimatedBirthDate}: {dueDateLocale}
              </Text>}
            </View>
          )}


                </ScrollView>
            </View>
            <View style={styles.bottomContainer}>      
                     <Button
                    title={isSubmitting ? `${t.updating}` : `${t.update}`}
                    filled
                    style={styles.button}
                    onPress={handleSubmit}
                    disabled={isSubmitting}
                />
                </View> 
 
        </SafeAreaView>
        
    )    


};

const styles = StyleSheet.create({
    area: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: COLORS.white
    },
    title: {
        fontSize: 18,
        fontFamily: "medium",
        color: COLORS.greyscale900,
        textAlign: "center",
        marginVertical: 64
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
    center: {
        flex: 1,
        justifyContent: "center",
        marginBottom: 144
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
        marginTop: 12,
        padding: 8
      },
      resultText: {
        fontSize: 18,
        fontFamily: "medium",
      }

})

export default EditPregnancyInfo