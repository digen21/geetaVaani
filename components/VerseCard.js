import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { LANGUAGE_FONTS } from "../configs/languages";
import { useFavorites } from "../contexts";

const VerseCard = ({ verse, onPress, colors }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const HEART_COLOR = "#FF3B30";
  const verseId = `verse_${verse.chapter}_${verse.verse}`;

  const handleFavoritePress = (e) => {
    e.stopPropagation();
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
        { backgroundColor: colors.cardBg, opacity: pressed ? 0.95 : 1 },
      ]}
    >
      <View style={styles.row}>
        <View style={styles.textContainer}>
          <Text
            style={{
              color: colors.text,
              fontFamily: LANGUAGE_FONTS.sk.regular,
              fontSize: 16,
            }}
            lineBreakMode="tail"
            numberOfLines={2}
          >
            {verse.sk}
          </Text>
        </View>
        <View style={styles.iconContainer}>
          <Pressable
            onPress={handleFavoritePress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <MaterialIcons
              name={isFavorite(verseId) ? "favorite" : "favorite-border"}
              size={28}
              color={HEART_COLOR}
            />
          </Pressable>
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
    alignItems: "center",
    height: "100%",
  },
  textContainer: {
    flex: 2, // 2/3 of the row
    paddingRight: 12, // add some spacing to the right
    justifyContent: "center",
  },
  iconContainer: {
    flex: 1, // 1/3 of the row
    alignItems: "flex-end",
    justifyContent: "center",
  },
});

export default VerseCard;
