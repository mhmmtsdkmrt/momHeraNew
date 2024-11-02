import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import ArticlesApi from '../apiConnections/ArticlesApi';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES } from '../constants';
import ArticlesSliderDetail from './ArticlesSliderDetail';

export default function ArticlesSlider() {

    const navigation = useNavigation();
    const [data] = ArticlesApi();


  return (
    <SafeAreaView style={styles.container}>

 
        <FlatList
        horizontal
        showsHorizontalScrollIndicator = {false}
        data={data}
        renderItem={({item})=> { 
          return(<TouchableOpacity onPress={() => navigation.navigate('ArticlesShowScreen', {id: item.id, name: item.name})}>
            <ArticlesSliderDetail results = {item} />
          </TouchableOpacity>); } }
        keyExtractor={item => item.id}
        style={styles.listContainer}
        />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        width: SIZES.width-32,
        height: 210,
        borderRadius: 11,
        borderTopWidth: 1,
        marginTop: 20,
        borderColor: COLORS.transparentSecondary,
        borderWidth: 1,
    },
    listContainer: {
        marginLeft: 8,
        marginTop: -20,
    },
})