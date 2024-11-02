import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Modal, TouchableWithoutFeedback, Switch, Alert } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeProvider';
import { COLORS, SIZES, icons } from '../constants';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Feather } from "@expo/vector-icons";
import { RulerPicker } from 'react-native-ruler-picker';
import { EvilIcons } from '@expo/vector-icons';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { ProfileContext } from '@/Contexts/ProfileGetApi';
import { useNavigation } from '@react-navigation/native';
import { WeightContext } from '@/Contexts/WeightContext';
import { useTranslation } from '@/Contexts/useTranslation';




const WeightControl = () => {
  const { dark, colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
  const [weight, setWeight] = useState('');
  const [data, setData] = useState([]);
  const [date, setDate] = useState(new Date())
  const [isRemind, setIsRemind] = useState(true);
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [firstWeight, setFirstWeight] = useState(null);
  //const [lastWeight, setLastWeight] = useState(null);
  const [difference, setDifference] = useState(null);

  

  const {currentWeek} = useContext(ProfileContext);
  const {lastWeight, setLastWeight} = useContext(WeightContext);
  const navigation = useNavigation();
  const { t } = useTranslation();


  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
  };

  const handleDateChange = (selectedDate) => {
    const currentDate = selectedDate ? new Date(selectedDate.nativeEvent.timestamp) : date;
    setOpenStartDatePicker(false);
    setDate(currentDate); 
};


  const formattedDate = date ? new Date(date).toLocaleDateString() : new Date().toLocaleDateString(); 



  const handleModalOpen = () => {
    setDate(new Date());
    setModalVisible(true);
  }

  const handleModalDeleteOpen = (item) => {
    setSelectedItem(item);
    setModalDeleteVisible(true);
  }

  const toggleReminder = () => {
    setIsRemind((prev) => !prev);
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const savedData = await AsyncStorage.getItem('weightData');
      if (savedData) {
        setData(JSON.parse(savedData));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEntry = async () => {
    try {
      const entry = { date: formattedDate, weight, week: currentWeek };
      const newData = [...data, entry];
      setData(newData);
      await AsyncStorage.setItem('weightData', JSON.stringify(newData));
      setModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  };



  const removeItem = async (item) => {
      const updatedData = data.filter((dataItem) => dataItem !== item);
      setData(updatedData);
      await AsyncStorage.setItem('weightData', JSON.stringify(updatedData));
      setModalDeleteVisible(false);

    }


   // Render modal
   const renderModal = () => {

    return (

        <>
        <Modal  
        animationType="slide"
        transparent={true}
        visible={modalVisible}>
        <TouchableWithoutFeedback>
          
          <View style={styles.modalContainer}>
            <View style={[styles.modalSubContainer, { backgroundColor: dark ? COLORS.dark2 : COLORS.white }]}>

              {data.length > 0 ? (<Text style={styles.modalTitle}>{t.addWeight}</Text>) : (<Text style={styles.modalTitle}>{t.addWeight2}</Text>)}
              

              <Text style={styles.modalNotes}>{t.weightModalTitle}</Text>

              {data.length > 0 ? (<Text style={styles.modalSubtitle}>{t.enterWeight}</Text>) : (<Text style={styles.modalSubtitle}>{t.enterPreWeight}</Text>)}

              

            <View style={{flexDirection: 'row', marginHorizontal: 85, marginTop: 10}}>
            <View style={{ borderWidth: 1,  backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <RulerPicker
            min={0}
            max={240}
            step={0.1}
            fractionDigits={1}
            unit='kg'
            decelerationRate={'normal'}
            initialValue={!isNaN(numericLastWeight) ? numericLastWeight : 50}
            width={SIZES.width - 100 }
            height={100}
            indicatorHeight={30}
            indicatorColor= {COLORS.primary}
            shortStepHeight={20}
            onValueChangeEnd={(number) => setWeight(number)}
            />
            </View>
              
              </View>
              <TouchableOpacity 
              style={styles.modal1DateContainer}
              onPress={handleOnPressStartDate}>

              <Text style={styles.modal1DateText}>{formattedDate}</Text>

              </TouchableOpacity>

                        {openStartDatePicker && (                         
                        <RNDateTimePicker
                         testID='datePicker'
                         mode='date'
                         display='spinner'
                         value={date} 
                         onChange={handleDateChange}
                         maximumDate={new Date()}
                         minimumDate={new Date(new Date().setDate(new Date().getDate() - 280))} 
                         />
                         )}



              <View style={styles.rightContainer}>
                      <Text style={[styles.settingsName, {
                       color: dark ? COLORS.white : COLORS.greyscale900
                       }]}>{t.remind}</Text>
                  <Switch
                  value={isRemind}
                  onValueChange={toggleReminder}
                  thumbColor={isRemind ? '#fff' : COLORS.white}
                  trackColor={{ false: '#EEEEEE', true: COLORS.primary }}
                  ios_backgroundColor={COLORS.white}
                  style={styles.switch}
                  />

              </View>
              <Text style={styles.modalNotes}>{t.infoWeight}</Text>   

              <View style={{ flexDirection: 'row-reverse' }}>
                <Button
                  title={t.save}
                  filled
                  onPress={() => {
                     handleEntry();
                  } }
                  style={{
                    width: "50%",
                    marginTop: 12,
                    marginLeft: 10
                  }} />
                <Button
                  title={t.cancel}
                  outlined
                  onPress={() => {
                    setModalVisible(false);
                    //navigation.goBack()
                  } }
                  style={{
                    width: "50%",
                    marginTop: 12
                  }} />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      
     </>
        
    )
}


  const renderModalDelete = () => {
    return(
      <>
      <Modal  
        animationType="slide"
        transparent={true}
        visible={modalDeleteVisible}>
        <TouchableWithoutFeedback>


          
          <View style={styles.modalDeleteContainer}>
            <View style={[styles.modalDeleteSubContainer, { backgroundColor: dark ? COLORS.dark2 : COLORS.white }]}>

            <Text style={styles.modalSubtitle}>{t.sureDelete}</Text>

              <View>
                <Button
                  title={t.delete}
                  filled
                  onPress={() => {
                     removeItem(selectedItem);
                  } }
                  style={{
                    width: SIZES.width - 80,
                    marginTop: 12,
                  }} />
                <Button
                  title={t.cancel}
                  outlined
                  onPress={() => {
                    setModalDeleteVisible(false);
                  } }
                  style={{
                    width: SIZES.width - 80,
                    marginTop: 12
                  }} />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      </>
    )
  }

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
            {t.weightControl}
          </Text>
          {renderModal()}
        </View>

      </View> 
      
    )
  }


  useEffect(() => {
    if (data.length > 0) {
      const initialWeight = data[0].weight;
      const finalWeight = data[data.length - 1].weight;
      setFirstWeight(initialWeight);
      setLastWeight(finalWeight);

      let difference = finalWeight !== null ? (finalWeight - initialWeight).toFixed(1) : null;

      if(difference !== null) {
        difference = difference > 0 ? `+${difference}` : `${difference}`;
      }
      setDifference(difference);
    }
  }, [data]);

  const numericLastWeight = Number(lastWeight); 


  return (
      <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {renderHeader()}
        {renderModalDelete()}


        {firstWeight !== null && (
        <View style={styles.generalAnalysisContainer}>

          <View style={styles.generalAnalysisSubContainer}>
            <Text style={[{fontSize: 20, marginLeft: 10, fontWeight: 'bold'}, {color: dark ? COLORS.white : COLORS.greyscale900}]}>{firstWeight} kg</Text>
            <Text style={[{fontSize: 17, marginLeft: 10}, {color: dark ? COLORS.white : COLORS.greyscale900, marginTop: 3}]}>{t.start}</Text>
          </View>
          <View style={styles.generalAnalysisSubContainer}>
            {lastWeight !== null ? 
            (<Text style={[{fontSize: 20, marginLeft: 10, fontWeight: 'bold'}, {color: dark ? COLORS.white : COLORS.greyscale900}]}>{lastWeight} kg</Text>) : (<Text> -- kg</Text>)}
            <Text style={[{fontSize: 17, marginLeft: 10}, {color: dark ? COLORS.white : COLORS.greyscale900, marginTop: 3}]}>{t.current}</Text>
          </View>
          <View style={styles.generalAnalysisSubContainer}>
            {lastWeight !== null ? 
            (<Text style={[{fontSize: 20, marginLeft: 10, fontWeight: 'bold'}, {color: dark ? COLORS.white : COLORS.greyscale900}]}>{difference} kg</Text>) : (<Text> -- kg</Text>)}
            <Text style={[{fontSize: 17, marginLeft: 10}, {color: dark ? COLORS.white : COLORS.greyscale900, marginTop: 3}]}>{t.change}</Text>
          </View>  

        </View> )}
    
    <View style= {[{flex: 1, marginTop: 12, alignItems: 'center', justifyContent: 'center'} , { backgroundColor: colors.background }]}>
        
        <View style={{alignSelf: 'flex-start'}}>
          <Text style={[{fontSize: 20, marginLeft: 10, fontWeight: 'bold'}, {color: dark ? COLORS.white : COLORS.greyscale600,}]}>{t.history}</Text>
        </View>     
    <FlatList
        data={data}
        showsVerticalScrollIndicator = {false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {

          const previousWeight = index >0 ? data[index - 1].weight : null;
          let weightDifference = previousWeight ? (item.weight - previousWeight).toFixed(1) : null;

          if(weightDifference !== null) {
            weightDifference = weightDifference > 0 ? `+${weightDifference}` : `${weightDifference}`;
          }

          return(
          <TouchableOpacity onPress={() => handleModalDeleteOpen(item)}>
          <View style={[styles.listContainer]}>
            <View style={{ margin: 10}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={[{fontSize: 17, marginLeft: 10}, {color: dark ? COLORS.white : COLORS.greyscale900}]}>{`${item.date.toLocaleString()}`}</Text>

            <Text style={[{fontSize: 20, marginLeft: 10, fontWeight: 'bold'}, {color: dark ? COLORS.white : COLORS.greyscale900}]}>{`${item.weight} kg`}</Text>
            </View>

            {weightDifference !== null && (
              <>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10,}}>
                <Text style={[{fontSize: 15, marginLeft: 10,}, {color: dark ? COLORS.white : COLORS.greyscale900 }]}>{t.change}:</Text>
                <Text style={[{ fontSize: 15, marginLeft: 10, fontWeight: 'bold' },{ color: weightDifference >= 0 ? 'green' : 'red' },]}>{`${weightDifference} kg`}</Text>
              </View>
              <Text style={[{fontSize: 15, marginLeft: 10,}, {color: dark ? COLORS.white : COLORS.greyscale900, marginTop: 15 }]}>{item.week}. {t.week}</Text>
              </>
        )}

            </View>

                              {/* <EvilIcons style={{marginTop: 10}} name="trash" size={35} color={COLORS.primary} onPress={() => handleModalDeleteOpen(item)}/> */}
          </View>
          </TouchableOpacity>
        )}}
      />

                        <TouchableOpacity 
                          style={styles.addPostBtn} 
                          onPress={handleModalOpen}>
                              <Feather name="plus" size={24} color={COLORS.white} />

                          </TouchableOpacity>
                          

                          
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
    padding: 16
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
  headerRight: {
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    borderColor: 'white'
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: "bold",
    color: COLORS.primary,
    textAlign: "center",
    marginVertical: 12
  },
  modalSubtitle: {
    fontSize: 16,
    fontFamily: "semiBold",
    color: COLORS.greyscale900,
    textAlign: "center",
    marginVertical: 12
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)"
},
  modalSubContainer: {
    height: 620,
    width: SIZES.width * 0.9,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    padding: 16
  },
  modalDeleteContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.2)"
},
  modalDeleteSubContainer: {
    height: 220,
    width: SIZES.width,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    padding: 16
  },
  modalIllustration: {
    height: 180,
    width: 180,
    marginVertical: 22
  },
  button: {
    paddingHorizontal: 14,
    marginHorizontal: 5,
    borderRadius: 21,
    height: 39,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
  modal1DateContainer: {
    width: '100%',
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding2,
    borderRadius: 12,
    borderWidth: 1,
    marginVertical: 5,
    flexDirection: 'row',
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.greyscale500,
    borderColor: COLORS.greyscale500,
  },
  modal1DateText: {
    color: COLORS.greyscale600,
    fontFamily: 'regular',
    fontSize: 18,
    paddingTop: 0,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  switch: {
    //marginRight: 2,
    transform: [{ scaleX: .8 }, { scaleY: .8 }],
  },
  settingsName: {
    fontSize: 15,
    fontFamily: "semiBold",
    color: COLORS.greyscale900,
    marginLeft: 250
  },
  modalNotes: {
    fontSize: 16,
    fontFamily: "regular",
    color: COLORS.greyscale600,
    marginVertical: 12
  },
  textInput: {
    color: COLORS.black,
    flex: 1,
    fontFamily: 'regular',
    fontSize: 14,
    paddingTop: 0,
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding2,
    borderRadius: 12,
    borderWidth: 1,
    marginVertical: 5,
    flexDirection: 'row',
    height: 52,
    alignItems: 'center',
  },
  addPostBtn: {
    width: 58,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    backgroundColor: COLORS.primary,
    position: "absolute",
    bottom: 72,
    right: 16,
    zIndex: 999,
    shadowRadius: 10,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 10 }
  },
  listContainer: {
    marginTop: 15,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 6,
    borderColor: COLORS.greyscale300,
    borderWidth: 1,
    backgroundColor: COLORS.grayscale100,
    borderRadius: 9,
    width: SIZES.width - 32,
    shadowColor: "#000",
    shadowOffset: {
        width: 1,
        height: 1,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    
    elevation: 4,
  },
  generalAnalysisContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
    height: 100,
    alignItems: 'center',
    borderColor: COLORS.greyscale300,
    borderWidth: 1,
    backgroundColor: COLORS.grayscale100,
    borderRadius: 9,
    width: SIZES.width - 32,
    shadowColor: "#000",
    shadowOffset: {
        width: 1,
        height: 1,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    
    elevation: 4,
  },
  generalAnalysisSubContainer: {
    alignItems: 'center'
  }
})

export default WeightControl;