import { View, Text, StyleSheet, ScrollView,  TouchableOpacity } from 'react-native';
import React from 'react';
import { COLORS, SIZES } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { useTheme } from '../theme/ThemeProvider';
import { AntDesign, Entypo, Fontisto, MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';


const ToolsScreen = ({ navigation }) => {
  const { colors, dark } = useTheme();
  const size = 40;


  return (
    <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Header title="Tools" />
       
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.container1, { backgroundColor: colors.background }]}>
              <View style={[styles.boxContainer, {backgroundColor: dark ? COLORS.greyscale900 : COLORS.tansparentPrimary}]}  >
                <TouchableOpacity onPress={()=> navigation.navigate('FindName')}>
                  <MaterialCommunityIcons name="format-letter-case" size={size} style={styles.Icons}/>
                  <Text style={[styles.text, {color: dark ? COLORS.white : COLORS.primary}]}>Find Name</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.boxContainer, {backgroundColor: dark ? COLORS.greyscale900 : COLORS.tansparentPrimary}]}  >
                <TouchableOpacity onPress={()=> navigation.navigate('CalculatePregnancyScreen')}>
                  <MaterialIcons name="calculate" size={size} style={styles.Icons}/>
                  <Text style={[styles.text, {color: dark ? COLORS.white : COLORS.primary}]}>Calculate Pregnancy</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.boxContainer, {backgroundColor: dark ? COLORS.greyscale900 : COLORS.tansparentPrimary}]} >
                <TouchableOpacity onPress={()=> navigation.navigate('WeeklyPeriodScreen')}>
                  <MaterialCommunityIcons name="periodic-table" size={size} style={styles.Icons} />
                  <Text style={[styles.text, {color: dark ? COLORS.white : COLORS.primary}]}>Weekly Period</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.boxContainer, {backgroundColor: dark ? COLORS.greyscale900 : COLORS.tansparentPrimary}]} >
                <TouchableOpacity onPress={()=> navigation.navigate('HoroscopeScreen')}>
                  <FontAwesome name="connectdevelop" size={size} style={styles.Icons} />
                  <Text style={[styles.text, {color: dark ? COLORS.white : COLORS.primary}]}>Horoscope Compatibility</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.boxContainer, {backgroundColor: dark ? COLORS.greyscale900 : COLORS.tansparentPrimary}]} >
                <TouchableOpacity onPress={()=> navigation.navigate('WeightControl')}>
                  <MaterialCommunityIcons name="format-line-weight" size={size} style={styles.Icons} />
                  <Text style={[styles.text, {color: dark ? COLORS.white : COLORS.primary}]}>Weight Control</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.boxContainer, {backgroundColor: dark ? COLORS.greyscale900 : COLORS.tansparentPrimary}]} >
                <TouchableOpacity onPress={()=> navigation.navigate('Drugs')}>
                  <Fontisto name="drug-pack" size={size} style={styles.Icons} />
                  <Text style={[styles.text, {color: dark ? COLORS.white : COLORS.primary}]}>Drugs</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.boxContainer, {backgroundColor: dark ? COLORS.greyscale900 : COLORS.tansparentPrimary}]} >
                <TouchableOpacity onPress={()=> navigation.navigate('KicksCounter')}>
                  <MaterialCommunityIcons name="counter" size={size} style={styles.Icons} />
                  <Text style={[styles.text, {color: dark ? COLORS.white : COLORS.primary}]}>Kicks Counter</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.boxContainer, {backgroundColor: dark ? COLORS.greyscale900 : COLORS.tansparentPrimary}]} >
                <TouchableOpacity onPress={()=> navigation.navigate('ContractionsCounterScreen')}>
                  <MaterialCommunityIcons name="cog-counterclockwise" size={size} style={styles.Icons} />
                  <Text style={[styles.text, {color: dark ? COLORS.white : COLORS.primary}]}>Contractions Counter</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.boxContainer, {backgroundColor: dark ? COLORS.greyscale900 : COLORS.tansparentPrimary}]}>
                <TouchableOpacity onPress={()=> navigation.navigate('RequirementListScreen')}>
                  <MaterialCommunityIcons name="bag-checked" size={size} style={styles.Icons} />
                  <Text style={[styles.text, {color: dark ? COLORS.white : COLORS.primary}]}>Requirement List</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.boxContainer, {backgroundColor: dark ? COLORS.greyscale900 : COLORS.tansparentPrimary}]}>
                <TouchableOpacity onPress={()=> navigation.navigate('CalendarScreen')}>
                  <AntDesign name="calendar" size={size} style={styles.Icons} />
                  <Text style={[styles.text, {color: dark ? COLORS.white : COLORS.primary}]}>Calendar</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.boxContainer, {backgroundColor: dark ? COLORS.greyscale900 : COLORS.tansparentPrimary}]}>
                <TouchableOpacity onPress={()=> navigation.navigate('NoteForMyBabyScreen')}>
                  <MaterialCommunityIcons name="notebook-edit-outline" size={size} style={styles.Icons} />
                  <Text style={[styles.text, {color: dark ? COLORS.white : COLORS.primary}]}>Note For My Baby</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.boxContainer, {backgroundColor: dark ? COLORS.greyscale900 : COLORS.tansparentPrimary}]}>
                <TouchableOpacity onPress={()=> navigation.navigate('HealthTestsScreen')}>
                  <Fontisto name="test-tube" size={size} style={styles.Icons} />
                  <Text style={[styles.text, {color: dark ? COLORS.white : COLORS.primary}]}>Health Tests</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.boxContainer, {backgroundColor: dark ? COLORS.greyscale900 : COLORS.tansparentPrimary}]}>
                <TouchableOpacity onPress={()=> navigation.navigate('AlbumScreen')}>
                  <AntDesign name="picture" size={size} style={styles.Icons} />
                  <Text style={[styles.text, {color: dark ? COLORS.white : COLORS.primary}]}>Album</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.boxContainer, {backgroundColor: dark ? COLORS.greyscale900 : COLORS.tansparentPrimary}]} >
                <TouchableOpacity onPress={()=> navigation.navigate('HelpCenter')}>
                  <MaterialCommunityIcons name="crosshairs-question" size={size} style={styles.Icons} />
                  <Text style={[styles.text, {color: dark ? COLORS.white : COLORS.primary}]}>FQA</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.boxContainer, {backgroundColor: dark ? COLORS.greyscale900 : COLORS.tansparentPrimary}]} >
                <TouchableOpacity onPress={()=> navigation.navigate('HelpCenter', {key: 'second'})}>
                  <AntDesign name="customerservice" size={size} style={styles.Icons} />
                  <Text style={[styles.text, {color: dark ? COLORS.white : COLORS.primary}]}>Contact Us</Text>
                </TouchableOpacity>
              </View>
 
              </View>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: COLORS.white,
    padding: 15,
    //width: SIZES.width - 32 ,
  },
  title: {
    fontSize: 18,
    fontFamily: "medium",
    color: COLORS.greyscale900,
    textAlign: "center",
    marginVertical: 54,
  },
  container1: {
    flex: 1,
    width: SIZES.width - 32 ,
    marginTop: 10,
    marginBottom: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'space-around',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
},
  boxContainer: {
      // borderWidth: 2,
      // borderColor: COLORS.primary,
      borderRadius: 20,
      margin: 10,
      width: (SIZES.width - 80) / 2 ,
      height: 120,
      justifyContent: 'center',
      alignContent: 'center',
      borderWidth: 1,
      borderRadius: 20,
      borderWidth: 0.02,
      shadowColor: "#000",
      shadowOffset: {
          width: 9,
          height: 9,
      },
      shadowOpacity: 0.275,
      shadowRadius: 13,
      
      elevation: 4,
  },
  text: {
      fontFamily: "semiBold",
      marginTop: 15,
      textAlign: 'center',
      fontWeight: 'bold',
  },
  Icons: {
      color: COLORS.primary,
      textAlign: 'center',
      marginTop: 10,
  },
  button: {
      width: 250,
  },

});

export default ToolsScreen