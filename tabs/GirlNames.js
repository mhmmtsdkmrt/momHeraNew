import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation, useTheme } from '@react-navigation/native';
import { COLORS, SIZES, images } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GirlNames({image}) {

    const navigation = useNavigation();
    const { dark, colors } = useTheme();

  return (
    <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
    <TouchableOpacity style={[styles.container, { 
        backgroundColor: dark ? COLORS.dark2 : COLORS.white,
    }]}>
        <Image
          source={images.logo}
          resizeMode='cover'
          style={styles.image}
        />
        <View style={styles.rightContainer}>
            <Text style={[styles.name, { 
                color: dark ? COLORS.white : COLORS.black,
            }]}>Kız Bebek İsimleri</Text>
            {/* <Text style={[styles.description, { 
                color: dark ? COLORS.grayscale400 : COLORS.grayscale700,
            }]}>{description}</Text> */}
        </View>
    </TouchableOpacity>
    <TouchableOpacity style={[styles.container, { 
        backgroundColor: dark ? COLORS.dark2 : COLORS.white,
    }]}>
        <Image
          source={images.logo}
          resizeMode='cover'
          style={styles.image}
        />
        <View style={styles.rightContainer}>
            <Text style={[styles.name, { 
                color: dark ? COLORS.white : COLORS.black,
            }]}> Modern Kız Bebek İsimleri</Text>
            {/* <Text style={[styles.description, { 
                color: dark ? COLORS.grayscale400 : COLORS.grayscale700,
            }]}>{description}</Text> */}
        </View>
    </TouchableOpacity>
    <TouchableOpacity style={[styles.container, { 
        backgroundColor: dark ? COLORS.dark2 : COLORS.white,
    }]}>
        <Image
          source={images.logo}
          resizeMode='cover'
          style={styles.image}
        />
        <View style={styles.rightContainer}>
            <Text style={[styles.name, { 
                color: dark ? COLORS.white : COLORS.black,
            }]}>İkili Kız Bebek İsimleri</Text>
            {/* <Text style={[styles.description, { 
                color: dark ? COLORS.grayscale400 : COLORS.grayscale700,
            }]}>{description}</Text> */}
        </View>
    </TouchableOpacity>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
    area: {
        flex: 1,
        backgroundColor: COLORS.white
      },
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
        marginRight: 12,
    },
    rightContainer: {
        marginLeft: 12,
        flex: 1,
        paddingVertical: 30,
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
})