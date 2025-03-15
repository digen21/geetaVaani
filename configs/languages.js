export default [
  { code: "en", name: "English", native: "English" },
  { code: "hi", name: "Hindi", native: "हिन्दी" },
  { code: "mr", name: "Marathi", native: "मराठी" },
  { code: "gu", name: "Gujarati", native: "ગુજરાતી" },
];

export const LANGUAGE_FONTS = {
  en: {
    regular: "Poppins-Regular",
    medium: "Poppins-Medium",
    bold: "Poppins-Bold",
    semiBold: "Poppins-SemiBold",
  },
  hi: {
    regular: "Mukta-Regular",
    medium: "Mukta-Medium",
    bold: "Mukta-Bold",
    semiBold: "Mukta-SemiBold",
  },
  mr: {
    regular: "Mukta-Regular",
    medium: "Mukta-Medium",
    bold: "Mukta-Bold",
    semiBold: "Mukta-SemiBold",
  },
  gu: {
    regular: "Gujarati-Regular",
    medium: "Gujarati-Medium",
    bold: "Gujarati-Bold",
    semiBold: "Gujarati-SemiBold",
  },
  sn: {
    regular: "Mukta-Regular",
    medium: "Mukta-Medium",
    bold: "Mukta-Bold",
    semiBold: "Mukta-SemiBold",
  },
};

export const getLanguageFont = (languageCode, weight = "regular") => {
  return LANGUAGE_FONTS[languageCode]?.[weight] || LANGUAGE_FONTS.en[weight];
};
