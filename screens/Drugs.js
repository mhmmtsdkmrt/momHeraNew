import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Modal, TouchableWithoutFeedback, Switch, Alert } from 'react-native';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeProvider';
import { COLORS, SIZES, icons, illustrations } from '../constants';
import Button from '../components/Button';
import Input from '../components/Input';
import { validateInput } from '../utils/actions/formActions';
import { reducer } from '../utils/reducers/formReducers';
import RNPickerSelect from 'react-native-picker-select';
import { EvilIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Feather } from "@expo/vector-icons";
import { useTranslation } from '@/Contexts/useTranslation';

const initialState = {
  inputValues: {
    drugName: '',
    daily: '',
    times: '',
  },
  inputValidities: {
    drugName: false,
    daily: false,
    times: false
  },
  formIsValid: false,
}


const Drugs = ({ navigation }) => {
  const { dark, colors } = useTheme();
  const { t } = useTranslation();
  const [myDrugs, setMyDrugs] = useState([
    {date: '2024-05-01', drugName: 'Majezik', daily: 3, times: 1, usage: 'Aç', remind: true},
    {date: '2024-04-01', drugName: 'Arvales', daily: 3, times: 5, usage: 'Tok', remind: false},
    {date: '2024-04-23', drugName: 'Supradyn', daily: 3, times: 2, usage: 'Aç', remind: true},
    {date: '2024-05-04', drugName: 'Gripin', daily: 3, times: 3, usage: 'Tok', remind: false},
    {date: '2024-03-29', drugName: 'Renie', daily: 2, times: 2, usage: 'Aç', remind: true},
    //silinecek
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const [error, setError] = useState(null);
  const [isRemind, setIsRemind] = useState(true);
  const [selectHungerFasting, setSelectHungerFasting] = useState('');


  const toggleReminder = () => {
    setIsRemind((prev) => !prev);
  };

  const hungerFastingOptions = [
    { label: `${t.hungry}`, value: 'Aç' },
    { label: `${t.full}`, value: 'Tok' },
  ];

  const handleHungerFastingChange = (value) => {
    setSelectHungerFasting(value);
  };


  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue)
      dispatchFormState({ inputId, validationResult: result, inputValue })
    },
    [dispatchFormState]
  )

  useEffect(() => {
    if (error) {
      Alert.alert('An error occured', error)
    }
  }, [error])


  const removeItem = (item) => {
    Alert.alert(
      `${t.deleteRecord}`,
      `${t.sureDelete}`,
      [
        {
          text: `${t.cancel}`,
          onPress: () => {},
        },
        {
          text: `${t.yes}`,
          onPress: () => {
            const updatedDrugs = myDrugs.filter(drug => drug !== item);
            setMyDrugs(updatedDrugs);
          },
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    const loadDrugs = async () => {
      try {
        const storedDrugs = await AsyncStorage.getItem('drugs');
        if (storedDrugs !== null) {
          setMyDrugs(JSON.parse(storedDrugs));
        }
      } catch (error) {
        console.error('Veriler yüklenirken bir hata oluştu:', error);
      }
    };
  
    loadDrugs();
  }, []);
  
  // Ekran kapatılmadan önce verileri kaydet
  useEffect(() => {
    const saveDrugs = async () => {
      try {
        await AsyncStorage.setItem('drugs', JSON.stringify(myDrugs));
      } catch (error) {
        console.error('Veriler kaydedilirken bir hata oluştu:', error);
      }
    };
  
    saveDrugs();
  }, [myDrugs]);




     // Render modal
     const renderModal = () => {

      const addDrug = () => {
        // Validate input values
        if (
            !formState.formIsValid ||
            !formState.inputValues.drugName ||
            !formState.inputValues.daily ||
            !formState.inputValues.times ||
            !selectHungerFasting
        ) {
            setError(`${t.fillAllFields}`);
            return;
        }

        // Add new drug to myDrugs state
        setMyDrugs((prevDrugs) => [
            ...prevDrugs,
            {
                date: new Date().toISOString().split('T')[0], // Current date
                drugName: formState.inputValues.drugName,
                daily: parseInt(formState.inputValues.daily),
                times: parseInt(formState.inputValues.times),
                usage: selectHungerFasting,
                remind: isRemind,
            },
        ]);

        // Reset form and close modal
        dispatchFormState({ type: 'RESET' });
        setSelectHungerFasting('');
        setIsRemind(true);
        setModalVisible(false);
    };


      return (
          <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}>
              <TouchableWithoutFeedback>
                  {/* onPress={() => setModalVisible(false)} */}
                  <View style={styles.modalContainer}>
                      <View style={[styles.modalSubContainer, { backgroundColor: dark ? COLORS.dark2 : COLORS.white }]}>
                          <Text style={styles.modalTitle}>İlaç Bilgileri</Text>
                          <Input 
                          id="drugName"
                          onInputChanged={inputChangedHandler}
                          placeholder={t.drugName}
                          placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
                          errorText={formState.inputValidities['drugName']}
                          keyboardType="default"
                          />
                          <View style={{flexDirection: 'row', marginHorizontal: 95}}>
                          <Input 
                          id="daily"
                          onInputChanged={inputChangedHandler}
                          placeholder={t.perDay}
                          placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
                          errorText={formState.inputValidities['daily']}
                          keyboardType="numeric"
                          inputMode="numeric"
                          />
                          <Text style={{ marginTop: 25, fontSize: 20, marginHorizontal: 15,
                          color: dark ? COLORS.white : COLORS.greyscale900
                          }}>x</Text>
                          <Input 
                          id="times"
                          onInputChanged={inputChangedHandler}
                          placeholder={t.piece}
                          placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
                          errorText={formState.inputValidities['times']}
                          keyboardType="numeric"
                          inputMode="numeric"
                          />
                          </View>
                          <RNPickerSelect
                          placeholder={{ label: `${t.usage}`, value: '' }}
                          items={hungerFastingOptions}
                          onValueChange={(value) => handleHungerFastingChange(value)}
                          value={selectHungerFasting}
                          style={{
                            inputIOS: {
                              marginTop: 8,
                              fontFamily: 'regular',
                              fontSize: 14,
                              paddingHorizontal: 5,
                              borderRadius: 4,
                              color: COLORS.black,
                              paddingRight: 30,
                              height: 52,
                              width: SIZES.width - 75,
                              alignItems: 'center',
                              backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                              borderRadius: 16
                            },
                            inputAndroid: {
                              marginTop: 8,
                              fontFamily: 'regular',
                              fontSize: 14,
                              paddingHorizontal: 5,
                              borderRadius: 12,
                              color: COLORS.black,
                              paddingRight: 30,
                              height: 52,
                              width: SIZES.width - 75,
                              alignItems: 'center',
                              backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                              borderRadius: 16
                            },
                          }}
                        />
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
                          <Text style={styles.modalSubtitle}>{t.drugRemindOption}</Text>
                          <View style={{flexDirection: 'row-reverse'}}>


                          <Button
                              title={t.add}
                              filled
                              onPress={() => { 
                                  setModalVisible(false)
                                  addDrug();
                                  //navigation.navigate('Drugs')
                              }}
                              style={{
                                  width: "50%",
                                  marginTop: 12,
                                  marginLeft: 10
                              }}
                          />
                           <Button
                              title={t.cancel}
                              outlined
                              onPress={() => {
                                  setModalVisible(false)
                                  //navigation.goBack()
                              }}
                              style={{
                                  width: "50%",
                                  marginTop: 12
                              }}
                          />
                          </View>
                      </View>
                  </View>
              </TouchableWithoutFeedback>
          </Modal>
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
            {t.drugs}
          </Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={{flexDirection: 'row', margin: 5}} onPress={() => setModalVisible(true)}>
            
            <Image
              source={icons.plus}
              resizeMode='contain'
              style={[styles.moreIcon, { 
                tintColor: dark? COLORS.secondaryWhite : COLORS.white
              }]}
            />
            <Text style={{fontSize: 17, color: 'white'}}>  {t.add}</Text>
          </TouchableOpacity>
          {renderModal()}
        </View>
      </View>
    )
  }



  return (
      <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {renderHeader()}
    
    <View style= {[{flex: 1, alignItems: 'center', justifyContent: 'center'} , { backgroundColor: colors.background }]}>
    <FlatList
                    data={myDrugs}
                    style={styles.listContainer}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 7, marginRight: 7}}> 
                            <Text style={[{fontSize: 17, marginLeft: 10, fontWeight: 'bold'}, {
                            color: dark ? COLORS.white : COLORS.greyscale900
                            }]}>{item.drugName}</Text>
                            </View>
                            <View style={{flexDirection: 'row', marginTop: 3, justifyContent: 'space-between'}}> 
                              <View style={{flexDirection: 'row'}}>
                              <Text style={styles.drugInfo}>{t.usage} {item.usage}</Text>
                              <Text style={styles.drugInfo}>{item.daily}x{item.times} </Text>
                              {/* <Text style={styles.drugDate}>{item.date}</Text> */}
                              </View>
                            </View> 
                              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{flexDirection: 'row'}}>
                                <Text style={[styles.drugInfo, { marginTop: 13}]}>{t.remind}</Text>
                                <Switch
                                value={item.remind}
                                onValueChange={(value) => {
                                const updatedDrugs = [...myDrugs];
                                const index = updatedDrugs.findIndex(drug => drug === item);
                                updatedDrugs[index].remind = value;
                                setMyDrugs(updatedDrugs);}}
                                thumbColor={isRemind ? '#fff' : COLORS.white}
                                trackColor={{ false: '#EEEEEE', true: COLORS.primary }}
                                ios_backgroundColor={COLORS.white}
                                style={styles.switch}
                                />
                                </View>
                                <EvilIcons style={{marginTop: 10}} name="trash" size={35} color={COLORS.primary} onPress={() => removeItem(item)}/>
                                </View>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />

                          <TouchableOpacity 
                          style={styles.addPostBtn} 
                          onPress={() => setModalVisible(true)}>
                              <Feather name="plus" size={24} color={COLORS.white} />
                          </TouchableOpacity>

    </View>
    <Button title= {t.add} onPress={() => setModalVisible(true)} filled />
