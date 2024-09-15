import { Image, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, SIZES, icons } from '@/constants';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@/theme/ThemeProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import Loading from '@/components/Loading';
import { ScrollView } from 'react-native-virtualized-view';
import RenderHTML from 'react-native-render-html';
import axios from 'axios';

export default function HoroscopeDetailScreen({ route }) {
    const navigation = useNavigation();
    const {width} = useWindowDimensions();
    const { colors, dark } = useTheme();
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    const momHoroscope = route.params.momHoroscope;
    const babyHoroscope = route.params.babyHoroscope;



    const getResult = async () => {
        setLoading(true);

        try {
        const response = await axios({
            method: 'get',
            url: 'https://api.momhera.com/api/HoroscopeCompatibilities/BurcUyumu', 
            params: {
            EnumMotherZodiac: momHoroscope,
            EnumBabyZodiac: babyHoroscope,
            Language: 'tr'
        }
        });

        let content = response.data.data.content;

        // img etiketlerinin src özniteliğine URL ekleme
        const baseURL = 'https://momhera.com'; // Değiştirilecek URL
        content = content.replace(/<img\s+src="(\/[^"]+)"/g, `<img src="${baseURL}$1"`);

        setContent(content);

    } catch (err) {       
        setError(err);
        console.log('Error fetching data:', err);
        } finally {
        setLoading(false);
        }

    };

    useEffect(() => {
        if (momHoroscope && babyHoroscope)
        getResult();
    },[momHoroscope, babyHoroscope]);



    if (loading) {
        return <Loading/>;
    }

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
            }]}>Horoscope Compatibility</Text>
         </View>
      </View>
    )
  }

  const source = {
    html: content
  }


  return (
    <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {renderHeader()}


    <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.HTLMcontainer}>
                <RenderHTML
                    source={source}
                    tagsStyles={styles.htmlStyles}
                    contentWidth={width}
                />
            </View>      
    </ScrollView>


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
        width: SIZES.width - 32,
      },
    headerContainer: {
        width: SIZES.width - 32,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginLeft: 12,
        paddingTop: getStatusBarHeight(),
      },
      headerLeftContainer: {
        flexDirection: "row",
        alignItems: "center"
      },
      backIcon: {
        height: 24,
        width: 24,
        tintColor: COLORS.black
      },
      headerTitle: {
        fontSize: 22,
        fontFamily: "bold",
        color: COLORS.greyscale900,
        marginLeft: 12
      },
      htmlStyles: {
        h3: {
            color: COLORS.primary,
            fontSize: 22,
            fontWeight: 'bold',
            marginVertical: 5,
        },
        h4: {
            color: COLORS.primary,
            fontSize: 18,
            fontWeight: 'bold',
            marginVertical: 4,
        },
        ol: {
          fontSize: 16,
          marginVertical: 2,

        },
        p: {
            fontSize: 16,
            marginVertical: 5,

        },
        ul: {
            marginVertical: 5,

        },
        strong: {
            color: COLORS.primary,

        },
        li: {
            fontSize: 16,
            marginVertical: 2,

        },
    },
    HTLMcontainer: {
        flex: 1,
        marginTop: 20,
        justifyContent: 'center',
        alignContent: 'center',
        margin: 10

    }
})