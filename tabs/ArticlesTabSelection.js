import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { COLORS } from '../constants';
import UpcomingBookings from './UpcomingBookings';
import CompletedBookings from './CompletedBookings';
import CancelledBookings from './CancelledBookings';
import { useTheme } from '../theme/ThemeProvider';

const TabContent = ({ tab }) => {
    const { colors, dark } = useTheme();
    // Your tab content components for "Upcoming", "Completed", and "Cancelled"
    switch (tab) {
        case 'Upcoming':
            return <><UpcomingBookings/></>;
        case 'Completed':
            return <><CompletedBookings/></>;
        case 'Cancelled':
            return <><CancelledBookings/></>;
        default:
            return null;
    }
};

const Tabs = ['Upcoming', 'Completed', 'Cancelled'];

const ArticlesTabSelection = () => {
    const [selectedTab, setSelectedTab] = useState('Upcoming');

    const renderItem = (item) => (
        <TouchableOpacity
            style={{
                paddingVertical: 8,
                paddingHorizontal: 18,
                backgroundColor: selectedTab === item ? COLORS.primary : "transparent",
                borderColor: COLORS.primary,
                borderWidth: 1.2,
                borderRadius: 24,
                marginRight: 6
            }}
            onPress={() => setSelectedTab(item)}>
            <Text style={{
                fontSize: 14,
                fontFamily: "semiBold",
                color: selectedTab === item ? '#FFFFFF' : COLORS.primary,
            }}>{item}</Text>
        </TouchableOpacity>
    );

    return (
        <View>
             <View style={{ 
                flexDirection: 'row',
                justifyContent:'space-between',
                alignItems: 'center',
                marginTop: 18
                }}>
            {Tabs.map((tab, index) => (
                <View key={index}>
                    {renderItem(tab)}
                </View>
            ))}
        </View>
        <View style={{ marginTop: 20 }}>
                <TabContent tab={selectedTab} />
            </View>
        </View>
    );
};

export default ArticlesTabSelection;
