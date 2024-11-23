import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, FlatList, useWindowDimensions } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-virtualized-view';
import { useTheme } from '../theme/ThemeProvider';
import { COLORS, SIZES, icons, images } from '../constants';
import SalonCard from '../components/SalonCard';
import { category, distances, haircuts, ratings } from '../data';
import NotFoundCard from '../components/NotFoundCard';
import RBSheet from "react-native-raw-bottom-sheet";
import Button from '../components/Button';
import { FontAwesome } from "@expo/vector-icons";
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import BoyNames from '../tabs/BoyNames';
import GirlNames from '../tabs/GirlNames';
import { useTranslation } from '@/Contexts/useTranslation';

const renderScene = SceneMap({
  first: BoyNames,
  second: GirlNames,
});

const FindName = ({ navigation }) => { 
  const layout = useWindowDimensions();
  const { dark, colors } = useTheme();

  const { t } = useTranslation();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: `${t.boy}` },
    { key: 'second', title: `${t.girl}`},
  ]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: COLORS.primary,
      }}
      style={{
        backgroundColor: colors.background,
      }}
      renderLabel={({ route, focused }) => (
        <Text style={[{
          color: focused ? COLORS.primary : 'gray',
          fontSize: 16,
          fontFamily: "bold"
        }]}>
          {route.title}
        </Text>
      )}
    />
  )

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
            {t.findName}
          </Text>
        </View>
      </View>
    )
  }

  return (
      <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {renderHeader()}

        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={renderTabBar}
        />
    
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
  moreIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.black
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
  moreCircleIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.black,
    marginLeft: 12
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center"
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
    marginVertical: 10,
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
  }
})

export default FindName