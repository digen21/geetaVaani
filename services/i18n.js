import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

const locales = Localization.getLocales();
console.log("🚀 ~ locales:", locales);

// Get device language using Expo's localization
// const systemLanguage = locales.split("-")[0] || "en";
const systemLanguage = Localization.locale.split("-")[0] || "en";

i18n.use(initReactI18next).init({
  lng: systemLanguage,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  resources: {
    en: { translation: {} },
    hi: { translation: {} },
    mr: { translation: {} },
    gu: { translation: {} },
  },
});

/**
 * Updates the current language of the i18n instance.
 *
 * This function changes the language dynamically based on the provided language code.
 * It allows switching between different translations in the React Native app.
 *
 * @param {string} lang - The language code (e.g., 'en', 'hi', 'mr', 'gu').
 */
export const updateI18nLanguage = (lang) => {
  i18n.changeLanguage(lang);
};

export default i18n;
