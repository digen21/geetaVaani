const getLocalizedChapter = (item, currentLanguage) => {
  if (item.type === "chapter") {
    switch (currentLanguage) {
      case "hi":
        return `अध्याय ${item.number}`;
      case "gu":
        return `અધ્યાય ${item.number}`;
      case "sa":
        return `अध्यायः ${item.number}`;
      default:
        return `Chapter ${item.number}`;
    }
  } else {
    switch (currentLanguage) {
      case "hi":
        return `श्लोक ${item.chapter}.${item.number}`;
      case "gu":
        return `શ્લોક ${item.chapter}.${item.number}`;
      case "sa":
        return `श्लोकः ${item.chapter}.${item.number}`;
      default:
        return `Verse ${item.chapter}.${item.number}`;
    }
  }
};

export default getLocalizedChapter;
