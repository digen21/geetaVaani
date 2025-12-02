import AsyncStorage from "@react-native-async-storage/async-storage"; // <-- Add this
import * as Font from "expo-font";
import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Get device language using Expo's localization
// const systemLanguage = locales.split("-")[0] || "en";
// Get device language using Expo's localization
const LANGUAGE_KEY = "selectedLanguage";

const getSystemLanguage = () => {
  if (typeof Localization.locale === "string") {
    return Localization.locale.split?.("-")[0] || Localization.locale || "en";
  }
  return "en";
};

// Load fonts based on languages
const loadFonts = async () => {
  await Font.loadAsync({
    // English fonts
    "Poppins-Regular": require("../assets/fonts/en/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../assets/fonts/en/Poppins-Medium.ttf"),
    "Poppins-Bold": require("../assets/fonts/en/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/en/Poppins-Bold.ttf"),

    "WorkSans-Regular": require("../assets/fonts/en/WorkSans-Regular.ttf"),
    "WorkSans-Medium": require("../assets/fonts/en/WorkSans-Medium.ttf"),
    "WorkSans-Bold": require("../assets/fonts/en/WorkSans-Bold.ttf"),
    "WorkSans-SemiBold": require("../assets/fonts/en/WorkSans-Bold.ttf"),

    // Hindi fonts
    "Mukta-Regular": require("../assets/fonts/hi/Mukta-Regular.ttf"),
    "Mukta-Medium": require("../assets/fonts/hi/Mukta-Regular.ttf"),
    "Mukta-Bold": require("../assets/fonts/hi/Mukta-Regular.ttf"),
    "Mukta-SemiBold": require("../assets/fonts/hi/Mukta-Regular.ttf"),

    // Gujarati fonts
    "Gujarati-Regular": require("../assets/fonts/gu/BalooBhai2-Regular.ttf"),
    "Gujarati-Medium": require("../assets/fonts/gu/BalooBhai2-Medium.ttf"),
    "Gujarati-Bold": require("../assets/fonts/gu/BalooBhai2-Bold.ttf"),
    "Gujarati-SemiBold": require("../assets/fonts/gu/BalooBhai2-SemiBold.ttf"),
  });
};

// i18n.use(initReactI18next).init({
//   lng: systemLanguage,
//   fallbackLng: "en",
//   interpolation: { escapeValue: false },
// resources: {
//   en: { translation: {} },
//   hi: { translation: {} },
//   mr: { translation: {} },
//   gu: { translation: {} },
// },
// });

// Read language from AsyncStorage (returns promise)
export const getStoredLanguage = async () => {
  const lang = await AsyncStorage.getItem(LANGUAGE_KEY);
  return lang || getSystemLanguage();
};

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
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
export const updateI18nLanguage = async (lang) => {
  try {
    await loadFonts(); // Load fonts when language changes
    await AsyncStorage.setItem(LANGUAGE_KEY, lang);
    i18n.changeLanguage(lang);
  } catch (error) {
    console.error("Error loading fonts:", error);
  }
};

export const initializeLanguage = async () => {
  const lang = await getStoredLanguage();
  await loadFonts();
  i18n.changeLanguage(lang);
};

export default i18n;
