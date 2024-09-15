import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import { COLORS } from '../constants';
import AboutUs from './AboutUs';
import Services from './Services';
import Packages from './Packages';
import OurGallery from './OurGallery';
import Reviews from './Reviews';

const TabContent = ({ tab }) => {
    switch (tab) {
        case 'About us':
            return <>
                <AboutUs />
            </>;
        case 'Services':
            return <>
                <Services />
            </>;
        case 'Package':
            return <>
                <Packages />
            </>;
        case 'Gallery':
            return <>
                <OurGallery />
            </>;
        case 'Reviews':
            return <>
                <Reviews />
            </>;
        default:
            return null;
    }
};

const Tabs = ['About us', 'Services', 'Package', 'Gallery', 'Reviews'];

const TabSelection = () => {
    const [selectedTab, setSelectedTab] = useState('About us');

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={{
                paddingVertical: 10,
                paddingHorizontal: 16,
                backgroundColor: selectedTab === item ? COLORS.primary : 'transparent',
                borderColor: COLORS.primary,
                borderWidth: 1.2,
                borderRadius: 18,
                marginRight: 6
            }}
            onPress={() => setSelectedTab(item)}>
            <Text style={{
                fontSize: 14,
                fontFamily: "bold",
                color: selectedTab === item ? COLORS.white : COLORS.primary,
            }}>{item}</Text>
        </TouchableOpacity>
    );

    return (
        <View>
            <FlatList
                horizontal
                data={Tabs}
                renderItem={renderItem}
                keyExtractor={(item) => item}
                showsHorizontalScrollIndicator={false}
            />
            <View style={{ marginTop: 20 }}>
                <TabContent tab={selectedTab} />
            </View>
        </View>
    );
};

export default TabSelection;
