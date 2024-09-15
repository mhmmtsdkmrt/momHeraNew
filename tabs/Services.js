import { View, StyleSheet, FlatList } from 'react-native';
import React from 'react';
import SubHeaderItem from '../components/SubHeaderItem';
import { COLORS, SIZES } from '../constants';
import { services } from '../data';
import ServiceCard from '../components/ServiceCard';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme/ThemeProvider';

const Services = () => {
  const navigation = useNavigation();
  const { dark, colors } = useTheme();
  
  return (
    <View style={[styles.container, { 
      backgroundColor: dark ? COLORS.dark1 : COLORS.tertiaryWhite
    }]}>
       <SubHeaderItem
         title="Our Services"
         navTitle="See All"
         onPress={()=>navigation.navigate("OurServices")}
       />
       <View style={[styles.separateLine, { 
          backgroundColor: dark ? COLORS.grayscale700 : COLORS.grayscale200
       }]} />
       <FlatList
         data={services}
         keyExtractor={item=>item.id}
         renderItem={({ item })=>(
            <ServiceCard
              name={item.name}
              type={item.type}
              onPress={()=>console.log("Services")}
            />
         )}
       />
    </View>
  )
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 1,
        backgroundColor: COLORS.tertiaryWhite
    },
    separateLine: {
        width: SIZES.width - 32,
        height: 1,
        backgroundColor: COLORS.grayscale200
    }
})

export default Services