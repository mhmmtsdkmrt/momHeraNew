import { Image, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { COLORS, SIZES, icons, FONTS } from '@/constants';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@/theme/ThemeProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import Loading from '@/components/Loading';
import { ScrollView } from 'react-native-virtualized-view';
import RenderHTML from 'react-native-render-html';
import axios from 'axios';
import { useTranslation } from '@/Contexts/useTranslation';
import { TranslationsContext } from '@/Contexts/LanguageContext';

export default function HoroscopeDetailScreen({ route }) {
    const navigation = useNavigation();
    const {width} = useWindowDimensions();
    const { colors, dark } = useTheme();
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { t } = useTranslation();
    const { language } = useContext(TranslationsContext);



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
            Language: language
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
            }]}>{t.horoscopeCompatibility}</Text>
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
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    paddingHorizontal: 5
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

        headerContainer: {
            flexDirection: "row",
            width: SIZES.width - 32,
            justifyContent: "space-between",
            margin: 10,
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
        fontSize: 20,
        fontFamily: 'bold',
        color: COLORS.black,
        marginLeft: 16,
        marginRight: 7
    },

        htmlStyles: {
          h2: {
            ...FONTS.body2,
            color: COLORS.primary,
            fontSize: 22,
            fontWeight: '600', 
            marginVertical: 15
          },
          h3: {
              ...FONTS.body2,
              color: COLORS.primary,
              fontSize: 22,
              fontWeight: '300', 
              marginVertical: 5,
          },
          h4: {
              ...FONTS.body2,
              color: COLORS.primary,
              fontSize: 18,
              fontWeight: '300', 
              marginVertical: 4,
          },
          ol: {
            ...FONTS.body2,
            fontSize: 16,
            fontWeight: '300', 
            marginVertical: 2,
  
          },
          p: {
              ...FONTS.body2,
              fontSize: 16,
              fontWeight: '300', 
              marginVertical: 5,
  
          },
          ul: {
              ...FONTS.body2,
              fontWeight: '300', 
              marginVertical: 5,
  
          },
          strong: {
              ...FONTS.body2,
              fontWeight: '300', 
              color: COLORS.primary,
          },
          li: {
              ...FONTS.body2,
              fontSize: 16,
              fontWeight: '300', 
              marginVertical: 2,
  
          },
      HTMLcontainer: {
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
          marginLeft: 5
      }
    }
})