import { StyleSheet } from "react-native";
import { LANGUAGE_FONTS } from "../configs";

const createTextStyles = (language) => {
  const fonts = LANGUAGE_FONTS[language] || LANGUAGE_FONTS.en;

  return StyleSheet.create({
    text: {
      fontFamily: fonts.regular,
    },
    textThin: {
      fontFamily: fonts.regular,
      fontSize: 14
    },
    textMedium: {
      fontFamily: fonts.medium,
    },
    textBold: {
      fontFamily: fonts.bold,
    },
    heading1: {
      fontFamily: fonts.bold,
      fontWeight: 600,
      fontSize: 24,
    },
    heading2: {
      fontFamily: fonts.medium,
      fontSize: 20,
    },
    heading3: {
      fontFamily: fonts.medium,
      fontSize: 18,
    },
    body: {
      fontFamily: fonts.regular,
      fontSize: 16,
    },
    caption: {
      fontFamily: fonts.regular,
      fontSize: 14,
    },
  });
};

export default createTextStyles;
