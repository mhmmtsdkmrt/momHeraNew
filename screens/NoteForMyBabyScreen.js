import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, FlatList } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-virtualized-view';
import { useTheme } from '../theme/ThemeProvider';
import { COLORS, SIZES, icons } from '../constants';
import SalonCard from '../components/SalonCard';
import { category, distances, manicure, ratings } from '../data';
import NotFoundCard from '../components/NotFoundCard';
import RBSheet from "react-native-raw-bottom-sheet";
import Button from '../components/Button';
import { FontAwesome } from "@expo/vector-icons";
import { useTranslation } from '@/Contexts/useTranslation';

const NoteForMyBabyScreen = ({ navigation }) => {
  const { dark, colors } = useTheme();
  const { t } = useTranslation();

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
            {t.noteForMyBaby}
          </Text>
        </View>
      </View>
    )
  }

  return (
      <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {renderHeader()}
    
    <View style= {[{flex: 1, alignItems: 'center', justifyContent: 'center'} , { backgroundColor: colors.background }]}>
    <Text style={[{fontSize: 25}, {
              color: dark ? COLORS.white : COLORS.greyscale900
            }]}>{t.comingSoon}</Text>
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
    bottomTitle: {
      fontSize: 24,
      fontFamily: "semiBold",
      color: COLORS.black,
      textAlign: "center",
      marginTop: 12
    },
  })
  
  export default NoteForMyBabyScreen