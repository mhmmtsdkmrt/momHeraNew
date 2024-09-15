import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { COLORS, SIZES, icons } from '../constants'
import { useTheme } from '../theme/ThemeProvider'
import Header from '../components/Header';
import Loading from '@/components/Loading'
import RenderHTML from 'react-native-render-html'
import { getStatusBarHeight } from 'react-native-status-bar-height'

export default function ArticleShowDetailScreen({ route, navigation }) {

    const {colors, dark} = useTheme();
    const [header, setHeader] = useState(null);
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const id = route.params.id ;

    const {width} = useWindowDimensions();
    
    const getResult = async (id) => {
      setLoading(true);
      try {
        const response = await axios.get('https://api.momhera.com/api/Posts/WithDetails'+`/${id}`, {
        });

        let content = response.data.data.content;

        // img etiketlerinin src özniteliğine URL ekleme
        const imagePath = 'https://momhera.com'
        content = content.replace(/<img\s+src="(\/[^"]+)"/g, `<img src="${imagePath}$1"`);

        setHeader(response.data.data.title);
        setContent(content);
      } catch (e) {
        setError(e);
        console.log('Error fetching data:', e);
        } finally {
        setLoading(false);
        }
      };



    useEffect(() => {
        getResult(id);
    },[id]);

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
            {header}
          </Text>
        </View>
      </View>
    )
  }

  if (loading) {
    return <Loading/>;
}

const source = {
  html: content
}
  
  return (
    <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
        <View style= {[styles.container, { backgroundColor: colors.background }]}>
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
        articlesImage: {
            width: SIZES.width,
            height: SIZES.height *0.3,
            borderRadius: 16,
        },
        headerContainer: {
            flexDirection: "row",
            width: SIZES.width - 32,
            justifyContent: "space-between",
            margin: 10,
            paddingTop: 10+ getStatusBarHeight(),
        },
        backIcon: {
            width: 24,
            height: 24,
            tintColor: COLORS.white,
        },
        headerTitle: {
            fontSize: 20,
            fontFamily: 'bold',
            color: COLORS.black,
            marginLeft: 16,
            marginRight: 7
        },
        headerLeft: {
            flexDirection: "row",
            alignItems: "center"
        },
        settingsTitle: {
            fontSize: 18,
            fontFamily: "bold",
            color: COLORS.black,
            marginVertical: 26
        },
        body: {
            fontSize: 14,
            fontFamily: "regular",
            color: COLORS.black,
            marginTop: 4
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

