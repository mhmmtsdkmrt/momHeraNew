import { View, Text, StyleSheet, ScrollView,  TouchableOpacity, Image, ImageBackground } from 'react-native';
import React from 'react';
import { COLORS, FONTS, SIZES } from '../constants';
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
  const imageUri = {uri: 'https://img.freepik.com/free-vector/appointment-booking-with-smartphone_23-2148565804.jpg?t=st=1730655855~exp=1730659455~hmac=17a6fc06ab6096b571650a10b3546997511ca7c5c71b3fe47593c2a62b0097fe&w=1380'};
  const imgPregnantCalculate = {uri: 'https://img.freepik.com/free-vector/menstrual-calendar-concept_23-2148671189.jpg?t=st=1730655358~exp=1730658958~hmac=4231eaa5d6bf91a7042444c51eb49d8bb4986649bbc1e9eb909e006b75467456&w=1380'};
  const imgFindName = { uri: 'https://img.freepik.com/free-vector/flat-design-gender-reveal-concept_23-2149005852.jpg?t=st=1730657733~exp=1730661333~hmac=a9ffbcb69a98369c1fea23eb58592287398ccb34de2defec4d5551b3fac34c29&w=1800'};
  const imgHoroscope = { uri: 'https://img.freepik.com/free-vector/watercolor-space-pattern-design_23-2150418928.jpg?t=st=1730658910~exp=1730662510~hmac=cf21afe327c386a75bd4002478ba4767e644169bded608855ea3d025ea257bbd&w=1380'};
  const imgKicks = { uri: 'https://img.freepik.com/premium-vector/picture-pregnant-woman-yoga-pose_844724-4449.jpg?w=1380'};
  const imgContractions = { uri: 'https://img.freepik.com/free-vector/organic-flat-midwives-day-illustration_23-2148900175.jpg?t=st=1731139792~exp=1731143392~hmac=dd1c5f792e1a4c2d45469c4d018ebb4d5b9f17720a9344e38a4e5affdccfbc72&w=1380'};
  const imgRequirement = { uri: 'https://img.freepik.com/premium-vector/pregnant-woman-butterfly-pose-pregnant-woman-practicing-yoga-cartoon-style_174639-53209.jpg?w=1380'};
  const imgWeightControl = { uri: 'https://img.freepik.com/free-vector/diet-concept-illustration_114360-5001.jpg?t=st=1731140981~exp=1731144581~hmac=3d97520c4e257f921ae813dde7aff601deaee7c079e6005a0e7b792c6074274f&w=1380'};

  return (
    <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Header title={t.tools} />
       
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.container1, { backgroundColor: colors.background }]}>

        <View style={styles.boxContainerLeft}>

              <TouchableOpacity onPress={()=> navigation.navigate('CalculatePregnancyScreen')}>
                            <ImageBackground
                              borderRadius={11}
                              resizeMode='cover'
                              resizeMethod='resize'
                              style={styles.imageBackground}
                              source={imgPregnantCalculate}
                              >
                              <View style={styles.boxSubContainer}>
                                <Text style={styles.text}>{t.calculatePregnancy}</Text>
                              </View>  
                            </ImageBackground>
              </TouchableOpacity>

            </View>

            <View style={styles.boxContainerRight}>

                  <TouchableOpacity onPress={()=> navigation.navigate('WeeklyPeriodScreen')}>
                            <ImageBackground
                              borderRadius={11}
                              resizeMode='cover'
                              resizeMethod='resize'
                              style={styles.imageBackground}
                              source={imageUri}
                              >
                              <View style={styles.boxSubContainer}>
                                <Text style={styles.text}>{t.weekByWeek}</Text>
                              </View>  
                            </ImageBackground>
                  </TouchableOpacity>

            </View>

            <View style={styles.boxContainerLeft}>

              <TouchableOpacity onPress={()=> navigation.navigate('FindName')}>
                            <ImageBackground
                              borderRadius={11}
                              resizeMode='cover'
                              resizeMethod='resize'
                              style={styles.imageBackground}
                              source={imgFindName}
                              >
                              <View style={styles.boxSubContainer}>
                                <Text style={styles.text}>{t.findName}</Text>
                              </View>  
                            </ImageBackground>
              </TouchableOpacity>

            </View>

            <View style={styles.boxContainerRight}>

              <TouchableOpacity onPress={()=> navigation.navigate('HoroscopeScreen')}>
                            <ImageBackground
                              borderRadius={11}
                              resizeMode='cover'
                              resizeMethod='resize'
                              style={styles.imageBackground}
                              source={imgHoroscope}
                              >
                              <View style={styles.boxSubContainer}>
                                <Text style={styles.text}>{t.horoscopeCompatibility}</Text>
                              </View>  
                            </ImageBackground>
              </TouchableOpacity>

            </View>

            <View style={styles.boxContainerLeft}>

              <TouchableOpacity onPress={()=> navigation.navigate('KicksCounter')}>
                            <ImageBackground
                              borderRadius={11}
                              resizeMode='cover'
                              resizeMethod='resize'
                              style={styles.imageBackground}
                              source={imgKicks}
                              >
                              <View style={styles.boxSubContainer}>
                                <Text style={styles.text}>{t.kicksCounter}</Text>
                              </View>  
                            </ImageBackground>
              </TouchableOpacity>

            </View>

            <View style={styles.boxContainerRight}>

              <TouchableOpacity onPress={()=> navigation.navigate('ContractionsCounterScreen')}>
                            <ImageBackground
                              borderRadius={11}
                              resizeMode='cover'
                              resizeMethod='resize'
                              style={styles.imageBackground}
                              source={imgContractions}
                              >
                              <View style={styles.boxSubContainer}>
                                <Text style={styles.text}>{t.contractionsCounter}</Text>
                              </View>  
                            </ImageBackground>
              </TouchableOpacity>

            </View>

            <View style={styles.boxContainerLeft}>

              <TouchableOpacity onPress={()=> navigation.navigate('RequirementListScreen')}>
                            <ImageBackground
                              borderRadius={11}
                              resizeMode='cover'
                              resizeMethod='resize'
                              style={styles.imageBackground}
                              source={imgRequirement}
                              >
                              <View style={styles.boxSubContainer}>
                                <Text style={styles.text}>{t.requirementList}</Text>
                              </View>  
                            </ImageBackground>
              </TouchableOpacity>

            </View>

            <View style={styles.boxContainerRight}>

              <TouchableOpacity onPress={()=> navigation.navigate('WeightControl')}>
                            <ImageBackground
                              borderRadius={11}
                              resizeMode='cover'
                              resizeMethod='resize'
                              style={styles.imageBackground}
                              source={imgWeightControl}
                              >
                              <View style={styles.boxSubContainer}>
                                <Text style={styles.text}>{t.weightControl}</Text>
                              </View>  
                            </ImageBackground>
              </TouchableOpacity>

            </View>
            


          {/* <View style={[styles.boxContainer, {backgroundColor: dark ? COLORS.greyscale900 : COLORS.tansparentPrimary}]}  >
                <TouchableOpacity onPress={()=> navigation.navigate('OnlineNotifications')}>
                  <MaterialCommunityIcons name="format-letter-case" size={size} style={styles.Icons}/>
                  <Text style={[styles.text, {color: dark ? COLORS.white : COLORS.primary}]}>{t.notifications}</Text>
                </TouchableOpacity>
              </View> */}
              {/* <View style={[styles.boxContainer, {backgroundColor: dark ? COLORS.greyscale900 : COLORS.tansparentPrimary}]}  >
                <TouchableOpacity onPress={()=> navigation.navigate('FindName')}>
                  <MaterialCommunityIcons name="format-letter-case" size={size} style={styles.Icons}/>
                  <Text style={[styles.text, {color: dark ? COLORS.white : COLORS.primary}]}>{t.findName}</Text>
                </TouchableOpacity>
              </View> */}
              {/* <View style={[styles.boxContainer, {backgroundColor: dark ? COLORS.greyscale900 : COLORS.tansparentPrimary}]}  >
                <TouchableOpacity onPress={()=> navigation.navigate('CalculatePregnancyScreen')}>
                  <MaterialIcons name="calculate" size={size} style={styles.Icons}/>
                  <Text style={[styles.text, {color: dark ? COLORS.white : COLORS.primary}]}>{t.calculatePregnancy}</Text>
                </TouchableOpacity>
              </View> */}
              {/* <View style={[styles.boxContainer, {backgroundColor: dark ? COLORS.greyscale900 : COLORS.tansparentPrimary}]} >
                <TouchableOpacity onPress={()=> navigation.navigate('WeeklyPeriodScreen')}>
                  <MaterialCommunityIcons name="periodic-table" size={size} style={styles.Icons} />
                  <Text style={[styles.text, {color: dark ? COLORS.white : COLORS.primary}]}>{t.weeklyPeriod}</Text>
                </TouchableOpacity>
              </View> */}
              {/* <View style={[styles.boxContainer, {backgroundColor: dark ? COLORS.greyscale900 : COLORS.tansparentPrimary}]} >
                <TouchableOpacity onPress={()=> navigation.navigate('HoroscopeScreen')}>
                  <FontAwesome name="connectdevelop" size={size} style={styles.Icons} />
                  <Text style={[styles.text, {color: dark ? COLORS.white : COLORS.primary}]}>{t.horoscopeCompatibility}</Text>
                </TouchableOpacity>
              </View> */}
              {/* <View style={[styles.boxContainer, {backgroundColor: dark ? COLORS.greyscale900 : COLORS.tansparentPrimary}]} >
                <TouchableOpacity onPress={()=> navigation.navigate('WeightControl')}>
                  <MaterialCommunityIcons name="format-line-weight" size={size} style={styles.Icons} />
                  <Text style={[styles.text, {color: dark ? COLORS.white : COLORS.primary}]}>{t.weightControl}</Text>
                </TouchableOpacity>
              </View> */}
              {/* <View style={[styles.boxContainer, {backgroundColor: dark ? COLORS.greyscale900 : COLORS.tansparentPrimary}]} >
                <TouchableOpacity onPress={()=> navigation.navigate('Drugs')}>
                  <Fontisto name="drug-pack" size={size} style={styles.Icons} />
                  <Text style={[styles.text, {color: dark ? COLORS.white : COLORS.primary}]}>{t.drugs}</Text>
                </TouchableOpacity>
              </View> */}
              {/* <View style={[styles.boxContainer, {backgroundColor: dark ? COLORS.greyscale900 : COLORS.tansparentPrimary}]} >
                <TouchableOpacity onPress={()=> navigation.navigate('KicksCounter')}>
                  <MaterialCommunityIcons name="counter" size={size} style={styles.Icons} />
                  <Text style={[styles.text, {color: dark ? COLORS.white : COLORS.primary}]}>{t.kicksCounter}</Text>
                </TouchableOpacity>
              </View> */}
              {/* <View style={[styles.boxContainer, {backgroundColor: dark ? COLORS.greyscale900 : COLORS.tansparentPrimary}]} >
                <TouchableOpacity onPress={()=> navigation.navigate('ContractionsCounterScreen')}>
                  <MaterialCommunityIcons name="cog-counterclockwise" size={size} style={styles.Icons} />
                  <Text style={[styles.text, {color: dark ? COLORS.white : COLORS.primary}]}>{t.contractionsCounter}</Text>
                </TouchableOpacity>
              </View> */}
              {/* <View style={[styles.boxContainer, {backgroundColor: dark ? COLORS.greyscale900 : COLORS.tansparentPrimary}]}>
                <TouchableOpacity onPress={()=> navigation.navigate('RequirementListScreen')}>
                  <MaterialCommunityIcons name="bag-checked" size={size} style={styles.Icons} />
                  <Text style={[styles.text, {color: dark ? COLORS.white : COLORS.primary}]}>{t.requirementList}</Text>
                </TouchableOpacity>
              </View> */}
              {/* <View style={[styles.boxContainer, {backgroundColor: dark ? COLORS.greyscale900 : COLORS.tansparentPrimary}]}>
                <TouchableOpacity onPress={()=> navigation.navigate('CalendarScreen')}>
                  <AntDesign name="calendar" size={size} style={styles.Icons} />
                  <Text style={[styles.text, {color: dark ? COLORS.white : COLORS.primary}]}>{t.calendar}</Text>
                </TouchableOpacity>
              </View> */}
              {/* <View style={[styles.boxContainer, {backgroundColor: dark ? COLORS.greyscale900 : COLORS.tansparentPrimary}]}>
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
              </View> */}
 
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
  boxContainerRight: {
    width: (SIZES.width - 64)/2, 
    height: 300, 
    borderRadius: 11, 
    marginTop: 10, 
    marginBottom: 10, 
    backgroundColor: 'white', // Gölgenin görünmesi için arka plan rengi ekleyin
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10
  },
  boxContainerLeft: {
    width: (SIZES.width - 64)/2, 
    height: 300, 
    borderRadius: 11, 
    marginTop: 10, 
    marginBottom: 10,
    marginRight: 20, 
    backgroundColor: 'white', // Gölgenin görünmesi için arka plan rengi ekleyin
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10
  },
  text: {
    ...FONTS.body4, 
    textAlign: 'center', 
    fontSize: 18, 
    fontWeight: '600', 
    color: COLORS.primary
  },
  imageBackground: {
    width: (SIZES.width - 64)/2, 
    height: 300, 
    justifyContent: 'flex-end', 
    overflow: 'hidden'
  },
  boxSubContainer: {
    alignItems: 'stretch', 
    backgroundColor: 'white', 
    padding: 10, 
    margin: 5, 
    borderBottomRightRadius: 11, 
    borderBottomLeftRadius: 11
  },

});

export default ToolsScreen