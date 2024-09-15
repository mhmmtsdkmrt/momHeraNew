import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import React from 'react';
import { COLORS, SIZES, icons, images } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import ArticlesTabSelection from '../tabs/ArticlesTabSelection';
import { useTheme } from '../theme/ThemeProvider';
import { useNavigation } from '@react-navigation/native';
import ArticlesApi from '../apiConnections/ArticlesApi';

const ArticlesCatagoriesScreen = () => {
  const { colors, dark } = useTheme();

  const navigation = useNavigation();

  const [data] = ArticlesApi();

  const imagePath = 'https://momhera.com';


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
            }]}>Articles</Text>
         </View>
      </View>
    )
  }


  return (

    <SafeAreaView style={[styles.area, { backgroundColor: dark ? COLORS.dark1 : COLORS.white }]}>
      <View style={[styles.container, { backgroundColor: dark ? COLORS.dark1 : COLORS.white }]}>
        {renderHeader()}


    <ScrollView style={{flex: 1, marginBottom: 50}}>
      <FlatList
        data={data} 
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.cardContainer, { 
            backgroundColor: dark ? COLORS.dark2 : COLORS.white,
          }]} onPress={()=> navigation.navigate('ArticlesShowScreen', {id: item.id, name: item.name})}>
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
                }]}>{item.name}</Text>
                <Text style={[styles.address, { 
                  color: dark ? COLORS.grayscale400 : COLORS.grayscale700,
                }]}>{item.description}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      </ScrollView>
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    //width: SIZES.width -32
  },
  headerContainer: {
    width: SIZES.width - 32,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 12
  },
  headerLeftContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: "bold",
    color: COLORS.greyscale900,
    marginLeft: 12
  },
  headerRightContainer: {
    flexDirection: "row",
    alignItems: "center"
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
    date: {
      fontSize: 16,
      fontFamily: "bold",
      color: COLORS.greyscale900
    },
    statusContainer: {
      width: 64,
      height: 24,
      borderRadius: 6,
      backgroundColor: COLORS.greeen,
      alignItems: "center",
      justifyContent: "center"
    },
    status: {
      fontSize: 10,
      color: COLORS.white,
      fontFamily: "medium",
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
    rightContainer: {
      flexDirection: "row",
      alignItems: "center"
    },
    remindMeText: {
      fontSize: 12,
      fontFamily: "regular",
      color: COLORS.grayscale700,
      marginVertical: 4
    },
    bottomContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginVertical: 12,
      paddingHorizontal: 16,
      width: "100%"
    },
    bottomTitle: {
      fontSize: 24,
      fontFamily: "semiBold",
      color: "red",
      textAlign: "center",
    },
    bottomSubtitle: {
      fontSize: 22,
      fontFamily: "bold",
      color: COLORS.greyscale900,
      textAlign: "center",
      marginVertical: 12
    },
    backIcon: {
      height: 24,
      width: 24,
      tintColor: COLORS.black
    },
})

export default ArticlesCatagoriesScreen