</View>
</SafeAreaView>
  );
}




// <Text style={[{fontSize: 25}, {
//   color: dark ? COLORS.white : COLORS.greyscale900
// }]}> Coming Soon...</Text>

//   const { dark, colors } = useTheme();
//   const [selectedCategories, setSelectedCategories] = useState(["1"]);
//   const [selectedRating, setSelectedRating] = useState(["1"]);
//   const [selectedDistance, setSelectedDistance] = useState(["All"]);

//   const refRBSheet = useRef();

//     /**
//      * Render header
//      */
//     const renderHeader = () => {
//       return (
//         <View style={styles.headerContainer}>
//           <View style={styles.headerLeft}>
//             <TouchableOpacity
//               onPress={() => navigation.goBack()}>
//               <Image
//                 source={icons.back}
//                 resizeMode='contain'
//                 style={[styles.backIcon, { 
//                   tintColor: dark? COLORS.white : COLORS.greyscale900
//                 }]}
//               />
//             </TouchableOpacity>
//             <Text style={[styles.headerTitle, { 
//               color: dark? COLORS.white : COLORS.greyscale900
//             }]}>
//               Manicure
//             </Text>
//           </View>
//           <TouchableOpacity>
//             <Image
//               source={icons.moreCircle}
//               resizeMode='contain'
//               style={[styles.moreIcon, { 
//                 tintColor: dark? COLORS.white : COLORS.greyscale900
//               }]}
//             />
//           </TouchableOpacity>
//         </View>
//       )
//     }

