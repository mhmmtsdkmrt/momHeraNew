import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation, useTheme } from '@react-navigation/native';
import { COLORS, SIZES, images, icons, FONTS } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from '@/Contexts/useTranslation';

export default function GirlNames() {

    const navigation = useNavigation();
    const { dark, colors } = useTheme();
    const { t } = useTranslation();

    const navigateToListScreen = (nameType, gender, headerTitle) => {
        navigation.navigate('BoyNamesListScreen', {EnumNameType: nameType, EnumCinsiyet: gender, headerTitle: headerTitle});
    }

  return (
    <SafeAreaView style={[styles.area, { backgroundColor: 'white' }]}>
    <TouchableOpacity onPress={()=> navigateToListScreen(1, 1, t.babyGirlNames)} style={[styles.container, { 
        backgroundColor: dark ? COLORS.dark2 : COLORS.white,
    }]}>
        <Image
          source={icons.girlNames3}
          resizeMode='cover'
          style={styles.image}
        />
        <View style={styles.rightContainer}>
            <Text style={[styles.name, { 
                color: dark ? COLORS.white : COLORS.black,
            }]}>{t.babyGirlNames}</Text>

        </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=> navigateToListScreen(2, 1, t.modernBabyGirlNames)} style={[styles.container, { 
        backgroundColor: dark ? COLORS.dark2 : COLORS.white,
    }]}>
        <Image
          source={icons.girlNames1}
          resizeMode='cover'
          style={styles.image}
        />
        <View style={styles.rightContainer}>
            <Text style={[styles.name, { 
                color: dark ? COLORS.white : COLORS.black,
            }]}>{t.modernBabyGirlNames}</Text>

        </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=> navigateToListScreen(3, 1, t.binaryBabyGirlNames)} style={[styles.container, { 
        backgroundColor: dark ? COLORS.dark2 : COLORS.white,
    }]}>
        <Image
          source={icons.girlNames2}
          resizeMode='cover'
          style={styles.image}
        />
        <View style={styles.rightContainer}>
            <Text style={[styles.name, { 
                color: dark ? COLORS.white : COLORS.black,
            }]}>{t.binaryBabyGirlNames}</Text>
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
        height: 110,
        backgroundColor: COLORS.white,
        width: SIZES.width - 45,
        borderRadius: 11,
        marginLeft: 4,
        paddingHorizontal: 8,
        paddingVertical: 8,
        marginBottom: 9,
        borderColor: '#FFAAAA',
        borderWidth: 0.4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10
    },
    image: {
        width: 80,
        height: 80,
        marginRight: 12,
    },
    rightContainer: {
        marginLeft: 12,
        flex: 1,
        height: 100,
        paddingVertical: 30,
    },
    name: {
        fontWeight: 600,
        ...FONTS.body3,
        fontSize: 18, 
        color: COLORS.black
    },
})