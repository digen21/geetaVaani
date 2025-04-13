import React, { createContext, useContext, useEffect } from "react";
import { LANGUAGE_FONTS } from "../configs";
import { useLanguage } from "./LanguageContext";

const GlobalStyleContext = createContext();

export const GlobalStyleProvider = ({ children }) => {
  const { currentLanguage } = useLanguage();
  const currentFonts = LANGUAGE_FONTS[currentLanguage] || LANGUAGE_FONTS.en;

  useEffect(() => {
    // Update default text styles when language changes
    const textElements = ["Text", "TextInput"];
    textElements.forEach((element) => {
      if (element in global) {
        global[element].defaultProps = {
          ...global[element].defaultProps,
          style: {
            fontFamily: currentFonts.regular,
          },
        };
      }
    });
  }, [currentLanguage]);

  return (
    <GlobalStyleContext.Provider value={{ currentFonts }}>
      {children}
    </GlobalStyleContext.Provider>
  );
};

export const useGlobalStyle = () => useContext(GlobalStyleContext);
