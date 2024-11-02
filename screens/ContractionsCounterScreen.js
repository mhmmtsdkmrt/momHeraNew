import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Alert } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, SIZES, icons } from '../constants';
import { useTheme } from '../theme/ThemeProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EvilIcons } from '@expo/vector-icons';
import { useTranslation } from '@/Contexts/useTranslation';

const ContractionsCounterScreen = ({ navigation }) => {

  const { dark, colors } = useTheme();
  const [counter, setCounter] = useState({ minutes: 0, seconds: 0, date: new Date().toLocaleDateString()});
  const [isCounting, setIsCounting] = useState(false);
  const [history, setHistory] = useState([]);
  const [currentTime, setCurrentTime] = useState('');
  const [prevTime, setPrevTime] = useState('');
  const [hourlyCounter, setHourlyCounter] = useState(0);
  const [averageCounter, setAverageCounter] = useState(0);
  const [averageDiff, setAverageDiff] = useState(0);
  const [deletedItem, setDeletedItem] = useState(null);
  const { t } = useTranslation();

  const renderGroupedHistory = () => {
    const groupedHistory = {};
    history.forEach((record) => {
      if (!groupedHistory[record.date]) {
        groupedHistory[record.date] = [];
      }
      groupedHistory[record.date].push(record);
    });

    return Object.entries(groupedHistory).map(([date, records]) => ({
      date,
      records,
    }));
  };


  useEffect(() => {
  }, [history]);




  useEffect(() => {
    const loadData = async () => {
      try {
        const counterData = await AsyncStorage.getItem('counter');
        if (counterData !== null) {
          setCounter(JSON.parse(counterData));
        }

        const historyData = await AsyncStorage.getItem('history');
        if (historyData !== null) {
          setHistory(JSON.parse(historyData));
        }
      } catch (error) {
        console.error('Error loading data from AsyncStorage:', error);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem('counter', JSON.stringify(counter));
        await AsyncStorage.setItem('history', JSON.stringify(history));
      } catch (error) {
        console.error('Error saving data to AsyncStorage:', error);
      }
    };

    saveData();
  }, [counter, history]);

  useEffect(() => {
    let intervalId;
    if (isCounting) {
      intervalId = setInterval(() => {
        if (counter.seconds === 59) {
          setCounter({ minutes: counter.minutes+1, seconds: 0});
        } else {
        setCounter((prevCounter) => ({ ...prevCounter, seconds: prevCounter.seconds + 1}));
        }
        setHourlyCounter((prevCounter) => prevCounter + 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isCounting, counter]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const hours = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
      const minutes = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
      setCurrentTime(`${hours}:${minutes}`);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  
  useLayoutEffect(() => {
    const intervalId = setInterval(() => {
      const total = history.reduce((acc, item) => acc + item.counter.minutes * 60 + item.counter.seconds, 0);
      const average = Math.floor(total / history.length);
      setAverageCounter(average);

      const totalDiff = history.reduce((acc, item) => acc + parseInt(item.diffTime.split(':')[0]) * 60 + parseInt(item.diffTime.split(':')[1]), 0);
      const averageDiff = Math.floor(totalDiff / history.length);
      setAverageDiff(averageDiff);
    });

    return () => clearInterval(intervalId);
  }, [history]);

  const startCounter = () => {
    setIsCounting(true);
  };

  const formatTime = (time) => {
    return `${time.minutes < 10 ? '0' + time.minutes : time.minutes}:${time.seconds < 10 ? '0' + time.seconds : time.seconds}`;
  }

  const stopCounter = () => {
    setIsCounting(false);
    const diffTime = calculateTimeDifference(prevTime, currentTime);
    const date = (new Date().toLocaleDateString());
    setHistory([...history, {counter, time: currentTime, diffTime, date}]);
    setCounter({ minutes: 0, seconds: 0 });
    setPrevTime(currentTime);
    setHourlyCounter(0);
  };

  const calculateTimeDifference = (prevTime, currentTime) => {
    if (!prevTime) return '00:00';

    const prevTimeArray = prevTime.split(':').map(Number);
    const currentTimeArray = currentTime.split(':').map(Number);

    let diffHours = currentTimeArray[0] - prevTimeArray[0];
    let diffMinutes = currentTimeArray[1] - prevTimeArray[1];

    if (diffMinutes < 0) {
      diffHours -= 1;
      diffMinutes += 60;
    }

    return `${diffHours < 10 ? '0' + diffHours : diffHours}:${diffMinutes < 10 ? '0' + diffMinutes : diffMinutes}`;
  };

  const removeItem = (index) => {

    Alert.alert(
      `${t.deleteRecord}`,
      `${t.sureDelete}`,
      [
        {
          text: `${t.cancel}` ,
          onPress: () => {
            // setHistory([...updatedHistory, deleted]);
            // setDeletedItem(null);
          },
        },
        {
          text: `${t.yes}`,
          onPress: () => {
            const deleted = history[index];
            setDeletedItem(deleted);

            const updatedHistory = [...history];
            updatedHistory.splice(index, 1);
            setHistory(updatedHistory);

            // Calculate averages again
            const total = updatedHistory.reduce((acc, item) => acc + item.counter.minutes * 60 + item.counter.seconds, 0);
            const average = Math.floor(total / updatedHistory.length);
            setAverageCounter(average);

            const totalDiff = updatedHistory.reduce((acc, item) => acc + parseInt(item.diffTime.split(':')[0]) * 60 + parseInt(item.diffTime.split(':')[1]), 0);
            const averageDiff = Math.floor(totalDiff / updatedHistory.length);
            setAverageDiff(averageDiff);

          },
        },
      ],
      { cancelable: false }
    );
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
            {t.contractionsCounter}
          </Text>
        </View>
      </View>
    )
  }

  return (
      <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {renderHeader()}
    
    <View style= {[{flex: 0.25, alignItems: 'center'} , { backgroundColor: colors.background }]}>
    <View style={{borderColor: 'black', borderWidth: 0.8, borderRadius: 999}}>
      {isCounting === false ?       
      <TouchableOpacity onPress={startCounter} disabled = {isCounting}>
      <Image
        source={icons.contraction}
        resizeMode='cover'
        style={styles.buttonImage}
      />
      </TouchableOpacity> : 
            <TouchableOpacity onPress={stopCounter} disabled = {!isCounting}>
            <Image
              source={icons.contraction}
              resizeMode='cover'
              style={styles.buttonImage}
            />
            </TouchableOpacity> }
    </View>
    <View style={{marginTop: 10}}> 
    <Text style={[{fontSize: 30}, {
              color: dark ? COLORS.white : COLORS.greyscale900
            }]}>{formatTime(counter)}</Text>
    </View>
    </View>

  
    
    <View style={[{marginTop: 30}]}>
      
    { averageCounter > 0 ?

      <View >
        
          <Text style={[{fontSize: 17, marginLeft: 10, fontWeight: 'bold'}, {
              color: dark ? COLORS.white : COLORS.greyscale900
            }]}>{t.contractionsMainTitle}</Text>
          <View style={styles.averageContainer}>
          <Text style={{fontSize: 17, color: COLORS.primary, marginTop: 10}}>{t.time}</Text>
          <Text style={{fontSize: 17, color: COLORS.primary, marginTop: 10}}>{t.range}</Text>
          </View>
          <View style={styles.averageContainer}>
          <Text style={styles.hourlyCounter}>{`${formatTime({ minutes: Math.floor(averageCounter / 60), seconds: averageCounter % 60 })}`}</Text>
          <Text style={styles.hourlyCounter}>{`${formatTime({ minutes: Math.floor(averageDiff / 60), seconds: averageDiff % 60 })}`}</Text>
          </View>
    </View> :     <Text style={[{fontSize: 16}, {
              color: dark ? COLORS.white : COLORS.greyscale900
            }]}>{t.contractionsSubTitle}</Text>
    }
    </View>
    
    <View style={{flex: 0.7, marginTop: 10}}>
        <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.history}
        data={renderGroupedHistory()}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 20 }}>
            <Text style={[{fontSize: 17, marginLeft: 10, fontWeight: 'bold'}, {
              color: dark ? COLORS.white : COLORS.greyscale900
            }]}>
            {item.date} {/* Gün başlığı */}
            </Text>
            <Text style={{fontSize: 17, marginLeft: 10, color: COLORS.primary, marginTop: 10}}>{t.time}        {t.range}         {t.start}</Text>
            {item.records.map((record, index) => (

              <View key={index} style={styles.item}>
                      
                      <Text style={{fontSize: 17, marginLeft: 10}} >{`${formatTime(record.counter)}      ${record.diffTime}         ${record.time}`}</Text>
                      <EvilIcons name="trash" size={35} color={COLORS.primary}  onPress={() => removeItem(index)}/>
                    
              </View>
            ))}
          </View>
        )}

        // renderItem={({item, index}) => (
        //   <View style={styles.item}>
        //   <Text style={{fontSize: 17, marginLeft: 10}} >{`${formatTime(item.counter)}      ${item.diffTime}         ${item.time}`}</Text>
        //   <EvilIcons name="trash" size={35} color={COLORS.primary}  onPress={() => removeItem(index)}/>
        //   </View>
        // )}
        
        />
        </View>
</View>
</SafeAreaView>
  );
}






