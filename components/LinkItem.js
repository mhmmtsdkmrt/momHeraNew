import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { COLORS, SIZES } from '../constants';
import { useTheme } from '../theme/ThemeProvider';

const LinkItem = ({   name, icon, onPress }) => {
    const { colors, dark } = useTheme();

  return (
    <View style={styles.container}>
        <TouchableOpacity 
           onPress={onPress}
           style={styles.iconContainer}>
            <Image
                source={icon}
                resizeMode='contain'
                style={styles.icon}
            />
        </TouchableOpacity>
        <Text style={[styles.name, { 
            color: dark? COLORS.white : COLORS.greyscale900
        }]}>{name}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 12,
        width: (SIZES.width - 32)/5
    },
    iconContainer: {
        width: 54,
        height: 54,
        borderRadius: 999,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 8,
        backgroundColor: COLORS.tansparentPrimary
    },
    icon: {
        height: 24,
        width: 24,
        tintColor: COLORS.primary
    },
    name: {
        fontSize: 14,
        fontFamily: "semiBold",
        color: COLORS.black
    }
})

export default LinkItem