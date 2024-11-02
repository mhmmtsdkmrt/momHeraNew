import { useContext } from "react"
import { TranslationsContext } from "./LanguageContext"
import Translations from "./Translations"



export const useTranslation = () => {

    const { language, setLanguage } = useContext(TranslationsContext);

    return {t: Translations[language], changeLanguage: (lang) => setLanguage (lang)};

};