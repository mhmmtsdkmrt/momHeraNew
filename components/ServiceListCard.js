import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { COLORS, SIZES } from '../constants';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeProvider';

const ServiceListCard = ({ id, name, image, price, numBooked, onPress }) => {
  const [isSelected, setIsSelected] = useState(false);
  const { colors, dark } = useTheme();

  const handlePress = () => {
    setIsSelected(!isSelected);
    onPress(id); // Pass the id of the selected item to the parent component
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: dark ? COLORS.dark2 : COLORS.white },
        isSelected && { 
          borderColor: COLORS.primary 
        }, // Change border color if selected
      ]}
      onPress={handlePress}
    >
      <View style={styles.leftContainer}>
        <Image
          source={image}
          resizeMode='cover'
          style={styles.serviceImage}
        />
        <View>
          <Text style={[styles.name, { 
            color: dark ? COLORS.white : COLORS.black,
          }]}>{name}</Text>
          <Text style={[styles.numBooked, { 
            color: dark ? COLORS.greyscale300 : COLORS.grayscale700,
          }]}>{numBooked} booked</Text>
          <Text style={styles.price}>${price}</Text>
        </View>
      </View>
      <MaterialIcons
        name={isSelected ? "radio-button-on" : "radio-button-off"} // Change icon based on selection
        size={24}
        color={isSelected ? COLORS.primary : dark ? COLORS.primary : COLORS.gray} // Change icon color based on selection
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZES.width - 32,
    height: 96,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    flexDirection: "row",
    marginVertical: 12,
    paddingVertical: 6,
    paddingHorizontal: 6,
    alignItems: "center",
    borderWidth: 1.4, // Add border
    borderColor: "transparent" , // Set default border color
  },
  leftContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  serviceImage: {
    width: 76,
    height: 76,
    borderRadius: 12,
    marginRight: 12,
    marginLeft: 2
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.black,
    marginBottom: 6
  },
  numBooked: {
    fontSize: 14,
    color: COLORS.grayscale700,
    fontFamily: "medium"
  },
  price: {
    fontSize: 16,
    color: COLORS.primary,
    fontFamily: "bold",
    marginTop: 6
  }
});

export default ServiceListCard;