//     /**
//      * Render content
//      */

//     const renderContent = ()=>{
//       const [searchQuery, setSearchQuery] = useState('');
//       const [filteredSalons, setFilteredSalons] = useState(manicure);
//       const [resultsCount, setResultsCount] = useState(0);
  
//       useEffect(() => {
//         handleSearch();
//       }, [searchQuery]);
  
  
//       const handleSearch = () => {
//           const salons = manicure.filter((salon) =>
//             salon.name.toLowerCase().includes(searchQuery.toLowerCase())
//           );
//           setFilteredSalons(salons);
//           setResultsCount(salons.length);
        
//       };
//       return (
//         <View>
//            <View>
//         {/* Search Bar */}
//         <View
//           onPress={() => console.log("Search")}
//           style={[styles.searchBarContainer, { 
//             backgroundColor: dark ? COLORS.dark2 : COLORS.secondaryWhite
//           }]}>
//           <TouchableOpacity
//             onPress={handleSearch}
//           >
//             <Image
//               source={icons.search2}
//               resizeMode='contain'
//               style={styles.searchIcon}
//             />
//           </TouchableOpacity>
//           <TextInput
//             placeholder='Search'
//             placeholderTextColor={COLORS.gray}
//             style={[styles.searchInput, { 
//               color: dark? COLORS.white : COLORS.greyscale900
//             }]}
//             value={searchQuery}
//             onChangeText={(text) => setSearchQuery(text)}
//           />
//           <TouchableOpacity
//             onPress={() => refRBSheet.current.open()}>
//             <Image
//               source={icons.filter}
//               resizeMode='contain'
//               style={styles.filterIcon}
//             />
//           </TouchableOpacity>
//         </View>
      

