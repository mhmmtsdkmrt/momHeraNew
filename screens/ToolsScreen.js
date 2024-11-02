import { View, Text, StyleSheet, ScrollView,  TouchableOpacity, Image, ImageBackground } from 'react-native';
import React from 'react';
import { COLORS, SIZES } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { useTheme } from '../theme/ThemeProvider';
import { AntDesign, Entypo, Fontisto, MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTranslation } from '@/Contexts/useTranslation';


const ToolsScreen = ({ navigation }) => {
  const { colors, dark } = useTheme();
  const {t} = useTranslation();
  const size = 40;
  const imageUri = {uri: 'https://momhera.com/Theme/dashboard/assets/dist/img/corner.png'};
 


  return (
    <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Header title={t.tools} />
       
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.container1, { backgroundColor: colors.background }]}>
            <ImageBackground source={imageUri} resizeMode="cover" style={styles.boxContainer}/>
          <ImageBackground/>
          <ImageBackground source={imageUri} resizeMode="cover" style={styles.boxContainer}/>
          <ImageBackground/>
          <View style={[styles.boxContainer, {backgroundColor: dark ? COLORS.greyscale900 : COLORS.tansparentPrimary}]}  >
                <TouchableOpacity onPress={()=> navigation.navigate('OnlineNotifications')}>
                  <MaterialCommunityIcons name="format-letter-case" size={size} style={styles.Icons}/>
                  <Text style={[styles.text, {color: dark ? COLORS.white : COLORS.primary}]}>{t.notifications}</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.boxContainer, {backgroundColor: dark ? COLORS.greyscale900 : COLORS.tansparentPrimary}]}  >
                <TouchableOpacity onPress={()=> navigation.navigate('FindName')}>
                  <MaterialCommunityIcons name="format-letter-case" size={size} style={styles.Icons}/>
                  <Text style={[styles.text, {color: dark ? COLORS.white : COLORS.primary}]}>{t.findName}</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.boxContainer, {backgroundColor: dark ? COLORS.greyscale900 : COLORS.tansparentPrimary}]}  >
                <TouchableOpacity onPress={()=> navigation.navigate('CalculatePregnancyScreen')}>
                  <MaterialIcons name="calculate" size={size} style={styles.Icons}/>
                  <Text style={[styles.text, {color: dark ? COLORS.white : COLORS.primary}]}>{t.calculatePregnancy}</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.boxContainer, {backgroundColor: dark ? COLORS.greyscale900 : COLORS.tansparentPrimary}]} >
                <TouchableOpacity onPress={()=> navigation.navigate('WeeklyPeriodScreen')}>
                  <MaterialCommunityIcons name="periodic-table" size={size} style={styles.Icons} />
                  <Text style={[styles.text, {color: dark ? COLORS.white : COLORS.primary}]}>{t.weeklyPeriod}</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.boxContainer, {backgroundColor: dark ? COLORS.greyscale900 : COLORS.tansparentPrimary}]} >
                <TouchableOpacity onPress={()=> navigation.navigate('HoroscopeScreen')}>
                  <FontAwesome name="connectdevelop" size={size} style={styles.Icons} />
                  <Text style={[styles.text, {color: dark ? COLORS.white : COLORS.primary}]}>{t.horoscopeCompatibility}</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.boxContainer, {backgroundColor: dark ? COLORS.greyscale900 : COLORS.tansparentPrimary}]} >
                <TouchableOpacity onPress={()=> navigation.navigate('WeightControl')}>
                  <MaterialCommunityIcons name="format-line-weight" size={size} style={styles.Icons} />
                  <Text style={[styles.text, {color: dark ? COLORS.white : COLORS.primary}]}>{t.weightControl}</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.boxContainer, {backgroundColor: dark ? COLORS.greyscale900 : COLORS.tansparentPrimary}]} >
                <TouchableOpacity onPress={()=> navigation.navigate('Drugs')}>
                  <Fontisto name="drug-pack" size={size} style={styles.Icons} />
                  <Text style={[styles.text, {color: dark ? COLORS.white : COLORS.primary}]}>{t.drugs}</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.boxContainer, {backgroundColor: dark ? COLORS.greyscale900 : COLORS.tansparentPrimary}]} >
                <TouchableOpacity onPress={()=> navigation.navigate('KicksCounter')}>
                  <MaterialCommunityIcons name="counter" size={size} style={styles.Icons} />
                  <Text style={[styles.text, {color: dark ? COLORS.white : COLORS.primary}]}>{t.kicksCounter}</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.boxContainer, {backgroundColor: dark ? COLORS.greyscale900 : COLORS.tansparentPrimary}]} >
                <TouchableOpacity onPress={()=> navigation.navigate('ContractionsCounterScreen')}>
                  <MaterialCommunityIcons name="cog-counterclockwise" size={size} style={styles.Icons} />
                  <Text style={[styles.text, {color: dark ? COLORS.white : COLORS.primary}]}>{t.contractionsCounter}</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.boxContainer, {backgroundColor: dark ? COLORS.greyscale900 : COLORS.tansparentPrimary}]}>
                <TouchableOpacity onPress={()=> navigation.navigate('RequirementListScreen')}>
                  <MaterialCommunityIcons name="bag-checked" size={size} style={styles.Icons} />
                  <Text style={[styles.text, {color: dark ? COLORS.white : COLORS.primary}]}>{t.requirementList}</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.boxContainer, {backgroundColor: dark ? COLORS.greyscale900 : COLORS.tansparentPrimary}]}>
                <TouchableOpacity onPress={()=> navigation.navigate('CalendarScreen')}>
                  <AntDesign name="calendar" size={size} style={styles.Icons} />
                  <Text style={[styles.text, {color: dark ? COLORS.white : COLORS.primary}]}>{t.calendar}</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.boxContainer, {backgroundColor: dark ? COLORS.greyscale900 : COLORS.tansparentPrimary}]}>
                <TouchableOpacity onPress={()=> navigation.navigate('NoteForMyBabyScreen')}>
                  <MaterialCommunityIcons name="notebook-edit-outline" size={size} style={styles.Icons} />
                  <Text style={[styles.text, {color: dark ? COLORS.white : COLORS.primary}]}>{t.noteForMyBaby}</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.boxContainer, {backgroundColor: dark ? COLORS.greyscale900 : COLORS.tansparentPrimary}]}>
                <TouchableOpacity onPress={()=> navigation.navigate('HealthTestsScreen')}>
                  <Fontisto name="test-tube" size={size} style={styles.Icons} />
                  <Text style={[styles.text, {color: dark ? COLORS.white : COLORS.primary}]}>{t.healthTests}</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.boxContainer, {backgroundColor: dark ? COLORS.greyscale900 : COLORS.tansparentPrimary}]}>
                <TouchableOpacity onPress={()=> navigation.navigate('AlbumScreen')}>
                  <AntDesign name="picture" size={size} style={styles.Icons} />
                  <Text style={[styles.text, {color: dark ? COLORS.white : COLORS.primary}]}>{t.album}</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.boxContainer, {backgroundColor: dark ? COLORS.greyscale900 : COLORS.tansparentPrimary}]} >
                <TouchableOpacity onPress={()=> navigation.navigate('HelpCenter')}>
                  <MaterialCommunityIcons name="crosshairs-question" size={size} style={styles.Icons} />
                  <Text style={[styles.text, {color: dark ? COLORS.white : COLORS.primary}]}>{t.FAQ}</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.boxContainer, {backgroundColor: dark ? COLORS.greyscale900 : COLORS.tansparentPrimary}]} >
                <TouchableOpacity onPress={()=> navigation.navigate('HelpCenter', {key: 'second'})}>
                  <AntDesign name="customerservice" size={size} style={styles.Icons} />
                  <Text style={[styles.text, {color: dark ? COLORS.white : COLORS.primary}]}>{t.contactUs}</Text>
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