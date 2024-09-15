import { FlatList, Image, StyleSheet, View } from 'react-native';
import React from 'react';
import SubHeaderItem from '../components/SubHeaderItem';
import { COLORS, SIZES } from '../constants';
import { ourGallery } from '../data';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme/ThemeProvider';

const numColumns = 3;
const screenWidth = SIZES.width -48;
const itemWidth = screenWidth / numColumns;

const OurGallery = () => {
    const navigation = useNavigation();
    const { colors, dark } = useTheme();

    const renderItem = ({ item }) => (
        <Image source={item} style={styles.image} />
    );

    return (
        <View style={[styles.container, { 
            backgroundColor: dark ? COLORS.dark1 : COLORS.tertiaryWhite,
        }]}>
            <SubHeaderItem
                title="Our Gallery"
                onPress={() =>navigation.navigate("SalonDetailsGallery")}
                navTitle="See All"
            />
            <View style={[styles.separateLine, { 
                backgroundColor: dark ? COLORS.grayscale700 : COLORS.grayscale200,
            }]} />
            <FlatList
                data={ourGallery}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={numColumns}
                contentContainerStyle={styles.container}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.tertiaryWhite,
    },
    separateLine: {
        width: SIZES.width - 32,
        height: 1,
        backgroundColor: COLORS.grayscale200,
        marginBottom: 12
    },
    image: {
        width: itemWidth,
        height: itemWidth,
        margin: 2,
        borderRadius: 16
    },
})

export default OurGallery