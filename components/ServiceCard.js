import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS, SIZES, icons } from '../constants';
import { useTheme } from '../theme/ThemeProvider';

const ServiceCard = ({ name, type, product, price, onPress, isSelected }) => {
  const { colors, dark } = useTheme();

  return (
    <TouchableOpacity onPress={onPress} 
    style={[styles.container, isSelected && styles.selected, { 
      backgroundColor: dark ? COLORS.dark2 : COLORS.white,
      borderColor: dark? COLORS.dark2 : COLORS.white
    }]}>
      <Text style={[styles.name, { 
        color: dark ? COLORS.grayscale200 : COLORS.grayscale700
      }]}>{name}</Text>
      <View style={styles.typeContainer}>
        <View>
           {
            isSelected && (
            <View style={{ flexDirection: "column", alignItems: "flex-end"}}>
               <Text style={[styles.type, { 
                 color: dark ? COLORS.white : COLORS.black
               }]}>{product}</Text>
               <Text style={styles.price}>+${price}</Text>
            </View>)
           }
        </View>
        {
          !isSelected && (
            <Text style={[styles.type, { 
              color: dark ? COLORS.white : COLORS.black
            }]}>{type} Types</Text>
            ) 
        }
        <Image
          source={icons.right}
          resizeMode='contain'
          style={styles.arrowPlayIcon}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 58,
    flexDirection: "row",
    width: SIZES.width - 32,
    paddingHorizontal: 8,
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 12,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.white // default border color
  },
  selected: {
    height: 68,
    borderColor: COLORS.primary // border color when selected
  },
  name: {
    fontSize: 16,
    fontFamily: "semiBold",
    color: COLORS.grayscale700
  },
  typeContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  type: {
    fontSize: 16,
    fontFamily: "bold",
    color: COLORS.black
  },
  arrowPlayIcon: {
    width: 14,
    height: 14,
    tintColor: COLORS.primary,
    marginLeft: 12
  },
  price: {
    fontSize: 16,
    fontFamily: "bold",
    color: COLORS.primary,
    marginTop: 6
  },
});

export default ServiceCard;