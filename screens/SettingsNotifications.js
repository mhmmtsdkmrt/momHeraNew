import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { COLORS } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native-virtualized-view';
import Header from '../components/Header';
import GlobalSettingsItem from '../components/GlobalSettingsItem';
import { useTheme } from '../theme/ThemeProvider';

const SettingsNotifications = () => {
    const [isGeneralNotificationsEnabled, setIsGeneralNotificationsEnabled] = useState(true);
    const [isSoundEnabled, setIsSoundEnabled] = useState(true);
    const [isVibrateEnabled, setIsVibrateEnabled] = useState(false);
    const [isAppUpdatesEnabled, setIsAppUpdatesEnabled] = useState(true);
    const { colors, dark } = useTheme();

    // handle notifications
    const toggleGeneralNotifications = ()=>{
        setIsGeneralNotificationsEnabled(!isGeneralNotificationsEnabled);
    }

    const toggleSound = ()=>{
        setIsSoundEnabled(!isSoundEnabled);
    }

    const toggleVibrate = ()=>{
        setIsVibrateEnabled(!isVibrateEnabled);
    }

    const toggleAppUpdates = ()=>{
        setIsAppUpdatesEnabled(!isAppUpdatesEnabled);
    }


  return (
    <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar hidden />
            <Header title="Notifications" />
            <ScrollView 
                style={styles.settingsContainer} 
                showsVerticalScrollIndicator={false}>
               <GlobalSettingsItem
                 title="General Notifications"
                 isNotificationEnabled={isGeneralNotificationsEnabled}
                 toggleNotificationEnabled={toggleGeneralNotifications}
               />
               <GlobalSettingsItem
                 title="Sound"
                 isNotificationEnabled={isSoundEnabled}
                 toggleNotificationEnabled={toggleSound}
               />
               <GlobalSettingsItem
                 title="Vibrate"
                 isNotificationEnabled={isVibrateEnabled}
                 toggleNotificationEnabled={toggleVibrate}
               />
               <GlobalSettingsItem
                 title="App Updates"
                 isNotificationEnabled={isAppUpdatesEnabled}
                 toggleNotificationEnabled={toggleAppUpdates}
               />
            </ScrollView>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    area: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 16
    },
    settingsContainer: {
        marginVertical: 16
    }
})
export default SettingsNotifications