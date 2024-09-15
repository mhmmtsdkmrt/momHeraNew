import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { COLORS, SIZES, icons } from '../constants'
import { useTheme } from '../theme/ThemeProvider'
import Header from '../components/Header';
import { getStatusBarHeight } from 'react-native-status-bar-height'

export default function ArticleShowScreen({ route, navigation }) {

    const {colors, dark} = useTheme();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const imagePath = 'https://momhera.com';
    const id = route.params.id;
    const name = route.params.name ;



    useEffect(() => {
      const fetchData = async() => {
        try {
          const response = await axios({
            method: 'get',
            url: "https://api.momhera.com/api/Posts",
            params: {
              CategoryId: id,
             // TagId: '',
              Language: 'tr',
              PageIndex : 0,
              PageSize: 100,
            },
          });

          setData(response.data.data.items);
          
        } catch (e) {
          setError(e);
        };
      };

      fetchData();


    }, []);
    

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
            {name}
          </Text>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
        <View style= {[styles.container, { backgroundColor: colors.background }]}>
        {renderHeader()}

      <FlatList
        data={data} 
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.cardContainer, { 
            backgroundColor: dark ? COLORS.dark2 : COLORS.white,
          }]} onPress={()=> navigation.navigate('ArticleShowDetailScreen', {id: item.id})}>
            <View style={styles.dateContainer}>
            </View>
            <View style={[styles.separateLine, { 
              backgroundColor: dark? COLORS.greyScale800 : COLORS.grayscale200,
            }]} />
            <View style={styles.detailsContainer}>
              <Image
                source={{uri: `${imagePath}` + item.imagePathUrl}}
                resizeMode='cover'
                style={styles.barberImage}
              />
              <View style={styles.detailsRightContainer}>
                <Text style={[styles.name, { 
                   color: dark ? COLORS.secondaryWhite : COLORS.greyscale900
                }]}>{item.title}</Text>
                <Text style={[styles.address, { 
                  color: dark ? COLORS.grayscale400 : COLORS.grayscale700,
                }]}>{item.headerMetaDescription}</Text>
              <View style={styles.buttonContainer}>
                  <Text style={[styles.serviceTitle, { 
                    color: dark ? COLORS.grayscale400 : COLORS.grayscale700,
                  }]}>Tags:</Text>
                  <Text style={styles.serviceText}>    Month 1, Month2, Feeding </Text>
                  </View>
                </View>
            </View>
          </TouchableOpacity>
        )}
      />


        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
        area: {
            flex: 1,
            backgroundColor: COLORS.white,
        },
        container: {
            flex: 1,
            backgroundColor: COLORS.white,
        },
        articlesImage: {
            width: SIZES.width,
            height: SIZES.height * 0.3,
            borderRadius: 16,
        },
        headerContainer: {
            flexDirection: "row",
            width: SIZES.width - 32,
            justifyContent: "space-between",
            marginBottom: 10,
            paddingTop: 10 + getStatusBarHeight(),
            marginLeft: 12
        },
        backIcon: {
            width: 24,
            height: 24,
            tintColor: COLORS.white,
        },
        headerTitle: {
            fontSize: 20,
            fontFamily: 'bold',
            color: COLORS.black,
            marginLeft: 16
        },
        headerLeft: {
            flexDirection: "row",
            alignItems: "center"
        },
        settingsTitle: {
            fontSize: 18,
            fontFamily: "bold",
            color: COLORS.black,
            marginVertical: 26
        },
        body: {
            fontSize: 14,
            fontFamily: "regular",
            color: COLORS.black,
            marginTop: 4
        },

        cardContainer: {
          // width: SIZES.width - 32,
           borderRadius: 20,
           backgroundColor: COLORS.white,
           paddingHorizontal: 8,
           paddingVertical: 4,
           marginBottom: 16
         },
         dateContainer: {
           flexDirection: "row",
           justifyContent: "flex-end",
           alignItems: "center",
         },
         separateLine: {
          width: "100%",
          height: 0.7,
          backgroundColor: COLORS.greyScale800,
          marginVertical: 12
        },
        detailsContainer: {
          flexDirection: "row",
          alignItems: "center",
        },
        barberImage: {
          width: 88,
          height: 88,
          borderRadius: 16,
          marginHorizontal: 12
        },
        detailsRightContainer: {
          flex: 1,
          marginLeft: 12
        },
        name: {
          fontSize: 17,
          fontFamily: "bold",
          color: COLORS.greyscale900
        },
        address: {
          fontSize: 12,
          fontFamily: "regular",
          color: COLORS.grayscale700,
          marginVertical: 4
        },
        buttonContainer: {
          flexDirection: "column",
          //alignItems: "center",
          //justifyContent: "space-between"
        },
        serviceText: {
          fontSize: 12,
          color: COLORS.primary,
          fontFamily: "medium",
          marginTop: 6
        },
        serviceTitle: {
          borderTopColor: COLORS.gray2,
          borderTopWidth: 0.5,
          fontSize: 12,
          fontFamily: "regular",
          color: COLORS.grayscale700,
          marginTop: 5
        },
})




















