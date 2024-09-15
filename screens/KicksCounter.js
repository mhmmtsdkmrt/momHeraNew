import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, FlatList, AppState, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeProvider';
import { COLORS, FONTS, SIZES, icons } from '../constants';
import Button from '../components/Button';
import { EvilIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const KicksCounter = ({ navigation }) => {
  const { dark, colors } = useTheme();

  const until= 7200;

  const [kicksCount, setKicksCount] = useState(0);
  const [count, setCount] = useState(until);
  const [running, setRunning] = useState(false);
  const [kicksData, setKicksData] = useState([]);


  console.log(count);
  console.log(running);

  useEffect(() => {
    let interval;
    if (running && count > 0) {
      interval = setInterval(() => {
        setCount(prevCount => prevCount - 1);
      }, 1000);
    } else if (count === 0) {
      clearInterval(interval);
      setRunning(false);
    }
    return () => clearInterval(interval);
  }, [running, count]);

  const handleStartMode = () => {
    setRunning(true);
  };

  const handleStopMode = () => {
    setRunning(false);
  };

  const handleResetMode = () => {
    setCount(until);
    setRunning(false);
    setKicksCount(0);
  };

  const handleEndedMode = () => {
    setCount(0);
    setRunning(false);
  };

  const formatZaman = (count) => {
    const saatler = Math.floor(count / 3600);
    const dakikalar = Math.floor((count % 3600) / 60);
    const saniyeler = Math.floor(count % 60);
    return `${saatler.toString().padStart(2, '0')}:${dakikalar.toString().padStart(2, '0')}:${saniyeler.toString().padStart(2, '0')}`;
  };

  const handleAddItem = () => {
    const currentDate = new Date().toLocaleDateString();
    const newItem = {
      kicksCount: kicksCount,
      date: currentDate,
      runningCount: count
    };
    setKicksData(prevData => [...prevData, newItem]);
    setKicksCount(0);
    setRunning(false);
    setCount(until);

  };

  const removeItem = (index) => {
    Alert.alert(
      'Kayıt Silinecek',
      'Kaydı silmek istediğinize emin misiniz?',
      [
        {
          text: 'Hayır',
          onPress: () => {},
        },
        {
          text: 'Evet',
          onPress: () => {
            setKicksData(prevData => prevData.filter((_, i) => i !== index));
          },
        },
      ],
      { cancelable: false }
    );
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.date}</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <View>
      <Text style={styles.itemText}>Hareket Sayısı: {item.kicksCount}</Text>
      <Text style={styles.itemText}>Süre: {formatZaman(until-(item.runningCount))}</Text>
      </View>
      <EvilIcons style={{marginTop: 10}} name="trash" size={35} color={COLORS.primary} onPress={() => removeItem(index)}/>
      </View>
    </View>
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const savedData = await AsyncStorage.getItem('kicksData');
        if (savedData !== null) {
          setKicksData(JSON.parse(savedData));
        }
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  // yerel depoya verileri kaydediyorum
  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem('kicksData', JSON.stringify(kicksData));
      } catch (error) {
        console.log("Error saving data: ", error);
      }
    };

    saveData();
  }, [kicksData]);

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
            Kicks Counter
          </Text>
        </View>
      </View>
    )
  };

  return (
      <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {renderHeader()}


    
    <View style= {[{flex: 1, alignItems: 'center'} , { backgroundColor: colors.background }]}>
      <View style={{justifyContent: 'center', alignItems: 'center', height: '%20', width: SIZES.width -32}}>
    <View style={{borderColor: 'black', borderWidth: 0.8, borderRadius: 999, justifyContent: 'center', alignItems: 'center', marginTop: 10}}>      
      <TouchableOpacity onPress={() => {{setKicksCount(kicksCount+1)} {handleStartMode()}}}>
      <Image
        source={icons.kicks}
        resizeMode= 'contain'
        style={styles.buttonImage}
      />
      </TouchableOpacity>
    </View>
    <View style={{marginTop: 10}}> 
    <Text style={[{fontSize: 30}, {
              color: dark ? COLORS.white : COLORS.greyscale900
            }]}>{kicksCount}</Text>
    </View>
    {/* <Button onPress={() => {setKicksCount(0)}} title='Sıfırla' /> */}
    <Text style={[{fontSize: 16}, {
              color: dark ? COLORS.white : COLORS.greyscale900
            }]}>Bebeğinizin hareketlerini saymaya başlamadan önce zamanı not edin, önümüzdeki 2 saat boyunca 10 hareket sayarsanız, bebek rahattır ve her şey yolundadır.</Text>
    </View>



          <View style={styles.counterContainer}>
              <Text style={styles.timeCounter}>{formatZaman(count)}</Text>
              <View style={{flex: 1, width: SIZES.width -200, marginTop: 5 }}>
              {!running && count === until || count === 0 ? (
              <Button title="Başlat" filled onPress={handleStartMode} style={{ marginTop: 5}}/>
              ) : running ? (
              <Button title="Durdur" onPress={handleStopMode} style={{ marginTop: 5}}/>
              ) : (
                <Button title="Sürdür" filled onPress={handleStartMode} style={{ marginTop: 5}}/>
              )}

              <Button title="Sıfırla" filled onPress={handleResetMode} style={{ marginTop: 5}}/>
              <Button title="Tamamla" filled onPress={() => {count < until && handleAddItem()}} style={{ marginTop: 5}}/>

              </View>
          </View> 
          <View style={[styles.listContainer ,{ flex: 1, height: '%50'}]}>
            <FlatList
            data={kicksData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
             />
          </View>
    </View>
</View>
</SafeAreaView>
  );
}


            {/* <CountDown
            ref={countdownRef}
            size={28}
            until={7200}
            onFinish={() => alert('Finished')} 
            digitStyle={{backgroundColor: COLORS.tansparentPrimary, borderWidth: 0.5, borderColor: COLORS.primary}}
            digitTxtStyle={{color: COLORS.primary}}
            timeLabelStyle={{color: COLORS.greyscale600, fontWeight: FONTS.semiBold}}
            separatorStyle={{color: COLORS.primary}}
            timeToShow={['H', 'M', 'S']}
            timeLabels={{h: 'Saat', m: 'Dakika', s: 'Saniye'}}
            showSeparator
            running={running}
          /> */}
            {/* <TimeCounter running={running} until={until} ref={countdownRef}/> */}


            {/* <Button title='Başlat' onPress={handleStartMode}/>
            <Button title='Durdur' onPress={handleStopMode}/>
            <Button title='Devam Ettir' onPress={handleContinueMode}/>
            <Button title='Sıfırla'/>
            <Button title='Bitir'/>
            <Button title='add'/> */}




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
//               Massage
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
//       const [filteredSalons, setFilteredSalons] = useState(massage);
//       const [resultsCount, setResultsCount] = useState(0);
  
