import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useState } from 'react'
import { manHaircuts } from '../data';
import ServiceListCard from '../components/ServiceListCard';
import { COLORS } from '../constants';
import { useTheme } from '../theme/ThemeProvider';

const ManHaircuts = () => {
  const [selectedItems, setSelectedItems] = useState([]); 
  const { colors, dark } = useTheme();


  const handlePress = (itemId) => {
    // Toggle selection status of the item
    setSelectedItems(prevSelectedItems => {
      if (prevSelectedItems.includes(itemId)) {
        return prevSelectedItems.filter(id => id !== itemId);
      } else {
        return [...prevSelectedItems, itemId];
      }
    });
  };

  return (
    <View style={[styles.container, { 
      backgroundColor: dark ? COLORS.dark1 : COLORS.tertiaryWhite
    }]}>
       <FlatList
         data={manHaircuts}
         keyExtractor={item => item.id.toString()} // Assuming id is a number, convert it to stringkeyExtractor={item=>item.id}
         renderItem={({ item })=>(
            <ServiceListCard
                id={item.id}
                name={item.name}
                image={item.image}
                price={item.price}
                numBooked={item.numBooked}
                onPress={handlePress}
                isSelected={selectedItems.includes(item.id)} // Pass isSelected prop based on whether the item is selected
                />
         )}
       />
    </View>
  )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.tertiaryWhite
    }
})

export default ManHaircuts