// import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
// import React from 'react';
// import { COLORS, SIZES, icons, images } from '../constants';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useTheme } from '../theme/ThemeProvider';
// import { useNavigation } from '@react-navigation/native';
// import ArticlesApi from '../apiConnections/ArticlesApi';

// const ArticlesShowScreen = () => {
//   const { colors, dark } = useTheme();

//   const navigation = useNavigation();

//   const [data] = ArticlesApi();

//   const imagePath = 'https://momhera.com';

//   /**
//    * render header
//    */
//   const renderHeader = ()=>{
//     return (
//       <View style={styles.headerContainer}>
//          <View style={styles.headerLeftContainer}>
//          <TouchableOpacity
//             onPress={() => navigation.goBack()}>
//             <Image
//               source={icons.back}
//               resizeMode='contain'
//               style={[styles.backIcon, { 
//                 tintColor: dark? COLORS.white : COLORS.greyscale900
//               }]}
//             />
//           </TouchableOpacity>
//             <Text style={[styles.headerTitle, {
//               color: dark ? COLORS.white : COLORS.greyscale900
//             }]}>Articles Show</Text>
//          </View>
//       </View>
//     )
//   }


//   return (

//     <SafeAreaView style={[styles.area, { backgroundColor: dark ? COLORS.dark1 : COLORS.white }]}>
//       <View style={[styles.container, { backgroundColor: dark ? COLORS.dark1 : COLORS.white }]}>
//         {renderHeader()}


