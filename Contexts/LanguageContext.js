import AsyncStorage from "@react-native-async-storage/async-storage";
import react, {createContext, useEffect, useState} from "react";

export const TranslationsContext = createContext();

const TranslationProvider = ({ children }) => {

    const [language, setLanguage] = useState('tr');

        // Dil seçimlerini AsyncStorage’a kaydetme
        const storeLanguage = async (lang) => {
            try {
                await AsyncStorage.setItem('selectedLanguage', lang);
            } catch (error) {
                console.error('Dil seçimi kaydedilemedi:', error);
            }
        };
    
        // Dil değerini AsyncStorage’dan yükleme
        useEffect(() => {
            const loadLanguage = async () => {
                try {
                    const savedLanguage = await AsyncStorage.getItem('selectedLanguage');
                    if (savedLanguage) {
                        setLanguage(savedLanguage);
                    }
                } catch (error) {
                    console.error('Dil seçimi yüklenemedi:', error);
                }
            };
            loadLanguage();
        }, []);
    
        // Dil değeri değiştiğinde AsyncStorage’a kaydet
        const handleChangeLanguage = (lang) => {
            setLanguage(lang);
            storeLanguage(lang);
        };



    return (
        <TranslationsContext.Provider value={{ language, setLanguage }}>
            {children}
        </TranslationsContext.Provider>
    );
}

export default TranslationProvider

