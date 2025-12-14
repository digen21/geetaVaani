export default [
  { code: "en", name: "English", native: "English" },
  { code: "hi", name: "Hindi", native: "हिन्दी" },
  { code: "mr", name: "Marathi", native: "मराठी" },
  { code: "gu", name: "Gujarati", native: "ગુજરાતી" },
];

export const LANGUAGE_FONTS = {
  en: {
    regular: "WorkSans-Regular",
    medium: "WorkSans-Medium",
    bold: "WorkSans-Bold",
    semiBold: "WorkSans-SemiBold",
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
  sk: {
    regular: "Mukta-Regular",
    medium: "Mukta-Medium",
    bold: "Mukta-Bold",
    semiBold: "Mukta-SemiBold",
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
    characterDescription: "Character Description",
  },
  hi: {
    characterRole: "चरित्र भूमिका",
    characterDescription: "चरित्र विवरण",
  },
  mr: {
    characterRole: "पात्र भूमिका",
    characterDescription: "पात्र वर्णन",
  },
  gu: {
    characterRole: "પાત્ર ભૂમિકા",
    characterDescription: "પાત્ર વર્ણન",
  },
  sa: {
    characterRole: "पात्रभूमिका",
    characterDescription: "पात्रवर्णनम्",
  },
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
  },
};

export const verseTranslations = {
  en: "Verses",
  hi: "श्लोक",
  mr: "श्लोक",
  gu: "શ્લોક",
};

export const favoriteScreenTranslations = {
  en: {
    favorites: "Favorites",
    favoritesDescription:
      "Your favorite chapters and verses from Bhagavad Gita",
    noFavorites: "No favorites yet",
    addFavoritesHint:
      "Add chapters or verses to your favorites\nby tapping the heart icon",
    chapters: "Chapters",
    verses: "Verses",
  },
  hi: {
    favorites: "पसंदीदा",
    favoritesDescription: "भगवद गीता के आपके पसंदीदा अध्याय और श्लोक",
    noFavorites: "अभी तक कोई पसंदीदा नहीं",
    addFavoritesHint:
      "हार्ट आइकन पर टैप करके\nअध्याय या श्लोक को पसंदीदा में जोड़ें",
    chapters: "अध्याय",
    verses: "श्लोक",
  },
  mr: {
    favorites: "आवडते",
    favoritesDescription: "भगवद गीतेतील तुमचे आवडते अध्याय आणि श्लोक",
    noFavorites: "अजून कोणतेही आवडते नाहीत",
    addFavoritesHint:
      "हृदय चिन्हावर टॅप करून\nअध्याय किंवा श्लोक आवडत्यांमध्ये जोडा",
    chapters: "अध्याय",
    verses: "श्लोक",
  },
  gu: {
    favorites: "પસંદીદા",
    favoritesDescription: "ભગવદ ગીતા ના તમારા પસંદીદા અધ્યાયો અને શ્લોકો",
    noFavorites: "હજુ સુધી કોઈ પસંદીદા નથી",
    addFavoritesHint:
      "હૃદય ચિહ્ન પર ટૅપ કરીને\nઅધ્યાય અથવા શ્લોકને પસંદીદામાં ઉમેરો",
    chapters: "અધ્યાય",
    verses: "શ્લોક",
  },
  sk: {
    favorites: "प्रियाः",
    favoritesDescription: "भगवद्गीतायाः प्रियाः अध्यायाः श्लोकाः च",
    noFavorites: "अद्यापि कोऽपि प्रियतमा नास्ति",
    addFavoritesHint:
      "हृदयचिह्नं स्पृशित्वा\nअध्यायं वा श्लोकं प्रियेषु योजयतु",
    chapters: "अध्यायः",
    verses: "श्लोकः",
  },
};

export const deleteAllTranslations = {
  en: "Delete All",
  hi: "सभी हटाएँ",
  gu: "બધું કાઢી નાખો",
  mr: "सर्वकाही हटवा",
  sk: "Všetko vymažte",
};

export const chapterVersesTranslations = {
  chapter: {
    en: "Chapter",
    hi: "अध्याय",
    sk: "अध्यायः",
    mr: "अध्याय",
    gu: "અધ્યાય",
  },
  verse: {
    en: "Verse",
    hi: "श्लोक",
    sk: "श्लोकः",
    mr: "श्लोक",
    gu: "શ્લોક",
  },
};

export const digitMaps = {
  hi: ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"], // Hindi/Devanagari
  gu: ["૦", "૧", "૨", "૩", "૪", "૫", "૬", "૭", "૮", "૯"], // Gujarati
  mr: ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"], // Marathi
  sa: ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"], // Sanskrit (Devanagari)
  en: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], // English
};

export const containTranslations = (languageCode, count) => {
  switch (languageCode) {
    case "en":
      return `Contains ${count} sacred verses`;
    case "hi":
      return `${count} श्लोकों का समावेश है`;
    case "gu":
      return `${count} પવિત્ર શ્લોકોનો સમાવેશ થાય છે`;
    case "mr":
      return `${count} पवित्र श्लोकांचा समावेश आहे`;
    case "sk":
      return `${count} पवित्र श्लोकान् समाविशति`;
    default:
      return `Contains ${count} sacred verses`;
  }
};