//       useEffect(() => {
//         handleSearch();
//       }, [searchQuery]);
  
  
//       const handleSearch = () => {
//           const salons = massage.filter((salon) =>
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
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 16,
  },
  area: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  kicksButtonContainer: {
    marginTop: 10,
  },
  itemContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    marginBottom: 5,
    borderColor: COLORS.greyscale300,
    borderWidth: 1,
    backgroundColor: COLORS.greyscale300,
    borderRadius: 9,
    width: SIZES.width - 32,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 2,
    marginLeft: 5,
    marginBottom: 2,
  },
  buttonImage: {
    width: 120,
    height: 120,
  },
  counterContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '%30', 
    padding: 16,
    width: SIZES.width - 32,
  },
  listContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '%50', 
    marginTop: 35
  },
  timeCounter: {
    fontSize: 35,
    backgroundColor: COLORS.tansparentPrimary, 
    borderWidth: 0.5, 
    borderColor: COLORS.primary, 
    color: COLORS.greyscale600, 
    fontWeight: FONTS.semiBold,
  }
  // moreIcon: {
  //   width: 24,
  //   height: 24,
  //   tintColor: COLORS.black
  // },
  // searchBarContainer: {
  //   width: SIZES.width - 32,
  //   backgroundColor: COLORS.secondaryWhite,
  //   padding: 16,
  //   borderRadius: 12,
  //   height: 52,
  //   flexDirection: "row",
  //   alignItems: "center"
  // },
  // searchIcon: {
  //   height: 24,
  //   width: 24,
  //   tintColor: COLORS.gray
  // },
  // searchInput: {
  //   flex: 1,
  //   fontSize: 16,
  //   fontFamily: "regular",
  //   marginHorizontal: 8
  // },
  // filterIcon: {
  //   width: 24,
  //   height: 24,
  //   tintColor: COLORS.primary
  // },
  // resultContainer: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "space-between",
  //   width: SIZES.width - 32,
  //   marginVertical: 16,
  // },
  // subtitle: {
  //   fontSize: 18,
  //   fontFamily: "bold",
  //   color: COLORS.black,
  // },
  // subResult: {
  //   fontSize: 14,
  //   fontFamily: "semiBold",
  //   color: COLORS.primary
  // },
  // resultLeftView: {
  //   flexDirection: "row"
  // },
  // bottomContainer: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "space-between",
  //   marginVertical: 12,
  //   paddingHorizontal: 16,
  //   width: SIZES.width
  // },
  // cancelButton: {
  //   width: (SIZES.width - 32) / 2 - 8,
  //   backgroundColor: COLORS.tansparentPrimary,
  //   borderRadius: 32
  // },
  // logoutButton: {
  //   width: (SIZES.width - 32) / 2 - 8,
  //   backgroundColor: COLORS.primary,
  //   borderRadius: 32
  // },
  // bottomTitle: {
  //   fontSize: 24,
  //   fontFamily: "semiBold",
  //   color: COLORS.black,
  //   textAlign: "center",
  //   marginTop: 12
  // },
  // separateLine: {
  //   height: .4,
  //   width: SIZES.width - 32,
  //   backgroundColor: COLORS.greyscale300,
  //   marginVertical: 12
  // },
  // sheetTitle: {
  //   fontSize: 18,
  //   fontFamily: "semiBold",
  //   color: COLORS.black,
  //   marginVertical: 12
  // }
})

export default KicksCounter