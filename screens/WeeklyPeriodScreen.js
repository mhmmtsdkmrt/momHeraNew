import { Image, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { COLORS, SIZES, icons, images} from '../constants'
import { ScrollView } from 'react-native-virtualized-view'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useTheme } from '@react-navigation/native'
import { TabBar, TabView } from 'react-native-tab-view'
import { ProfileContext } from '../Contexts/ProfileGetApi'
import { pregnancyData } from '../data'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';
import axios from 'axios';
import Header from '../components/Header';
import Loading from '@/components/Loading';
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { useTranslation } from '@/Contexts/useTranslation'


export default function WeeklyPeriodScreen() {
    const { colors, dark } = useTheme();
    const layout = useWindowDimensions();
    const { t } = useTranslation();


    const navigation = useNavigation();
    const {currentWeek} = useContext(ProfileContext);
    const imagePath = 'https://momhera.com';


    const [index, setIndex] = useState(currentWeek - 1);
    const [weekDataApi, setweekDataApi] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [postId, setPostId] = useState();
    const routes = Array.from({ length: 42 }, (_, i) => ({
        key: `week${i + 1}`,
        title: `${i + 1}.`+`${t.week}`,
    }));


        const fetchWeeklyData = async (weekNumber) => {
            setLoading(true);
            try {
                const response = await axios.get(`https://api.momhera.com/api/DonemlikGelisimBilgisis/HaftaHaftaHamilelik/WithBaseDetails/${weekNumber}`, {
                    params: {
                        language: 'tr',
                    },
                });
                setweekDataApi(response.data.data);
                setPostId(response.data.data.postId)
            } catch (e) {
                setError(e);
                console.log('API Hatası:', e);
            } finally {
                setLoading(false);
            }
        };

        useEffect(() => {
            const weekNumber = routes[index].key.replace('week', '');
            fetchWeeklyData(weekNumber);
        }, [index]);
    

    

    const renderScene = ({ route }) => {

        if (loading) {
            return <Loading/>;
        }
        
        const weekNumber = route.key.replace('week', '');
        const weekData = pregnancyData[weekNumber];



        return (
            <View style={{flex: 1, backgroundColor: COLORS.white}}>
            <ScrollView >
                <View style={styles.howMuchContainer}>
                {weekData?.image && <Image source={weekData.image} style={styles.image} />}
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={styles.howMuchDetail}>
                    <Entypo name="ruler" size={25} color={COLORS.primary} style={styles.icons}/>
                    <Text style={styles.title}>{t.length}: </Text><Text style={styles.titleData}>{weekData?.size}</Text>
                </View>
                <View style={styles.howMuchDetail}>
                    <FontAwesome6 name="weight-scale" size={25} color={COLORS.primary} style={styles.icons}/>
                    <Text style={styles.title}>{t.weight}: </Text><Text style={styles.titleData}>{weekData?.weight}</Text>
                </View>
                </View>
                <View style={styles.howMuchDetail}>
                    <FontAwesome5 name="baby" size={25} color={COLORS.primary} style={styles.icons}/>
                    <Text style={styles.title}>{t.size}: </Text><Text style={[styles.titleData, {marginEnd: 70}]}>{weekData?.title}</Text>
                </View>
                </View>
            
                <View style={styles.weeklyDetailContainer}>
                    
                    <Image source={{uri: `${imagePath}` + weekDataApi.imageUrl}} style={styles.weeklyDetailImage}/>
                    <View style={{flex: 1}}>
                    <Text ellipsizeMode='tail' numberOfLines={5} style={styles.weeklyDetailTitle}>{weekDataApi.description}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('WeeklyPeriodDetailScreen', {id: postId})}>
                    <Text style={{alignSelf: 'flex-end', color: COLORS.primary, fontFamily: 'bold', fontSize: 15}}>{t.readMore}</Text>
                    </TouchableOpacity>
                    </View>

                </View>



                <View style={styles.questionsContainer}>

                        <Text style={{marginLeft: 12, color: COLORS.primary, fontSize: 16, fontFamily: "bold", borderBottomColor: 'grey', borderBottomWidth: 1, marginEnd: 50}}>Bunlar da ilginizi çekebilir.</Text>

                        <TouchableOpacity>
                            <View style={styles.questionsDownContainer}>
                                <Image source={images.pregnantCare} style={styles.questionImage}/>
                                <Text style={styles.questionsTitle}>{weekNumber} Haftalık Hamilelikte Nelere Dikkat Edilmeli?</Text>
                                </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.questionsDownContainer}>
                                <Image source={images.pregnantFood} style={styles.questionImage}/>
                                <Text style={styles.questionsTitle}>{weekNumber} Haftalık Hamilelikte Beslenme Nasıl Olmalı?</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.questionsDownContainer}>
                                <Image source={images.pregnantTest} style={styles.questionImage}/>
                                <Text style={styles.questionsTitle}>{weekNumber} Haftalık Hamilelikte Hangi Testler Yapılır?</Text>
                            </View>
                        </TouchableOpacity>                       
                        <TouchableOpacity>
                            <View style={styles.questionsDownContainer}>   
                                <Image source={images.pregnantProblem} style={styles.questionImage}/>
                                <Text style={styles.questionsTitle}>{weekNumber} Haftalık Hamilelikte Sıklıkla Yaşanan Sorunlar Nelerdir?</Text>
                            </View>
                        </TouchableOpacity>

                </View> 
                
            </ScrollView>
            </View>
        );
    };

    const renderTabBar = (props) => (
        <TabBar
            {...props}
            scrollEnabled= {true} // TabBar'ın kaydırılabilir olmasını sağlar
            indicatorStyle={{ backgroundColor: COLORS.primary }}
            style={{ backgroundColor: dark ? COLORS.dark1 : COLORS.white}}
            renderLabel={({ route, focused }) => (
                <Text style={[{
                    color: focused ? COLORS.primary : 'gray',
                    fontSize: 16,
                    fontFamily: "bold"
                }]}>
                    {route.title}
                </Text>
            )}
            tabStyle={{ width: layout.width / 3 }} // Her sekmenin genişliğini ayarlar
        />
    );

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
                }]}> {t.weekByWeek}</Text>
             </View>
          </View>
        )
      }

  return (
    <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Header title={t.weekByWeek}/>
            {/* {renderHeader()} */}

            <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: layout.width }}
                    renderTabBar={renderTabBar}
                    swipeEnabled={true}
                    style={{marginHorizontal: -20}}
                />

        </View>
    </SafeAreaView> 
  )
};