//         {/* Results container  */}
//         <View>
//           {
//             searchQuery && (
//               <View style={styles.resultContainer}>
//                 <View style={styles.resultLeftView}>
//                   <Text style={[styles.subtitle, { 
//                     color: dark ? COLORS.white : COLORS.greyscale900
//                   }]}>Results for "</Text>
//                   <Text style={[styles.subtitle, { color: COLORS.primary }]}>{searchQuery}</Text>
//                   <Text style={styles.subtitle}>"</Text>
//                 </View>
//                 <Text style={styles.subResult}>{resultsCount} found</Text>
//               </View>
//             )
//           }

//           {/* Courses result list */}
//           <View style={{ marginVertical: 16, backgroundColor: dark ? COLORS.dark1 : COLORS.tertiaryWhite }}>
//             {resultsCount && resultsCount > 0 ? (
//               <FlatList
//                 data={filteredSalons}
//                 keyExtractor={(item) => item.id}
//                 renderItem={({ item }) => {
//                   return (
//                     <SalonCard
//                       name={item.name}
//                       image={item.image}
//                       category={item.category}
//                       rating={item.rating}
//                       location={item.location}
//                       distance={item.distance}
//                       onPress={()=>navigation.navigate("SalonDetails")}
//                       categoryId={item.categoryId}
//                     />
//                   )
//                 }}
//               />
//             ) : (
//               <NotFoundCard />
//             )}
//           </View>
//         </View>
//       </View>
//         </View>
//       )
//     }
  

//   // Toggle category selection
//   const toggleCategory = (categoryId) => {
//     const updatedCategories = [...selectedCategories];
//     const index = updatedCategories.indexOf(categoryId);

//     if (index === -1) {
//       updatedCategories.push(categoryId);
//     } else {
//       updatedCategories.splice(index, 1);
//     }

//     setSelectedCategories(updatedCategories);
//   };

//   // toggle rating selection
//   const toggleRating = (ratingId) => {
//     const updatedRatings = [...selectedRating];
//     const index = updatedRatings.indexOf(ratingId);

//     if (index === -1) {
//       updatedRatings.push(ratingId);
//     } else {
//       updatedRatings.splice(index, 1);
//     }