// import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { COLORS, SIZES, icons } from '../constants';
// import Button from "../components/Button";
// import { useTheme } from '../theme/ThemeProvider';
// import { getFormatedDate } from 'react-native-modern-datepicker';
// import EditCountModal from '../components/EditCountModal';

// const ContractionsCounterScreen = ({ navigation }) => {

//   const { dark, colors } = useTheme();
//   const [count, setCount] = useState(0);
//   const [contractionsList, setContractionsList] = useState([]);
//   const [editIndex, setEditIndex] = useState(null);
//   const [modalVisible, setModalVisible] = useState(false);
  

//   const handleDecreaseMode = () => {
//     if (count > 0) {
//       setCount(count-1);
//     } else null
//   }

//   const handleAddContractions = () => {
//     const today = new Date();
//     const currentDate = getFormatedDate(
//     new Date(today.setDate(today.getDate())),
//     "YYYY/MM/DD"
//     );
//     const existingIndex = contractionsList.findIndex(item => item.date === currentDate) ;

//     if (existingIndex !== -1) {
//       const updatedContractionsList = [...contractionsList];
//       updatedContractionsList[existingIndex].count += count;
//       setContractionsList(updatedContractionsList);
//     } else {
//       const newEntry = {date: currentDate, count: count};
//       setContractionsList([...contractionsList, newEntry]);
//     }

