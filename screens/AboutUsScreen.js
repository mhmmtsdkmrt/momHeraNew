import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, FlatList } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeProvider';
import { COLORS, SIZES, icons } from '../constants';
import { useTranslation } from '@/Contexts/useTranslation';
const AboutUsScreen = ({ navigation }) => {
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
            {t.aboutUs}
          </Text>
        </View>
      </View>
    )
  }

  return (
      <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {renderHeader()}

        <Text style={{color: 'blue', fontWeight: 'bold', fontSize: 15}}>Version 1.0</Text>
    
    <View style= {[{flex: 1, alignItems: 'center', justifyContent: 'center'} , { backgroundColor: colors.background }]}>
    <Text style={[styles.title, {
                        color: dark ? COLORS.white : COLORS.greyscale900
            }]}>Kemal DELİACI</Text>
                <Text style={[styles.title, {
                        color: dark ? COLORS.white : COLORS.greyscale900
            }]}>Muhammet Sadık MERT</Text>
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
    title: {
      fontSize: 25,
      fontFamily: "medium",
      color: COLORS.greyscale900,
      textAlign: "center",
      marginVertical: 15
    }
  })
  
  export default AboutUsScreen