export const translations = {
  en: "Translations",
  hi: "अनुवाद",
  gu: "અનુવાદ",
  mr: "अनुवाद",
  sk: "अनुवादः",
};

export const SanskritTranslations = {
  en: "Sanskrit",
  hi: "संस्कृत",
  gu: "સંસ્કૃત",
  mr: "संस्कृत",
  sk: "संस्कृतम्",
};

export const commentaryTranslations = {
  en: "Commentary",
  hi: "टिप्पणी",
  gu: "ટિપ્પણી",
  mr: "टिप्पणी",
  sk: "टिप्पणीः",
};

export const CharacterDetailTranslations = {
  en: {
    characterRole: "Character Role",
    characterDescription: "Character Description",
    character: "Characters",
  },
  hi: {
    characterRole: "चरित्र भूमिका",
    characterDescription: "चरित्र विवरण",
    character: "चरित्र",
  },
  gu: {
    characterRole: "પાત્ર ભૂમિકા",
    characterDescription: "પાત્ર વર્ણન",
    character: "પાત્ર",
  },
  mr: {
    characterRole: "पात्र भूमिका",
    characterDescription: "पात्र वर्णन",
    character: "पात्र",
  },
  sk: {
    characterRole: "पात्रभूमिका",
    characterDescription: "पात्रवर्णनम्",
    character: "पात्रम्",
  },
};

export const infoTranslations = {
  en: "Info",
  hi: "जानकारी",
  gu: "માહિતી",
  mr: "माहिती",
  sk: "सूचना",
};

export const profileTranslations = {
  en: {
    profile: "Profile",
    settings: "Settings",
    about: "About",
    help: "Help",
    feedback: "Feedback",
    logout: "Logout",
    account: "My Account",
    notification: "Notifications",
    aboutApp: "About App",
  },
  hi: {
    profile: "प्रोफ़ाइल",
    settings: "सेटिंग्स",
    about: "के बारे में",
    help: "मदद",
    feedback: "प्रतिक्रिया",
    logout: "लॉग आउट",
    account: "मेरा खाता",
    notification: "सूचनाएँ",
    aboutApp: "ऐप के बारे में",
  },
  gu: {
    profile: "પ્રોફાઇલ",
    settings: "સેટિંગ્સ",
    about: "વિશે",
    help: "મદદ",
    feedback: "પ્રતિસાદ",
    logout: "લોગ આઉટ",
    account: "મારું ખાતું",
    notification: "નોટિફિકેશન્સ",
    aboutApp: "એપ વિશે",
  },
  mr: {
    profile: "प्रोफाइल",
    settings: "सेटिंग्ज",
    about: "विषयी",
    help: "मदत",
    feedback: "प्रतिक्रिया",
    logout: "लॉग आउट",
    account: "माझे खाते",
    notification: "सूचनाएँ",
    aboutApp: "अ‍ॅपबद्दल",
  },
  sk: {
    profile: "प्रोफाइलः",
    settings: "संयोजनानि",
    about: "विवरणम्",
    help: "सहाय्यम्",
    feedback: "प्रतिक्रिया",
    logout: "निर्गमनम्",
    account: "मम खाता",
    notification: "सूचनाः",
    aboutApp: "ऐप विषये",
  },
};

export const verseReminderTranslations = {
  en: {
    verseReminder: "Verse Reminders",
    morningReminder: "Morning Reminder",
    eveningReminder: "Evening Reminder",
    instruction:
      "Set up reminders to receive notifications for reading Bhagavad Gita verses at your preferred times.",
  },
  hi: {
    verseReminder: "श्लोक अनुस्मारक",
    morningReminder: "सुबह का अनुस्मारक",
    eveningReminder: "शाम का अनुस्मारक",
    instruction:
      "भगवद गीता के श्लोक पढ़ने के लिए अपने पसंदीदा समय पर सूचनाएं प्राप्त करने के लिए अनुस्मारक सेट करें।",
  },
  gu: {
    verseReminder: "શ્લોક સ્મરણ",
    morningReminder: "સવારનું સ્મરણ",
    eveningReminder: "સાંજનું સ્મરણ",
    instruction:
      "તમારા પસંદના સમયે ભગવદ ગીતાના શ્લોકો વાંચવા માટે નોટિફિકેશન મેળવવા રીમાઇન્ડર સેટ કરો.",
  },
  mr: {
    verseReminder: "श्लोक स्मरणसूचना",
    morningReminder: "सकाळचे स्मरणसूचना",
    eveningReminder: "संध्याकाळचे स्मरणसूचना",
    instruction:
      "तुमच्या आवडत्या वेळी भगवद गीता श्लोक वाचण्यासाठी सूचना मिळविण्यासाठी रिमाइंडर सेट करा.",
  },
  sk: {
    verseReminder: "श्लोक-स्मरणसूचना",
    morningReminder: "प्रातः-स्मरणम्",
    eveningReminder: "सायं-स्मरणम्",
    instruction:
      "भगवद्गीतायाः श्लोकान् पठितुं निर्दिष्टसमये सूचनाः प्राप्तुं लेखकाः सेट् कुर्वन्तु।",
  },
};