//     setCount(0);
//   }

//   const handleEditItem = (index) => {
//     setEditIndex(index);
//     setModalVisible(true);
//   };

//   const handleSaveEdit = (newCount) => {
//     if (editIndex !== null && !isNaN(newCount)) {
//       const updatedList = [...contractionsList];
//       updatedList[editIndex].count = parseInt(newCount);
//       setContractionsList(updatedList);
//       setEditIndex(null);
//     }
//   };
  
//   const handleDeleteItem = (index) => {
//     const updatedList = [...contractionsList];
//     updatedList.splice(index, 1);
//     setContractionsList(updatedList);
//   }

//   /**
//  * Render header
//  */
//   const renderHeader = () => {
//     return (
//       <View style={styles.headerContainer}>
//         <View style={styles.headerLeft}>
//           <TouchableOpacity
//             onPress={() => navigation.goBack()}>
//             <Image
//               source={icons.back}
//               resizeMode='contain'
//               style={[styles.backIcon, { 
//                 tintColor: dark? COLORS.white : COLORS.greyscale900
//               }]}
//             />
//           </TouchableOpacity>
//           <Text style={[styles.headerTitle, { 
//             color: dark? COLORS.white : COLORS.greyscale900
//           }]}>
//             Contractions Counter
//           </Text>
//         </View>
//       </View>
//     )
//   }

//   return (
//       <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
//       <View style={[styles.container, { backgroundColor: colors.background }]}>
//         {renderHeader()}
    