//         <View style={[styles.container, { 
//       backgroundColor: dark ? COLORS.dark1 : COLORS.tertiaryWhite
//     }]}>
//       <FlatList
//         data={data} // Use 'bookings' instead of 'upcomingBookings'
//         keyExtractor={item => item.id}
//         showsVerticalScrollIndicator={false}
//         renderItem={({ item }) => (
//           <TouchableOpacity style={[styles.cardContainer, { 
//             backgroundColor: dark ? COLORS.dark2 : COLORS.white,
//           }]} onPress={()=> navigation.navigate('ArticleShowDetailScreen', {id: item.id})}>
//             <View style={styles.dateContainer}>
//             </View>
//             <View style={[styles.separateLine, { 
//               backgroundColor: dark? COLORS.greyScale800 : COLORS.grayscale200,
//             }]} />
//             <View style={styles.detailsContainer}>
//               <Image
//                 source={{uri: `${imagePath}` + item.imagePathUrl}}
//                 resizeMode='cover'
//                 style={styles.barberImage}
//               />
//               <View style={styles.detailsRightContainer}>
//                 <Text style={[styles.name, { 
//                    color: dark ? COLORS.secondaryWhite : COLORS.greyscale900
//                 }]}>{item.name}</Text>
//                 <Text style={[styles.address, { 
//                   color: dark ? COLORS.grayscale400 : COLORS.grayscale700,
//                 }]}>{item.description}</Text>
//                 {/* <Text style={[styles.serviceTitle, { 
//                   color: dark ? COLORS.grayscale400 : COLORS.grayscale700,
//                 }]}>Services:</Text>
//                 <Text style={styles.serviceText}>{item.services.join(", ")}</Text> */}
//               </View>
//             </View>
//             <View style={[styles.separateLine, { 
//               marginVertical: 10,
//               backgroundColor: dark?  COLORS.greyScale800 : COLORS.grayscale200,
//               }]} />
//             <View style={styles.buttonContainer}>
//             <Text style={[styles.serviceTitle, { 
//                   color: dark ? COLORS.grayscale400 : COLORS.grayscale700,
//                 }]}>Tags:</Text>
//                 <Text style={styles.serviceText}>    Month 1, Month2, Feeding </Text>
//               {/* <TouchableOpacity
//                 onPress={() => refRBSheet.current.open()}
//                 style={styles.cancelBtn}>
//                 <Text style={styles.cancelBtnText}>Cancel Booking</Text>
//               </TouchableOpacity>
//               <TouchableOpacity 
//                 onPress={()=>navigation.navigate("EReceipt")}
//                 style={styles.receiptBtn}>
//                 <Text style={styles.receiptBtnText}>View E-Receipt</Text>
//               </TouchableOpacity> */}
//             </View>
//           </TouchableOpacity>
//         )}
//       />



//         {/* <ArticlesTabSelection/> */}
//       </View>
//       </View>
//     </SafeAreaView>
//   )
// };