//     setSelectedRating(updatedRatings);
//   };

//    // toggle distance selection
//    const toggleDistance = (distanceId) => {
//     const updatedDistances = [...selectedDistance];
//     const index = updatedDistances.indexOf(distanceId);

//     if (index === -1) {
//       updatedDistances.push(distanceId);
//     } else {
//       updatedDistances.splice(index, 1);
//     }

//     setSelectedDistance(updatedDistances);
//   };

//   // Category item
//   const renderCategoryItem = ({ item }) => (
//     <TouchableOpacity
//       style={{
//         backgroundColor: selectedCategories.includes(item.id) ? COLORS.primary : "transparent",
//         padding: 10,
//         marginVertical: 5,
//         borderColor: COLORS.primary,
//         borderWidth: 1.3,
//         borderRadius: 24,
//         marginRight: 12,
//       }}
//       onPress={() => toggleCategory(item.id)}>

//       <Text style={{
//         color: selectedCategories.includes(item.id) ? COLORS.white : COLORS.primary
//       }}>{item.name}</Text>
//     </TouchableOpacity>
//   );

//   const renderRatingItem = ({ item }) => (
//     <TouchableOpacity
//       style={{
//         backgroundColor: selectedRating.includes(item.id) ? COLORS.primary : "transparent",
//         paddingHorizontal: 16,
//         paddingVertical: 6,
//         marginVertical: 5,
//         borderColor: COLORS.primary,
//         borderWidth: 1.3,
//         borderRadius: 24,
//         marginRight: 12,
//         flexDirection: "row",
//         alignItems: "center",
//       }}
//       onPress={() => toggleRating(item.id)}>
//       <View style={{ marginRight: 6 }}>
//         <FontAwesome name="star" size={14} color={selectedRating.includes(item.id) ? COLORS.white : COLORS.primary} />
//       </View>
//       <Text style={{
//         color: selectedRating.includes(item.id) ? COLORS.white : COLORS.primary
//       }}>{item.title}</Text>
//     </TouchableOpacity>
//   );

//   const renderDistanceItem = ({ item }) => (
//     <TouchableOpacity
//       style={{
//         backgroundColor: selectedDistance.includes(item.id) ? COLORS.primary : "transparent",
//         paddingHorizontal: 16,
//         paddingVertical: 6,
//         marginVertical: 5,
//         borderColor: COLORS.primary,
//         borderWidth: 1.3,
//         borderRadius: 24,
//         marginRight: 12,
//         flexDirection: "row",
//         alignItems: "center",
//       }}
//       onPress={() => toggleDistance(item.id)}>
//       <Text style={{
//         color: selectedDistance.includes(item.id) ? COLORS.white : COLORS.primary
//       }}>{item.title}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
//       <View style={[styles.container, { backgroundColor: colors.background }]}>
//         {renderHeader()}
//         <ScrollView showsVerticalScrollIndicator={false}>
//           {renderContent()}
//         </ScrollView>
//         <RBSheet
//           ref={refRBSheet}
//           closeOnDragDown={true}
//           closeOnPressMask={false}
//           height={480}
//           customStyles={{
//             wrapper: {
//               backgroundColor: "rgba(0,0,0,0.5)",
//             },
//             draggableIcon: {
//               backgroundColor: dark ? COLORS.dark3 : "#000",
//             },
//             container: {
//               borderTopRightRadius: 32,
//               borderTopLeftRadius: 32,
//               height: 480,
//               backgroundColor: dark ? COLORS.dark2 : COLORS.white,
//               alignItems: "center",
//             }
//           }}
//         >
//           <Text style={[styles.bottomTitle, { 
//             color: dark? COLORS.white : COLORS.greyscale900
//           }]}>Filter</Text>
//           <View style={styles.separateLine} />
//           <View style={{ width: SIZES.width - 32 }}>
//             <Text style={[styles.sheetTitle, { 
//               color: dark? COLORS.white : COLORS.greyscale900
//             }]}>Category</Text>
//             <FlatList
//               data={category}
//               keyExtractor={item => item.id}
//               showsHorizontalScrollIndicator={false}
//               horizontal
//               renderItem={renderCategoryItem}
//             />
//             <Text style={[styles.sheetTitle, { 
//               color: dark? COLORS.white : COLORS.greyscale900
//             }]}>Rating</Text>
//             <FlatList
//               data={ratings}
//               keyExtractor={item => item.id}
//               showsHorizontalScrollIndicator={false}
//               horizontal
//               renderItem={renderRatingItem}
//             />

