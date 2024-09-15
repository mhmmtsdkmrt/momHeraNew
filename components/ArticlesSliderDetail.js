import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../constants';

export default function ArticlesSliderDetail({results}) {

    const imagePath = 'https://momhera.com';

  return (
    
<View style={styles.articlesContainer}>

                <Text style={styles.articlesHeader}>{results.name}</Text> 
                <Text style={styles.articlesText}>{results.description}</Text>
     <ImageBackground imageStyle={styles.articlesImage} source={{uri: `${imagePath}` + results.imagePathUrl }} resizeMode= 'contain'/>  



</View>

  );
}

const styles = StyleSheet.create({
    
    articlesContainer: {
        borderColor: COLORS.transparentSecondary,
        borderRadius: 20,
        borderWidth: 1,
        width: 200,
        height: 182,
        marginRight: 10,
    },
    articlesText : {
        color: 'grey',
        fontSize: 14,
        paddingLeft: 10,
        paddingBottom: 45,
        borderRadius: 20,
    },
    articlesHeader: {
        fontWeight: 'bold',
        fontSize: 15,
        padding: 10,
        borderRadius: 20,
    },
    articlesImage: {
        borderRadius: 20,
        // width: null,
        // height: null,
        flex: 1,
    },

})