// const styles = StyleSheet.create({
//   area: {
//     flex: 1,
//     backgroundColor: COLORS.white,
//     //paddingTop: 10 + getStatusBarHeight() 
//   },
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.white,
//     padding: 16,
//     width: SIZES.width -32
//   },
//   headerContainer: {
//     width: SIZES.width - 32,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center"
//   },
//   headerLeftContainer: {
//     flexDirection: "row",
//     alignItems: "center"
//   },
//   logoIcon: {
//     height: 32,
//     width: 32,
//     tintColor: COLORS.primary,
//     marginRight: 16
//   },
//   headerTitle: {
//     fontSize: 22,
//     fontFamily: "bold",
//     color: COLORS.greyscale900
//   },
//   headerRightContainer: {
//     flexDirection: "row",
//     alignItems: "center"
//   },
//     container: {
//       backgroundColor: COLORS.tertiaryWhite
//     },
//     cardContainer: {
//       width: SIZES.width - 32,
//       borderRadius: 18,
//       backgroundColor: COLORS.white,
//       paddingHorizontal: 8,
//       paddingVertical: 8,
//       marginBottom: 16
//     },
//     dateContainer: {
//       flexDirection: "row",
//       justifyContent: "flex-end",
//       alignItems: "center",
//     },
//     date: {
//       fontSize: 16,
//       fontFamily: "bold",
//       color: COLORS.greyscale900
//     },
//     statusContainer: {
//       width: 64,
//       height: 24,
//       borderRadius: 6,
//       backgroundColor: COLORS.greeen,
//       alignItems: "center",
//       justifyContent: "center"
//     },
//     status: {
//       fontSize: 10,
//       color: COLORS.white,
//       fontFamily: "medium",
//     },
//     separateLine: {
//       width: "100%",
//       height: 0.7,
//       backgroundColor: COLORS.greyScale800,
//       marginVertical: 12
//     },
//     detailsContainer: {
//       flexDirection: "row",
//       alignItems: "center",
//     },
//     barberImage: {
//       width: 88,
//       height: 88,
//       borderRadius: 16,
//       marginHorizontal: 12
//     },
//     detailsRightContainer: {
//       flex: 1,
//       marginLeft: 12
//     },
//     name: {
//       fontSize: 17,
//       fontFamily: "bold",
//       color: COLORS.greyscale900
//     },
//     address: {
//       fontSize: 12,
//       fontFamily: "regular",
//       color: COLORS.grayscale700,
//       marginVertical: 4
//     },
//     serviceTitle: {
//       fontSize: 12,
//       fontFamily: "regular",
//       color: COLORS.grayscale700,
//     },
//     serviceText: {
//       fontSize: 12,
//       color: COLORS.primary,
//       fontFamily: "medium",
//       marginTop: 6
//     },
//     cancelBtn: {
//       width: (SIZES.width - 32) / 2 - 16,
//       height: 36,
//       borderRadius: 24,
//       backgroundColor: "transparent",
//       alignItems: "center",
//       justifyContent: "center",
//       marginTop: 6,
//       borderColor: COLORS.primary,
//       borderWidth: 1.4,
//       marginBottom: 12
//     },
//     cancelBtnText: {
//       fontSize: 16,
//       fontFamily: "semiBold",
//       color: COLORS.primary,
//     },
//     receiptBtn: {
//       width: (SIZES.width - 32) / 2 - 16,
//       height: 36,
//       borderRadius: 24,
//       backgroundColor: COLORS.primary,
//       alignItems: "center",
//       justifyContent: "center",
//       marginTop: 6,
//       borderColor: COLORS.primary,
//       borderWidth: 1.4,
//       marginBottom: 12
//     },
//     receiptBtnText: {
//       fontSize: 16,
//       fontFamily: "semiBold",
//       color: COLORS.white,
//     },
//     buttonContainer: {
//       flexDirection: "column",
//       //alignItems: "center",
//       //justifyContent: "space-between"
//     },
//     rightContainer: {
//       flexDirection: "row",
//       alignItems: "center"
//     },
//     remindMeText: {
//       fontSize: 12,
//       fontFamily: "regular",
//       color: COLORS.grayscale700,
//       marginVertical: 4
//     },
//     switch: {
//       marginLeft: 8,
//       transform: [{ scaleX: .8 }, { scaleY: .8 }], // Adjust the size of the switch
//     },
//     bottomContainer: {
//       flexDirection: "row",
//       alignItems: "center",
//       justifyContent: "space-between",
//       marginVertical: 12,
//       paddingHorizontal: 16,
//       width: "100%"
//     },
//     cancelButton: {
//       width: (SIZES.width - 32) / 2 - 8,
//       backgroundColor: COLORS.tansparentPrimary,
//       borderRadius: 32
//     },
//     removeButton: {
//       width: (SIZES.width - 32) / 2 - 8,
//       backgroundColor: COLORS.primary,
//       borderRadius: 32
//     },
//     bottomTitle: {
//       fontSize: 24,
//       fontFamily: "semiBold",
//       color: "red",
//       textAlign: "center",
//     },
//     bottomSubtitle: {
//       fontSize: 22,
//       fontFamily: "bold",
//       color: COLORS.greyscale900,
//       textAlign: "center",
//       marginVertical: 12
//     },
//     selectedCancelContainer: {
//       marginVertical: 24,
//       paddingHorizontal: 36,
//       width: "100%"
//     },
//     cancelTitle: {
//       fontSize: 18,
//       fontFamily: "semiBold",
//       color: COLORS.greyscale900,
//       textAlign: "center",
//     },
//     cancelSubtitle: {
//       fontSize: 14,
//       fontFamily: "regular",
//       color: COLORS.grayscale700,
//       textAlign: "center",
//       marginVertical: 8,
//       marginTop: 16
//     },
//     backIcon: {
//       height: 24,
//       width: 24,
//       tintColor: COLORS.black
//     },
//   // searchIcon: {
//   //   width: 24,
//   //   height: 24,
//   //   tintColor: COLORS.greyscale900,
//   //   marginRight: 12
//   // },
//   // moreIcon: {
//   //   width: 24,
//   //   height: 24,
//   //   tintColor: COLORS.greyscale900
//   // }
// })

// export default ArticlesShowScreen