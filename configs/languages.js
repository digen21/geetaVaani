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

export const tabTranslations = {
  en: {
    details: "Details",
    verses: "Verses",
  },
  hi: {
    details: "विवरण",
    verses: "श्लोक",
  },
  gu: {
    details: "વિગતો",
    verses: "શ્લોક",
  },
  mr: {
    details: "तपशील",
    verses: "श्लोक",
  },
  sa: {
    details: "विवरणम्",
    verses: "श्लोकाः",
  },
};

export const detailsScreenTranslations = {
  en: {
    mainTeachings: "Main Teachings",
    practicalTips: "Practical Tips",
    whatWeCanLearn: "What We Can Learn",
  },
  hi: {
    mainTeachings: "मुख्य शिक्षाएं",
    practicalTips: "व्यावहारिक सुझाव",
    whatWeCanLearn: "हम क्या सीख सकते हैं",
  },
  gu: {
    mainTeachings: "મુખ્ય શિક્ષાઓ",
    practicalTips: "વ્યવહારિક સૂચનો",
    whatWeCanLearn: "આપણે શું શીખી શકીએ",
  },
  mr: {
    mainTeachings: "मुख्य शिकवण",
    practicalTips: "व्यावहारिक टिप्स",
    whatWeCanLearn: "आपण काय शिकू शकतो",
  },
};
