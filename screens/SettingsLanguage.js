import { View, Text, StyleSheet } from 'react-native';
import React, { useCallback, useState } from 'react';
import { COLORS } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { ScrollView } from 'react-native-virtualized-view';
import LanguageItem from '../components/LanguageItem';
import { useTheme } from '../theme/ThemeProvider';

const SettingsLanguage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const { colors, dark } = useTheme();

  const handleCheckboxPress = (itemTitle) => {
    if (selectedLanguage === itemTitle) {
      // If the clicked item is already selected, deselect it
      setSelectedLanguage(null);
    } else {
      // Otherwise, select the clicked item
      setSelectedLanguage(itemTitle);
    }
  };


  return (
    <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Header title="Language & Region" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={[styles.title, { color: dark ? COLORS.white : COLORS.black }]}>Suggested</Text>
          <View style={{ marginTop: 12 }}>
            <LanguageItem
              checked={selectedLanguage === 'Turkish'}
              name="Turkish"
              onPress={() => {handleCheckboxPress('Turkish')}}
            />
            <LanguageItem
              checked={selectedLanguage === 'English (US)'}
              name="English (US)"
              onPress={() => handleCheckboxPress('English (US)')}
            />
            <LanguageItem
              checked={selectedLanguage === 'English (UK)'}
              name="English (UK)"
              onPress={() => handleCheckboxPress('English (UK)')}
            />
          </View>
          <Text style={[styles.title, { color: dark ? COLORS.white : COLORS.black }]}>Others</Text>
          {/* <LanguageItem
            checked={selectedLanguage === 'Mandarin'}
            name="Mandarin"
            onPress={() => handleCheckboxPress('Mandarin')}
          />
          <LanguageItem
            checked={selectedLanguage === 'Hindi'}
            name="Hindi"
            onPress={() => handleCheckboxPress('Hindi')}
          /> */}
          <LanguageItem
            checked={selectedLanguage === 'Spanish'}
            name="Spanish"
            onPress={() => handleCheckboxPress('Spanish')}
          />
          <LanguageItem
            checked={selectedLanguage === 'French'}
            name="French"
            onPress={() => handleCheckboxPress('French')}
          />
          <LanguageItem
            checked={selectedLanguage === 'German'}
            name="German"
            onPress={() => handleCheckboxPress('German')}
          />
          <LanguageItem
            checked={selectedLanguage === 'Arabic'}
            name="Arabic"
            onPress={() => handleCheckboxPress('Arabic')}
          />
          {/* <LanguageItem
            checked={selectedLanguage === 'Bengali'}
            name="Bengali"
            onPress={() => handleCheckboxPress('Bengali')}
          /> */}
          <LanguageItem
            checked={selectedLanguage === 'Russian'}
            name="Russian"
            onPress={() => handleCheckboxPress('Russian')}
          />
          <LanguageItem
            checked={selectedLanguage === 'Indonesia'}
            name="Indonesia"
            onPress={() => handleCheckboxPress('Indonesia')}
          />
          <LanguageItem
            checked={selectedLanguage === 'Chinese'}
            name="Chinese"
            onPress={() => handleCheckboxPress('Chinese')}
          />
          <LanguageItem
            checked={selectedLanguage === 'Japanese'}
            name="Japanese"
            onPress={() => handleCheckboxPress('Japanese')}
          />
          {/* <LanguageItem
            checked={selectedLanguage === 'Marathi'}
            name="Marathi"
            onPress={() => handleCheckboxPress('Marathi')}
          />
          <LanguageItem
            checked={selectedLanguage === 'Yue Chinese (Cantonese)'}
            name="Yue Chinese (Cantonese)"
            onPress={() => handleCheckboxPress('Yue Chinese (Cantonese)')}
          />
          <LanguageItem
            checked={selectedLanguage === 'Southern Min (Hokkien)'}
            name="Southern Min (Hokkien)"
            onPress={() => handleCheckboxPress('Southern Min (Hokkien)')}
          />
          <LanguageItem
            checked={selectedLanguage === 'Persian (Farsi)'}
            name="Persian (Farsi)"
            onPress={() => handleCheckboxPress('Persian (Farsi)')}
          /> */}
          {/* <LanguageItem
            checked={selectedLanguage === 'Polish'}
            name="Polish"
            onPress={() => handleCheckboxPress('Polish')}
          /> */}
          {/* <LanguageItem
            checked={selectedLanguage === 'Kannada'}
            name="Kannada"
            onPress={() => handleCheckboxPress('Kannada')}
          /> */}
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