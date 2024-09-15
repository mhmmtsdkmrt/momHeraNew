import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { COLORS, SIZES } from '../constants';
import { useTheme } from '../theme/ThemeProvider';

const PackageCard = ({  image, name, description, price, onPress }) => {
    const { colors, dark } = useTheme();

  return (
    <TouchableOpacity style={[styles.container, { 
        backgroundColor: dark ? COLORS.dark2 : COLORS.white,
    }]}>
        <Image
          source={image}
          resizeMode='cover'
          style={styles.image}
        />
        <View style={styles.rightContainer}>
            <Text style={[styles.name, { 
                color: dark ? COLORS.white : COLORS.black,
            }]}>{name}</Text>
            <Text style={[styles.description, { 
                color: dark ? COLORS.grayscale400 : COLORS.grayscale700,
            }]}>{description}</Text>
            <View style={styles.priceContainer}>
                <Text style={styles.price}>${price}</Text>
                <TouchableOpacity 
                   onPress={onPress}
                   style={styles.bookBtn}>
                    <Text style={styles.bookBtnText}>Book Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 132,
        backgroundColor: COLORS.white,
        width: SIZES.width - 32,
        borderRadius: 18,
        paddingHorizontal: 8,
        paddingVertical: 8,
        marginBottom: 10
    },
    image: {
        width: 112,
        height: 112,
        borderRadius: 22,
        marginRight: 12
    },
    rightContainer: {
        marginLeft: 12,
        flex: 1
    },
    name: {
        fontSize: 18,
        fontFamily: "bold",
        color: COLORS.black
    },
    description: {
        fontSize: 14,
        color: COLORS.grayscale700,
        fontFamily: "medium",
        marginVertical: 12
    },
    priceContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    price: {
        fontSize: 18,
        color: COLORS.primary,
        fontFamily: "bold"
    },
    bookBtn: {
        width: 92,
        height: 32,
        borderRadius: 32,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.primary
    },
    bookBtnText: {
        fontSize: 12,
        color: COLORS.white,
        fontFamily: "medium"
    }
})

export default PackageCard