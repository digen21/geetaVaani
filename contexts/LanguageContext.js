import React, { createContext, useContext, useState, useEffect } from "react";
import { getStoredLanguage, updateI18nLanguage } from "../services/i18n";
const LanguageContext = createContext();

/**
 * LanguageProvider component that manages the app's language state.
 *
 * This provider maintains the currently selected language and provides
 * a method to change the language dynamically. It integrates with the
 * i18n instance to update the language globally.
 *
 * @param {{ children: React.ReactNode }} props - The child components wrapped by the provider.
 * @returns {JSX.Element} The LanguageContext provider component.
 */
export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState("en");

  useEffect(() => {
    // Initialize the language state with the stored language
    const initializeStoredLanguage = async () => {
      const storedLanguage = await getStoredLanguage();
      setCurrentLanguage(storedLanguage);
    };

    initializeStoredLanguage();
  }, []);

  /**
   * Changes the app language and updates the i18n instance.
   *
   * @param {string} lang - The new language code (e.g., 'en', 'hi', 'mr', 'gu').
   */
  const changeLanguage = async (lang) => {
    setCurrentLanguage(lang);
    await updateI18nLanguage(lang); // Make sure to await the update
    // Add API call here to fetch translations if needed
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

/**
 * Custom hook to access the language context.
 *
 * This hook allows consuming components to access and modify the current language.
 *
 * @returns {{ currentLanguage: string, changeLanguage: (lang: string) => void }}
 * An object containing the current language and a function to change it.
 */
export const useLanguage = () => useContext(LanguageContext);
