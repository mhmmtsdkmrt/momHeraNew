import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';
import { COLORS, SIZES, FONTS, icons } from '../constants';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import Button from "../components/Button";
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme/ThemeProvider';
import { mapDarkStyle, mapStandardStyle } from '../data/mapData';

const AboutUs = () => {
    const [expanded, setExpanded] = useState(false);
    const navigation = useNavigation();
    const { colors, dark } = useTheme();

    const description = ` We specialize in providing top-notch haircuts, beard trims, and grooming services for gentlemen of all ages. Our skilled team of barbers is dedicated to delivering a personalized experience, ensuring that each client leaves feeling confident and stylish. With a cozy and inviting atmosphere, you'll feel right at home as soon as you step through our doors. Whether you're looking for a classic haircut or a modern style, we've got you covered.`;

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    return (
        <View>
            <Text style={[styles.description, { 
                color: dark ? COLORS.grayscale400 : COLORS.grayscale700,
            }]} numberOfLines={expanded ? undefined : 2}>{description}</Text>
            <TouchableOpacity onPress={toggleExpanded}>
                <Text style={styles.viewBtn}>
                    {expanded ? 'View Less' : 'View More'}
                </Text>
            </TouchableOpacity>

            <Text style={[styles.subtitle, { 
               color: dark ? COLORS.white : COLORS.greyscale900,
            }]}>Working Hours</Text>
            <View style={styles.hoursContainer}>
                <Text style={[styles.hoursDay, { 
                    color: dark ? COLORS.grayscale200 : COLORS.grayscale700,
                }]}>Monday - Friday</Text>
                <Text style={[styles.hours, { 
                    color: dark ? COLORS.grayscale400: COLORS.black,
                }]}>9:00am - 5:00pm</Text>
            </View>
            <View style={styles.hoursContainer}>
                <Text style={[styles.hoursDay, { 
                     color: dark ? COLORS.grayscale200 : COLORS.grayscale700,
                }]}>Saturday - Sunday</Text>
                <Text style={[styles.hours, { 
                     color: dark ? COLORS.grayscale400: COLORS.black,
                }]}>9:00am - 5:00pm</Text>
            </View>
            <Text style={[styles.subtitle, { 
                color: dark ? COLORS.white : COLORS.greyscale900,
            }]}>Contact Us</Text>
            <Text style={styles.phoneNumber}>(406) 555-0120</Text>

            <View style={styles.viewContainer}>
                <Text style={[styles.viewLeft, { 
                    color: dark ? COLORS.white : COLORS.greyscale900,
                }]}>Our address</Text>
                <TouchableOpacity>
                    <Text style={styles.viewRight}>See on Maps</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.salonItemContainer}>
                <Image
                    source={icons.location2}
                    resizeMode='contain'
                    style={styles.locationIcon}
                />
                <Text style={[styles.locationText, { 
                    color: dark ? COLORS.grayscale400 : COLORS.grayscale700,
                }]}>6993 Meadow Valley Terrace, New York</Text>
            </View>

            <View style={[styles.locationMapContainer, { 
                backgroundColor: dark? COLORS.dark1 : COLORS.white,
            }]}>
                <MapView
                    style={styles.mapContainer}
                    provider={PROVIDER_GOOGLE}
                    customMapStyle={dark ? mapDarkStyle : mapStandardStyle }
                    userInterfaceStyle="dark"
                    initialRegion={{
                        latitude: 48.8566,
                        longitude: 2.3522,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}>
                    <Marker
                        coordinate={{
                            latitude: 48.8566,
                            longitude: 2.3522,
                        }}
                        image={icons.mapsOutline}
                        title="Move"
                        description="Address"
                        onPress={() => console.log("Move to another screen")}
                    >
                        <Callout tooltip>
                            <View>
                                <View style={styles.bubble}>
                                    <Text
                                        style={{
                                            ...FONTS.body4,
                                            fontWeight: 'bold',
                                            color: COLORS.black,
                                        }}
                                    >
                                        User Address
                                    </Text>
                                </View>
                                <View style={styles.arrowBorder} />
                                <View style={styles.arrow} />
                            </View>
                        </Callout>
                    </Marker>
                </MapView>
            </View>

            <Button
              filled
              title="Book Now"
              style={styles.bookBtn}
              onPress={() => navigation.navigate("BookAppointment")}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    description: {
        fontSize: 14,
        color: COLORS.grayscale700,
    },
    viewBtn: {
        color: COLORS.primary,
        marginTop: 5,
        fontSize: 14,
        fontFamily: "semiBold",
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.black,
        fontFamily: "bold",
        marginVertical: 8
    },
    hoursContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 8,
        width: SIZES.width - 32
    },
    hoursDay: {
        fontSize: 14,
        color: COLORS.grayscale700,
        fontFamily: "semiBold"
    },
    hours: {
        fontSize: 14,
        color: COLORS.black,
        fontFamily: "semiBold"
    },
    phoneNumber: {
        fontSize: 16,
        color: COLORS.primary,
        fontFamily: "bold",
        marginVertical: 4
    },
    viewContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 8,
        width: SIZES.width - 32
    },
    viewLeft: {
        fontSize: 16,
        color: COLORS.black,
        fontFamily: "bold"
    },
    viewRight: {
        fontSize: 14,
        color: COLORS.primary,
        fontFamily: "semiBold"
    },
    salonItemContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    locationIcon: {
        width: 14,
        height: 14,
        tintColor: COLORS.primary,
        marginRight: 8
    },
    locationText: {
        fontSize: 14,
        fontFamily: "medium",
        color: COLORS.grayscale700,
    },
    locationMapContainer: {
        height: 226,
        width: "100%",
        borderRadius: 12,
        marginVertical: 16
    },
    mapContainer: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        borderRadius: 12,
        backgroundColor: COLORS.dark2
    },
    viewMapContainer: {
        height: 50,
        backgroundColor: COLORS.gray,
        alignItems: "center",
        justifyContent: "center",
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25
    },
    bubble: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 6,
        borderColor: '#ccc',
        borderWidth: 0.5,
        padding: 15,
        width: 'auto',
    },
    // Arrow below the bubble
    arrow: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#fff',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -32,
    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#007a87',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -0.5,
    },
    headingLeft: {
        fontSize: 18,
        fontFamily: "Poppins Bold",
        color: COLORS.primary
    },
    headingRight: {
        fontSize: 12,
        fontFamily: "Poppins SemiBold",
        color: COLORS.primary
    },
    bookBtn: {
        marginBottom: 32
    }
})

export default AboutUs