//             <Text style={[styles.sheetTitle, { 
//               color: dark? COLORS.white : COLORS.greyscale900
//             }]}>Distance</Text>
//              <FlatList
//               data={distances}
//               keyExtractor={item => item.id}
//               showsHorizontalScrollIndicator={false}
//               horizontal
//               renderItem={renderDistanceItem}
//             />
//           </View>


//           <View style={styles.separateLine} />

//           <View style={styles.bottomContainer}>
//             <Button
//               title="Reset"
//               style={{
//                 width: (SIZES.width - 32) / 2 - 8,
//                 backgroundColor: dark ? COLORS.dark3 : COLORS.tansparentPrimary,
//                 borderRadius: 32,
//                 borderColor: dark ? COLORS.dark3 : COLORS.tansparentPrimary
//               }}
//               textColor={dark ? COLORS.white : COLORS.primary}
//               onPress={() => refRBSheet.current.close()}
//             />
//             <Button
//               title="Filter"
//               filled
//               style={styles.logoutButton}
//               onPress={() => refRBSheet.current.close()}
//             />
//           </View>
//         </RBSheet>
//       </View>
//     </SafeAreaView>
//   )
// };

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
  moreIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.black
  },
  searchBarContainer: {
    width: SIZES.width - 32,
    backgroundColor: COLORS.secondaryWhite,
    padding: 16,
    borderRadius: 12,
    height: 52,
    flexDirection: "row",
    alignItems: "center"
  },
  searchIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.gray
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: "regular",
    marginHorizontal: 8
  },
  filterIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.primary
  },
  resultContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: SIZES.width - 32,
    marginVertical: 16,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: "bold",
    color: COLORS.black,
  },
  subResult: {
    fontSize: 14,
    fontFamily: "semiBold",
    color: COLORS.primary
  },
  resultLeftView: {
    flexDirection: "row"
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
    paddingHorizontal: 16,
    width: SIZES.width
  },
  cancelButton: {
    width: (SIZES.width - 32) / 2 - 8,
    backgroundColor: COLORS.tansparentPrimary,
    borderRadius: 32
  },
  logoutButton: {
    width: (SIZES.width - 32) / 2 - 8,
    backgroundColor: COLORS.primary,
    borderRadius: 32
  },
  bottomTitle: {
    fontSize: 24,
    fontFamily: "semiBold",
    color: COLORS.black,
    textAlign: "center",
    marginTop: 12
  },
  separateLine: {
    height: .4,
    width: SIZES.width - 32,
    backgroundColor: COLORS.greyscale300,
    marginVertical: 12
  },
  sheetTitle: {
    fontSize: 18,
    fontFamily: "semiBold",
    color: COLORS.black,
    marginVertical: 12
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
    fontFamily: "regular",
    color: COLORS.greyscale600,
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
  height: 494,
  width: SIZES.width * 0.9,
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
listContainer: {
  marginTop: 5,
},
itemContainer: {
  marginTop: 15,
  flexDirection: 'column',
  justifyContent: 'space-between',
  marginBottom: 6,
  borderColor: COLORS.greyscale300,
  borderWidth: 1,
  backgroundColor: COLORS.greyscale300,
  borderRadius: 9,
  width: SIZES.width - 32,
},
drugInfo: {
  color: COLORS.grayscale700,
  marginLeft: 10,
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
}
})

export default Drugs