const styles = StyleSheet.create({
    area: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingTop: getStatusBarHeight() 
      },
      container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: COLORS.white,
        paddingHorizontal: 15
        //width: SIZES.width - 32 ,
      },
      headerContainer: {
        width: SIZES.width - 32,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: COLORS.white,
      },
      headerLeftContainer: {
        flexDirection: "row",
        alignItems: "center"
      },
      headerTitle: {
        fontSize: 22,
        fontFamily: "bold",
        color: COLORS.greyscale900
      },
      backIcon: {
        height: 24,
        width: 24,
        tintColor: COLORS.black
      },
        image: {
            resizeMode: 'contain',
            resizeMethod: 'resize',
            width: 180,
            height: 180,
            marginLeft: 80,
        },
        text: {
            fontSize: 17,
            textAlign: 'center',
            color: COLORS.primary,
            fontWeight: 'bold',
        },
        howMuchContainer: { },
        icons: {
            backgroundColor: COLORS.tansparentPrimary,
            borderRadius: 999,
            height: 30,
            width: 30,
            textAlign: 'center'
        },
        howMuchDetail: {
            flexDirection: 'row',
            margin: 10
        },
        title:{
            marginLeft: 10,
            fontSize: 16,
            fontFamily: "bold"
        },
        titleData: {
            fontSize: 16,
        },
        questionsContainer: {
            marginTop: 20,
        },
        questionImage: {
            borderRadius: 20,
            width: 80,
            height: 80
        },
        questionsDownContainer: {
            flexDirection: 'row',
            marginLeft: 10,
            marginTop: 10,

        },
        questionsTitle: {
            marginTop: 10,
            color: COLORS.gray2,
            marginLeft: 15,
            fontSize: 15,
            fontFamily: "bold",
            marginEnd: 90,
        },
        weeklyDetailContainer: {
            flexDirection: 'row',
            marginTop: 20
        },
        weeklyDetailImage: {
            borderRadius: 20,
            width: 120,
            height: 120,
            margin: 10,
        },
        weeklyDetailTitle: {
            marginTop: 10,
            color: COLORS.gray2,
            fontSize: 17,
            fontFamily: "bold",
        },
})