import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../constants';

export default function ArticlesSliderDetail({results}) {

    const imagePath = 'https://momhera.com';
    const deneme = {uri: 'https://momhera.com/Image/Blog/tr/2abcf348-d1d8-4967-0efc-08dcd7e34e87/TitlePhoto/2abcf348-d1d8-4967-0efc-08dcd7e34e87_Compress.png'};

  return (
    
<View style={styles.articlesContainer}>


     {/* <ImageBackground imageStyle={styles.articlesImage} source={{uri: `${imagePath}` + results.imagePathUrl }} resizeMode= 'contain'/>   */}
                <ImageBackground source= {deneme} borderRadius={11} resizeMode='cover' resizeMethod='resize'>
                <Text style={styles.articlesHeader}>{results.name}</Text> 
                <Text style={styles.articlesText}>{results.description}</Text>
                </ImageBackground>  


</View>

  );
}

const styles = StyleSheet.create({
    
    articlesContainer: {
        borderColor: COLORS.transparentSecondary,
        borderRadius: 11,
        borderWidth: 1,
        width: 230,
        height: 150,
        marginRight: 10,
    },
    articlesText : {
        color: null,
        zIndex: -99,
        fontSize: 14,
        paddingLeft: 10,
        paddingBottom: 45,
        borderRadius: 20,
    },
    articlesHeader: {
        fontWeight: 'bold',
        zIndex: -99,
        fontSize: 15,
        padding: 10,
        borderRadius: 20,
    },
    articlesImage: {
        borderRadius: 20,
        // width: 10,
        // height: 10,
        flex: 1,
    },

})