//         <View style= {[{flex: 1, alignItems: 'center'} , { backgroundColor: colors.background }]}>
//     <View style={styles.kicksButtonContainer}>
//     <Button onPress={() => {setCount(count+1)}} title='increase' />
//     </View>
//     <Button onPress={handleDecreaseMode} title='decrease' />
//     <Button onPress={() => {setCount(0)}} title='reset' />
//     <Button onPress={handleAddContractions} title='Add' />
//     <Text style={[{fontSize: 16}, {
//               color: dark ? COLORS.white : COLORS.greyscale900
//             }]}>{count}</Text>
//     </View>
//     <View>
//       <FlatList
//         data={contractionsList}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({item, index})=> (
//           <View style={styles.itemContainer}>
//           <Text style={[styles.itemText, { color: dark ? COLORS.white : COLORS.greyscale900 }]}>
//             {index+1}. Date: {item.date}, Count: {item.count}
//           </Text>
//             <View style={styles.itemButtonsContainer}>
//               <TouchableOpacity onPress={() => handleEditItem(index)}>
//               <Text style={styles.editButtonText}>Edit</Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={() => handleDeleteItem(index)}>
//               <Text style={styles.deleteButtonText}>Delete</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         )}
//       />
//       <EditCountModal
//       visible={modalVisible}
//       onClose={() => setModalVisible(false)}
//       onSave={handleSaveEdit}
//       />
//     </View>
// </View>
// </SafeAreaView>
//   );
// }
//   const [time, setTime] = useState(55);
//   const { colors, dark } = useTheme();

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
//     }, 1000);

//     return () => {
//       clearInterval(intervalId);
//     };
//   }, []);
  
//   return (
//     <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
//       <View style={[styles.container, { backgroundColor: colors.background }]}>
//         <Header title="Forgot Password" />
//         <ScrollView>
//           <Text style={[styles.title, {
//             color: dark ? COLORS.white : COLORS.black
//           }]}>Code has been send to +1 111 ******99</Text>
//           <OtpInput 
//               numberOfDigits={4}
//               onTextChange={(text) => console.log(text)} 
//               focusColor={COLORS.primary}
//               focusStickBlinkingDuration={500}
//               onFilled={(text) => console.log(`OTP is ${text}`)}
//               theme={{
//                 pinCodeContainerStyle: {
//                   backgroundColor: dark ? COLORS.dark2 : COLORS.secondaryWhite,
//                   borderColor: dark ? COLORS.gray : COLORS.secondaryWhite,
//                   borderWidth: .4,
//                   borderRadius: 10,
//                   height: 58,
//                   width: 58,
//                 },
//                 pinCodeTextStyle: {
//                   color: dark ? COLORS.white : COLORS.black,
//                 }
//               }}/>
//           <View style={styles.codeContainer}>
//             <Text style={[styles.code, {
//               color: dark ? COLORS.white : COLORS.greyscale900
//             }]}>Resend code in</Text>
//             <Text style={styles.time}>{`  ${time}  `}</Text>
//             <Text style={[styles.code, {
//               color: dark ? COLORS.white : COLORS.greyscale900
//             }]}>s</Text>
//           </View>
//         </ScrollView>
//         <Button
//           title="Verify"
//           filled
//           style={styles.button}
//           onPress={() => { navigation.navigate("CreateNewPassword") }}
//         />
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
    padding: 16,
    backgroundColor: COLORS.white
  },
  title: {
    fontSize: 18,
    fontFamily: "medium",
    color: COLORS.greyscale900,
    textAlign: "center",
    marginVertical: 54
  },
  OTPStyle: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.black,
    borderRadius: 8,
    height: 58,
    width: 58,
    backgroundColor: COLORS.secondaryWhite,
    borderBottomColor: "gray",
    borderBottomWidth: .4,
    borderWidth: .4,
    borderColor: "gray"
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
    borderRadius: 32
  },
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
  itemContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.greyscale300,
  },
  itemText: {
    fontSize: 16,
  },
  itemButtonsContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  editButtonText: {
    marginRight: 10,
    color: COLORS.primary,
  },
  deleteButtonText: {
    color: COLORS.danger,
  },
  time: {
    fontSize: 18,
    marginBottom: 10,
  },
  history: {
    marginTop: 5,
  },
  hourlyCounter: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
    borderColor: COLORS.greyscale300,
    borderWidth: 1,
    backgroundColor: COLORS.greyscale300,
    borderRadius: 9
  },
  averageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  buttonImage: {
    width: 120,
    height: 120,
  }
})

export default ContractionsCounterScreen