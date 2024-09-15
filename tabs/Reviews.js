import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import { COLORS, SIZES, icons } from '../constants';
import ReviewCard from '../components/ReviewCard';
import { salonReviews } from '../data';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme/ThemeProvider';

const Reviews = () => {
    const navigation = useNavigation();
    const { colors, dark } = useTheme();
    
    return (
        <View>
            <View style={styles.reviewContainer}>
                <View style={styles.reviewLeft}>
                    <Image
                        source={icons.starMiddle2}
                        resizeMode='contain'
                        style={styles.starMiddleIcon}
                    />
                    <Text style={[styles.reviewTitle, { 
                        color: dark? COLORS.white : COLORS.greyscale900
                    }]}>4.8 (3.279)</Text>
                </View>
                <TouchableOpacity onPress={()=>navigation.navigate("SalonDetailsReviews")}>
                    <Text style={styles.seeAll}>See All</Text>
                </TouchableOpacity>
            </View>
            <View style={{ marginVertical: 16 }}>
                <FlatList
                    data={salonReviews.slice(0, 4)}
                    keyExtractor={item => item.id}
                    renderItem={({ item, index }) => (
                        <ReviewCard
                            avatar={item.avatar}
                            name={item.name}
                            description={item.description}
                            avgRating={item.avgRating}
                            date={item.date}
                            numLikes={item.numLikes}
                        />
                    )}
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    reviewContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: SIZES.width - 32,
    },
    reviewLeft: {
        flexDirection: "row",
        alignItems: "center"
    },
    starMiddleIcon: {
        height: 18,
        width: 18,
        tintColor: COLORS.primary
    },
    reviewTitle: {
        fontFamily: "bold",
        color: COLORS.black,
        fontSize: 18
    },
    seeAll: {
        color: COLORS.primary,
        fontFamily: "semiBold",
        fontSize: 16
    }
})

export default Reviews