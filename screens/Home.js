import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ImageBackground, BackHandler, Alert } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { COLORS, SIZES, icons } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-virtualized-view';
import { categories} from '../data';
import { useTheme } from '../theme/ThemeProvider';
import Category from '../components/Category';
import SubHeaderItem from '../components/SubHeaderItem';
import WishesMessages from '../components/WishesMessages';
import EstimatedDateOfBirth from '../components/EstemetedDateOfBirth';
import WeightComp from '../components/WeightComp';
import HowMuchToday from '../components/HowMuchToday';
import DoYouKnow from '../components/DoYouKnow';
import { ProfileContext } from '../Contexts/ProfileGetApi';
import BabySizeWeight from '../components/BabySizeWeight';
import { useIsFocused } from '@react-navigation/native';
import ArticlesSlider from '../components/ArticlesSlider';


const Home = ({ navigation }) => {
  const { colors, dark } = useTheme();
  const { profileData } = useContext(ProfileContext);
  const isFocused = useIsFocused();


  useEffect(() => {
    const backAction = () => {
      if(isFocused) {
      Alert.alert("Çıkmak İstediğinize Emin Misiniz?", "login e dön", [
        {
          text: "Hayır",
          onPress: () => null,
          style: "cancel"
        },
        { text: "Evet", onPress: () => navigation.navigate('Login') }
      ]);
      return true;
    }
    return false;
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => backHandler.remove();
  }, [isFocused]);


  /**
   * render header
   */
  const renderHeader = ()=>{
    return (
      <View style={styles.headerContainer}>
          <View style={styles.viewLeft}>
            <Image
              source={icons.userDefault2}
              resizeMode='contain'
              style={styles.userIcon}
            />
            <View style={styles.viewNameContainer}>
               <WishesMessages/>
               <Text style={[styles.title, { 
                color: dark ? COLORS.white : COLORS.greyscale900
               }]}>{profileData?.firstName}</Text>
            </View>
          </View>
          {/* <View style={styles.viewRight}>
            <TouchableOpacity
             onPress={()=>navigation.navigate("Notifications")}>
              <Image
                source={icons.notificationBell2}
                resizeMode='contain'
                style={[styles.bellIcon, { tintColor: dark ? COLORS.white : COLORS.greyscale900 }]}
              />
            </TouchableOpacity>
            <TouchableOpacity
             onPress={()=>navigation.navigate("MyBookmark")}>
              <Image
                source={icons.bookmarkOutline}
                resizeMode='contain'
                style={[styles.bookmarkIcon, { tintColor: dark ? COLORS.white : COLORS.greyscale900 }]}
              />
            </TouchableOpacity>
          </View> */}
      </View>
    )
  }




  /**
   * Render categories
   */
  const renderCategories = () => {

    return (
      <View>
        <SubHeaderItem
          title="Tools"
          navTitle="See All"
          onPress={() => navigation.navigate('ToolsScreen')}
        />

        <FlatList
          data={categories}
          keyExtractor={(item, index) => index.toString()}
          horizontal={false}
          numColumns={4} // Render two items per row
          renderItem={({ item, index }) => (
            <Category
              name={item.name}
              icon={item.icon}
              iconColor={item.iconColor}
              backgroundColor={item.backgroundColor}
              onPress={() => navigation.navigate({ name: item.navigation })}
            />
          )}
        />
      </View>
    )
  }

  return (
   <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {renderHeader()}
        <ScrollView showsVerticalScrollIndicator = {false} style={styles.contentContainer}>
        <View style={styles.imageContainer}>
        <ImageBackground
        resizeMode='contain'
        resizeMethod='resize'
        style={styles.image}
        source={require('../assets/images/1Hafta.png')}
        borderRadius={20}>

            <BabySizeWeight/>

        </ImageBackground>

        </View>



        {renderCategories()}

        <EstimatedDateOfBirth/>
        <ArticlesSlider/>
        <WeightComp/>
        <HowMuchToday/>
        <DoYouKnow/>

        </ScrollView>
      </View>
   </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  container:{
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 12
  },
  headerContainer: {
    flexDirection: "row",
    width: SIZES.width - 32,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  userIcon: {
    width: 48,
    height: 48,
    borderRadius: 32
  },
  viewLeft: {
    flexDirection: "row",
    alignItems: "center"
  },
  greeeting: {
    fontSize: 12,
    fontFamily: "regular",
    color: "gray",
    marginBottom: 4
  },
  title: {
    fontSize: 20,
    fontFamily: "bold",
    color: COLORS.greyscale900
  },
  viewNameContainer: {
    marginLeft: 12
  },
  viewRight: {
    flexDirection: "row",
    alignItems: "center"
  },
  bellIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.black,
    marginRight: 8
  },
  bookmarkIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.black
  },
  searchBarContainer: {
    width: SIZES.width - 32,
    backgroundColor: COLORS.secondaryWhite,
    padding: 16,
    borderRadius: 12,
    height: 52,
    marginVertical: 16,
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
  bannerContainer: {
    width: SIZES.width - 32,
    height: 154,
    paddingHorizontal: 28,
    paddingTop: 28,
    borderRadius: 32,
    backgroundColor: COLORS.primary
  },
  bannerTopContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  bannerDicount: {
    fontSize: 12,
    fontFamily: "medium",
    color: COLORS.white,
    marginBottom: 4
  },
  bannerDiscountName: {
    fontSize: 16,
    fontFamily: "bold",
    color: COLORS.white
  },
  bannerDiscountNum: {
    fontSize: 46,
    fontFamily: "bold",
    color: COLORS.white
  },
  bannerBottomContainer: {
    marginTop: 8
  },
  bannerBottomTitle: {
    fontSize: 14,
    fontFamily: "medium",
    color: COLORS.white
  },
  bannerBottomSubtitle: {
    fontSize: 14,
    fontFamily: "medium",
    color: COLORS.white,
    marginTop: 4
  },
  mentorContainer: {
    marginRight: 10,
    alignItems: "center"
  },
  userAvatar: {
    width: 64,
    height: 64,
    borderRadius: 999
  },
  firstName: {
    fontSize: 16,
    fontFamily: "semiBold",
    color: COLORS.dark2,
    marginTop: 6
  },
  bannerItemContainer: {
    width: "100%",
    paddingBottom: 10,
    backgroundColor: COLORS.primary,
    height: 170,
    borderRadius: 32,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    marginBottom: 50
  },

  image: {
    width: SIZES.width - 32 ,
    height: 200,
    marginTop: 10,

  },
  babyInfoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 40,
  },
  imageContainer: {
    width: SIZES.width -32,
    height: 280,
    borderWidth: 1,
    borderRadius: 20,
    borderWidth: 0.05,
    shadowColor: "#000",
    shadowOffset: {
        width: 1,
        height: 1,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    
    elevation: 4,

  }

})

export default Home