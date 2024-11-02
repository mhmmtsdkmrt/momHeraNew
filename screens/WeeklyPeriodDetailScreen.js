import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, SIZES, icons } from '../constants'
import { useTheme } from '../theme/ThemeProvider'
import axios from 'axios';
import RenderHTML from 'react-native-render-html';
import Loading from '@/components/Loading';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export default function WeeklyPeriodDetailScreen({route, navigation}) {

    const { color, dark } = useTheme();

    const [content, setContent] = useState();
    const [title, setTitle] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const {width} = useWindowDimensions();

    const id = route.params.id;


    const getResult = async (id) => {
        setLoading(true);
        try {
        const response = await axios.get('https://api.momhera.com/api/Posts/WithDetails'+`/${id}`, {
        });

        let content = response.data.data.content;

        // img etiketlerinin src özniteliğine URL ekleme
        const baseURL = 'https://momhera.com'; // Değiştirilecek URL
        content = content.replace(/<img\s+src="(\/[^"]+)"/g, `<img src="${baseURL}$1"`);

        setContent(content);
        setTitle(response.data.data.title);
    } catch (err) {       
        setError(err);
        console.log('Error fetching data:', err);
        } finally {
        setLoading(false);
        }

    };

    useEffect(() => {
        getResult(id);
    },[id]);



    if (loading) {
        return <Loading/>;
    }



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
                {title}
              </Text>
            </View>
            </View>
        )
      }

      const source = {
        html: content
      }

  return (
    <SafeAreaView style={[styles.area, { backgroundColor: dark ? COLORS.dark1 : COLORS.white }]}>
      <View style={[styles.container, { backgroundColor: dark ? COLORS.dark1 : COLORS.white }]}>
            {renderHeader()}
                <ScrollView>
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
  )
};

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
        marginBottom: 16,
        paddingTop: 10 + getStatusBarHeight(), 
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

    }
})