import { getLanguageFont } from "../configs";
import { useLanguage } from "../contexts";

const useLanguageFont = (weight = "regular") => {
  const { currentLanguage } = useLanguage();
  return getLanguageFont(currentLanguage, weight);
};

export default useLanguageFont;
