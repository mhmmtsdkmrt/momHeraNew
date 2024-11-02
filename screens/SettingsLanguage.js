import { View, Text, StyleSheet } from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { COLORS } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { ScrollView } from 'react-native-virtualized-view';
import LanguageItem from '../components/LanguageItem';
import { useTheme } from '../theme/ThemeProvider';
import { useTranslation } from '@/Contexts/useTranslation';
import { TranslationsContext } from '@/Contexts/LanguageContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsLanguage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const { colors, dark } = useTheme();
  const { t } = useTranslation();
  const { setLanguage } = useContext(TranslationsContext);


  const storeSelectedLanguage = async (lang) => {
    try {
      await AsyncStorage.setItem('selectedLanguage', lang);
    } catch (error) {
      console.error('Dil seçimi kaydedilemedi:', error);
    }
  };

  // selectedLanguage değerini AsyncStorage'dan yükle
  const loadSelectedLanguage = useCallback(async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('selectedLanguage');
      if (savedLanguage) {
        setSelectedLanguage(savedLanguage);
        setLanguage(savedLanguage); // Varsayılan dili de yükle
      }
    } catch (error) {
      console.error('Dil seçimi yüklenemedi:', error);
    }
  }, [setLanguage]);

  useEffect(() => {
    loadSelectedLanguage();
  }, [loadSelectedLanguage]);

  const handleCheckboxPress = (itemTitle, lang) => {
    if (selectedLanguage === itemTitle) {
      setSelectedLanguage(null);
      storeSelectedLanguage(null);
    } else {
      setSelectedLanguage(itemTitle);
      setLanguage(lang);
      storeSelectedLanguage(lang);
    }
  };


  return (
    <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Header title={t.languageSelection} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={[styles.title, { color: dark ? COLORS.white : COLORS.black }]}>{t.suggested}</Text>
          <View style={{ marginTop: 12 }}>
            <LanguageItem
              checked={selectedLanguage === 'tr'}
              name={t.turkish}
              onPress={() => {handleCheckboxPress('tr', 'tr')}}
            />
            <LanguageItem
              checked={selectedLanguage === 'en'}
              name={t.english}
              onPress={() => {handleCheckboxPress('en', 'en')}}
            />
          </View>
          <Text style={[styles.title, { color: dark ? COLORS.white : COLORS.black }]}>{t.other}</Text>
          <LanguageItem
            checked={selectedLanguage === 'es'}
            name={t.spanish}
            onPress={() => {handleCheckboxPress('es', 'es')}}
          />
          <LanguageItem
            checked={selectedLanguage === 'fr'}
            name={t.french}
            onPress={() => {handleCheckboxPress('fr', 'fr')}}
          />
          <LanguageItem
            checked={selectedLanguage === 'de'}
            name={t.german}
            onPress={() => {handleCheckboxPress('de', 'de')}}
          />
          <LanguageItem
            checked={selectedLanguage === 'id'}
            name={t.endonesian}
            onPress={() => {handleCheckboxPress('id' , 'id')}}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  )
};

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
  title: {
    fontSize: 20,
    fontFamily: "bold",
    color: COLORS.black,
    marginVertical: 16
  }
})

export default SettingsLanguage