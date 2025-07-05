import { Pressable, StyleSheet, Text, View } from "react-native";
import { LANGUAGE_FONTS } from "../configs/languages";
import { useFavorites } from "../contexts";
import AnimatedFavoriteIcon from "./AnimatedFavoriteIcon";
import { convertDigits } from "@dmxdev/digit-converter-multilang";
import { createTextStyles } from "../utils";

/**
 * VerseCard component displays a verse with its text and a favorite icon.
 * Allows users to mark/unmark the verse as a favorite.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.verse - The verse object containing verse details.
 * @param {function} props.onPress - Callback function when the card is pressed.
 * @param {Object} props.colors - Colors object for theming the text.
 *
 * @returns {JSX.Element} The rendered VerseCard component.
 */
const VerseCard = ({ verse, onPress, colors, number, currentLanguage }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const textStyles = createTextStyles(currentLanguage);
  const verseId = `verse_${verse.chapter}_${verse.verse}`;

  const handleFavoritePress = (e) => {
    if (e && typeof e.stopPropagation === "function") {
      e.stopPropagation();
    }
    if (isFavorite(verseId)) {
      removeFavorite(verseId);
    } else {
      addFavorite({
        id: verseId,
        type: "verse",
        chapter: verse.chapter,
        number: verse.verse,
        sk: verse.sk,
        title: verse.sk,
        ...verse,
      });
    }
  };

  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: "#00000005", borderless: false }}
      style={({ pressed }) => [
        styles.card,
        { opacity: pressed ? 0.95 : 1, backgroundColor: colors.cardBg },
      ]}
    >
      <View style={styles.row}>
        <View style={styles.textContainer}>
          <View style={styles.numberCircle}>
            <Text
              style={[
                styles.numberText,
                {
                  color: colors.primary,
                  fontFamily: LANGUAGE_FONTS[currentLanguage].regular,
                },
              ]}
            >
              {convertDigits(number, currentLanguage)}
            </Text>
          </View>
          <Text
            style={[
              {
                color: colors.text,
                fontFamily: LANGUAGE_FONTS.sk.regular,
                fontSize: 16,
                marginLeft: 10,
              },
            ]}
            lineBreakMode="tail"
            numberOfLines={2}
          >
            {verse.sk}
          </Text>
        </View>
        <View style={styles.iconContainer}>
          <AnimatedFavoriteIcon
            isFav={isFavorite(verseId)}
            onToggle={handleFavoritePress}
          />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 100,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 8,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    flex: 3,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 12,
  },
  numberCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: {
    fontWeight: "bold",
    fontSize: 15,
  },
  iconContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
});

export default VerseCard;
