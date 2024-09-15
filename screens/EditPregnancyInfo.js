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


const EditPregnancyInfo = ({ navigation }) => {
    const { colors, dark } = useTheme();

    const [startedDate, setStartedDate] = useState("Select Date");
    const [selectedBasedOn, setSelectedBasedOn] = useState('');
    const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
    const [embryoAge, setEmbryoAge] = useState(3); // 3 veya 5 günlük embriyo
    const [ultrasoundWeek, setUltrasoundWeek] = useState(6);
    const [ultrasoundDay, setUltrasoundDay] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState();

    const basedOnDateOptions = [
      { label: 'Doğum tarihimi biliyorum', value: 1 }, // I know pregnancy day
      { label: 'Son regl tarihinin ilk günü', value: 2 }, // Last period
      { label: 'Tahmini gebe kalma tarihi', value: 3 }, // estimate conception date
      { label: 'Tüp bebek transferi', value: 4 }, // IVF
      { label: 'Ultrason', value: 5 },
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
              Alert.alert('Hata', 'Token Bulunamadı.');
              return;
            }
      
            //const id = 'D30431AE-BF3B-4A92-7749-08DCBEB7E17E';
            const userId = '000258F6-9121-41D6-DB97-08DCC4241ECB';
      
            const existingData = await apiProfileGet(userId, token);
      
            console.log('userıd:', existingData.userId);
      
      
            if (!existingData) {
                Alert.alert('Hata', 'Mevcut veriler çekilemedi.');
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
              Alert.alert('Success', 'Gebelik bilgileri başarıyla güncellendi!');
              console.log('Response:', response);
              // Burada başka bir sayfaya yönlendirme
              navigation.navigate("Profile");
            } catch (error) {
              Alert.alert('Error', 'An error occurred while creating the profile.');
              console.error('There was an error!', error);
            } finally {
              setIsSubmitting(false);
            }
          };
 

    return (
        <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <Header title="Select Pregnancy Date" />
                <ScrollView contentContainerStyle={styles.center}>
                    <Text style={[styles.title, {
                        color: dark ? COLORS.white : COLORS.greyscale900
                    }]}>Doğum tarihinizi belirleyin. </Text>

                        <RNPickerSelect
                            placeholder={{ label: "Based On?", value: '' }}
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
                                                >{ startDateLocale === 'Invalid Date' ? <Text style={{ ...FONTS.body4, color: COLORS.grayscale400}}>Select Date</Text> : <Text style={{ ...FONTS.body4, color: COLORS.grayscale400}}>{startDateLocale}</Text>}
                                                
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
                      

                         {/* <DatePickerModal
                            open={openStartDatePicker}
                            startDate={startDate}
                            selectedDate={startedDate}
                            onClose={() => setOpenStartDatePicker(false)}
                            onChangeStartDate={(date) => setStartedDate(date)}
                        /> */}

                        {selectedBasedOn === 4 && (
                              <RadioButtonGroup
                                  options={[
                                    { label: '3 Günlük', value: 3 },
                                    { label: '5 Günlük', value: 5 },
                                    ]}
                                      selectedValue={embryoAge}
                                      onValueChange={setEmbryoAge}
                                    />
                                  )}

                      {selectedBasedOn === 5 && (
                      <>
                      <View style={styles.ultrasoundContainer}>
                        <Dropdown
                          label="Hafta"
                          options={[...Array(40).keys()].map((i) => ({ label: `${i}`, value: i }))}
                          selectedValue={ultrasoundWeek}
                          onValueChange={setUltrasoundWeek}
                        />
                        <Dropdown
                          label="Gün"
                          options={[...Array(7).keys()].map((i) => ({ label: `${i}`, value: i }))}
                          selectedValue={ultrasoundDay}
                          onValueChange={setUltrasoundDay}
                        />
                        </View>
                      </>
                    )}

                        {selectedBasedOn === 1 && <Text style={[styles.subtitle, { color: dark? COLORS.secondaryWhite : COLORS.greyscale900 }]}>Gebelik zaman çizelgenizi görmek için bu gebelik hesaplayıcısını kullanabilirsiniz.</Text>}
                        {selectedBasedOn === 2 && <Text style={[styles.subtitle, { color: dark? COLORS.secondaryWhite : COLORS.greyscale900 }]}>Gebelik, son adet tarihinin ilk gününden itibaren hesaplanır. Bu yöntem, 28 günlük düzenli bir adet döngüsüne sahip olan kadınlar için uygundur. Son adet tarihinin ilk gününe 280 gün (40 hafta) eklenerek tahmini doğum tarihi bulunur.</Text>}
                        {selectedBasedOn === 3 && <Text style={[styles.subtitle, { color: dark? COLORS.secondaryWhite : COLORS.greyscale900 }]}>Tam olarak ne zaman gebe kaldığınızı biliyorsanız - örneğin, bir yumurtlama tahmin kiti kullanıyorsanız  veya yumurtlama semptomlarınızı takip ediyorsanız - gebe kalma tarihinizi gebe kalma tarihinize göre hesaplayabilirsiniz. </Text>}
                        {selectedBasedOn === 4 && <Text style={[styles.subtitle, { color: dark? COLORS.secondaryWhite : COLORS.greyscale900 }]}>Transfer tarihine embriyonun yaşı eklenir ve gebelik süresi bu şekilde belirlenir.</Text>}
                        {selectedBasedOn === 5 && <Text style={[styles.subtitle, { color: dark? COLORS.secondaryWhite : COLORS.greyscale900 }]}>Gebeliğin erken dönemlerinde yapılan ultrasonografi, bebeğin baş-popo mesafesi (CRL) ölçülerek gebelik yaşı belirlenir. Bu yöntem, adet düzensizlikleri olan veya son adet tarihini hatırlamayan kadınlar için daha doğru sonuçlar verebilir.</Text>}
    

          {selectedBasedOn !== '' && ( 
            <View style={[styles.resultBox, {
              backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500,
              borderColor: dark ? COLORS.dark2 : COLORS.greyscale500,
            }]}>
                {dueDateLocale === 'Invalid Date' ? '' :
              <Text style={[styles.resultText, { color: dark ? COLORS.white : COLORS.greyscale900 }]}>
                Tahmini Doğum Tarihi: {dueDateLocale}
              </Text>}
            </View>
          )}


                </ScrollView>
            </View>
            <View style={styles.bottomContainer}>      
                     <Button
                    title={isSubmitting ? "Submitting..." : "Update"}
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