import { convertDigits } from "@dmxdev/digit-converter-multilang";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LANGUAGE_FONTS } from "../configs/languages";
import { useFavorites } from "../contexts";
import { useReadVerses } from "../hooks";
import { createTextStyles } from "../utils";
import AnimatedFavoriteIcon from "./AnimatedFavoriteIcon";

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
  const { isRead, markAsRead, markUnread, readVerses } = useReadVerses();
  const textStyles = createTextStyles(currentLanguage);
  const verseId = `verse_${verse.chapter}_${verse.verse}`;

  // Determine if verse is read based on the reactive readVerses state
  const isVerseRead = isRead(verse.chapter, verse.verse);

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

  const handleReadToggle = (e) => {
    if (e && typeof e.stopPropagation === "function") {
      e.stopPropagation();
    }
    if (isVerseRead) {
      markUnread(verse.chapter, verse.verse);
    } else {
      markAsRead(verse.chapter, verse.verse);
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
          <View style={styles.readIconContainer}>
            {!isVerseRead ? (
              <Icon
                name="sticker-check-outline"
                style={{ color: "#22c55e" }}
                size={20}
                onPress={handleReadToggle}
              />
            ) : (
              <Icon
                name="sticker-check"
                style={{ color: "#22c55e" }} // green-500
                size={20}
                onPress={handleReadToggle}
              />
            )}
          </View>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 8,
  },
  readIconContainer: {},
});

export default VerseCard;
