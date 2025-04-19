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

export const characterScreenTranslations = {
  en: {
    characterRole: "Character Role",
    characterDescription: "Character Description"
  },
  hi: {
    characterRole: "चरित्र भूमिका",
    characterDescription: "चरित्र विवरण"
  },
  mr: {
    characterRole: "पात्र भूमिका",
    characterDescription: "पात्र वर्णन"
  },
  gu: {
    characterRole: "પાત્ર ભૂમિકા",
    characterDescription: "પાત્ર વર્ણન"
  },
  sa: {
    characterRole: "पात्रभूमिका",
    characterDescription: "पात्रवर्णनम्"
  }
};


export const relationsTranslations = {
  en: {
    son_of: "Son of",
    father_of: "Father of",
    brother_of: "Brother of",
    teacher_of: "Teacher of",
    wife_of: "Wife of",
    daughter_of: "Daughter of",
    husband_of: "Husband of",
    friend_of: "Friend of",
    victor_in: "Victor in",
    conqueror_of: "Conqueror of",
    disciple_of: "Disciple of",
    sister_of: "Sister of",
    mother_of: "Mother of",
    uncle_of: "Uncle of",
    enemy_of: "Enemy of",
    adversary_of: "Adversary of",
    companion_of: "Companion of",
    opponent_of: "Opponent of",
    participant_in: "Participant in",
    son_of_teacher: "Son of Teacher",
    avenger_of: "Avenger of",
    killed_son_of: "Killed Son of",
    survived_war: "Survived War",
    maternal_uncle_of: "Maternal Uncle of",
    advisor_of: "Advisor of",
    mastermind_of: "Mastermind of",
    instigator_of: "Instigator of",
    manipulator_of: "Manipulator of",
    bringer_of_war: "Bringer of War",
    counselor_of: "Counselor of",
    wife_of_krishna: "Wife of Krishna",
    victim_of: "Victim of",
    symbol_of_dignity: "Symbol of Dignity",
    symbol_of: "Symbol of",
  },
  hi: {
    son_of: "पुत्र का",
    brother_of: "भाई का",
    teacher_of: "शिक्षक का",
    wife_of: "पत्नी का",
    daughter_of: "बेटी का",
    sister_of: "बहन का",
    mother_of: "माँ का",
    uncle_of: "चाचा का",
    enemy_of: "शत्रु का",
    adversary_of: "विरोधी का",
    companion_of: "साथी का",
    opponent_of: "विरोधी का",
    participant_in: "में भागीदार",
    son_of_teacher: "शिक्षक का पुत्र",
    avenger_of: "बदला लेने वाला",
    killed_son_of: "हत्या किए गए पुत्र का",
    survived_war: "युद्ध से जीवित बचा",
    maternal_uncle_of: "माँ के चाचा का",
    advisor_of: "सलाहकार का",
    mastermind_of: "साजिश रचने वाला",
    instigator_of: "उत्प्रेरक का",
    manipulator_of: "संचालक का",
    bringer_of_war: "युद्ध लाने वाला",
    counselor_of: "सलाहकार का",
    wife_of_krishna: "कृष्ण की पत्नी",
    victim_of: "पीड़ित का",
    symbol_of_dignity: "गौरव का प्रतीक",
  },
  gu: {
    son_of: "પુત્રનો",
    brother_of: "ભાઈનો",
    teacher_of: "શિક્ષકનો",
    wife_of: "પત્નીનો",
    daughter_of: "કન્યાનો",
    sister_of: " બહેનનો",
    mother_of: "માતાનો",
    uncle_of: "કાકાનો",
    enemy_of: "દુશ્મનનો",
    adversary_of: "વિરોધીનો",
    companion_of: "સાથે",
    opponent_of: "વિરોધીનો",
    participant_in: "ભાગીદારો",
    son_of_teacher: "શિક્ષકનો પુત્ર",
    avenger_of: "બદલાર્થી",
    killed_son_of: "હત્યારાખો આવેલા પુત્રનો",
    survived_war: "યુદ્ધથી બચી ગયા",
    maternal_uncle_of: "માતાના કાકાનો",
    advisor_of: "સલાહકાર",
    mastermind_of: "સાજિશનો માઇન્ડ",
    instigator_of: "ઉશ્કેરનાર",
    manipulator_of: "હિંમતનાર",
    bringer_of_war: "યુદ્ધ લાવનાર",
    counselor_of: "સલાહકાર",
    wife_of_krishna: "કૃષ્ણની પતિ",
    victim_of: "પીડિત",
    symbol_of_dignity: "મહાનતા માટે ચિહ્ન",
  },
  mr: {
    son_of: "पुत्राचा",
    brother_of: "भाऊचा",
    teacher_of: "शिक्षकाचा",
    wife_of: "पत्नीचा",
    daughter_of: "मुलीचा",
    sister_of: "बहिणीचा",
    mother_of: "आईचा",
    uncle_of: "काकाचा",
    enemy_of: "शत्रूचा",
    adversary_of: "विरोधकाचा",
    companion_of: "साथी",
    opponent_of: "विरोधक",
    participant_in: "भागीदार",
    son_of_teacher: "शिक्षकाचा मुलगा",
    avenger_of: "प्रतिशोध घेणारा",
    killed_son_of: "हत्या केलेल्या मुलाचा",
    survived_war: "युद्धातून बचावलेला",
    maternal_uncle_of: "आईच्या काकाचा",
    advisor_of: "सल्लागाराचा",
    mastermind_of: "साजिश करणारा",
    instigator_of: "उत्प्रेरक",
    manipulator_of: "मनोविकार करणारा",
    bringer_of_war: "युद्ध आणणारा",
    counselor_of: "सलाहकार",
    wife_of_krishna: "कृष्णाची पत्नी",
    victim_of: "पीडित",
    symbol_of_dignity: "गौरवाचा प्रतीक",
  },
  sk: {
    son_of: "पुत्रः",
    brother_of: "भ्रातुः",
    teacher_of: "गुरुणः",
    wife_of: "पत्नीः",
    daughter_of: "कन्येः",
    sister_of: "भगिन्याः",
    mother_of: "मातरः",
    uncle_of: "काकाः",
    enemy_of: "शत्रुः",
    adversary_of: "विरोधकः",
    companion_of: "सहचारीः",
    opponent_of: "विरोधकः",
    participant_in: "भागीदारः",
    son_of_teacher: "गुरुणः पुत्रः",
    avenger_of: "प्रतिशोधी",
    killed_son_of: "हत्यायाः पुत्रस्य",
    survived_war: "युद्धे जीवितं हत्वा",
    maternal_uncle_of: "मातरः काकः",
    advisor_of: "सल्लाहकारः",
    mastermind_of: "साजिशकारः",
    instigator_of: "प्रेरकः",
    manipulator_of: "चालकः",
    bringer_of_war: "युद्धस्य प्रेरकः",
    counselor_of: "सलाहकारः",
    wife_of_krishna: "कृष्णस्य पत्नी",
    victim_of: "पीडितः",
    symbol_of_dignity: "मान्यतायाः प्रतीकः",
  }
};
