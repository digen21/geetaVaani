import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Ionicons } from "@expo/vector-icons";
import { useLanguage } from "../contexts";
import { createTextStyles } from "../utils";
import { CharacterDetailTranslations, infoTranslations } from "../configs";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const CARD_HEIGHT = 450;

const CharacterDetailScreen = ({ route }) => {
  const { currentLanguage } = useLanguage();
  const textStyles = createTextStyles(currentLanguage);
  const navigation = useNavigation();

  const character = route.params;

  const [gradientColors, setGradientColors] = useState(["#3B0B54", "#631E38"]); // Default dark gradient
  const fadeAnim = useSharedValue(0);

  useEffect(() => {
    fadeAnim.value = withTiming(1, { duration: 500 });
  }, [gradientColors]); // Trigger fade animation when gradientColors change

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
  }));

  const name = character?.name;
  const role = character?.role;
  const description = character?.description;
  const image = character?.image;
  const relations = character.relations;

  const renderPillTexts = () =>
    (role ? role.split(",") : [])
      .filter((tag) => tag.trim().length > 0)
      .map((tag, index) => {
        const bgColor = "#ffffff22"; // light background for tags
        const textColor = "#fff"; // dark text for light backgrounds

        return (
          <Text
            key={index}
            style={[
              styles.tag,
              textStyles.textThin,
              {
                backgroundColor: bgColor,
                color: textColor,
                fontSize: 12, // smaller font
                paddingHorizontal: 10, // smaller pill
                paddingVertical: 4, // smaller pill
                borderRadius: 14,
                minWidth: 70,
                textAlign: "center",
              },
            ]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {tag.trim()}
          </Text>
        );
      });

  return (
    <Animated.View style={[{ flex: 1 }, animatedStyle]}>
      <LinearGradient colors={gradientColors} style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
          {/* Header */}
          <View style={{ paddingHorizontal: 10 }}>
            <View style={styles.headerSection}>
              {/* Back Button */}
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
                style={styles.backButton}
                activeOpacity={0.7}
              >
                <Icon name="arrow-back" size={20} color={"#fff"} />
              </TouchableOpacity>
              {/* Title */}
              <Text
                style={[styles.headerText, textStyles.text]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {
                  CharacterDetailTranslations[currentLanguage]
                    ?.characterDescription
                }
              </Text>
            </View>
            {/* Image Card */}
            <View style={styles.cardWrapper}>
              <BlurView intensity={100} tint="dark" style={styles.blurCard}>
                <Image
                  source={{ uri: image }}
                  style={styles.image}
                  resizeMode="cover"
                />
                <View style={styles.overlay}>
                  <Text
                    style={[styles.name, styles.nameTag, textStyles.heading2]}
                  >
                    {name}
                  </Text>
                </View>
              </BlurView>
            </View>

            {/* pill text */}
            <View style={[styles.tags, styles.pillText]}>
              {renderPillTexts()}
            </View>

            {/* Info Section */}
            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>
                {infoTranslations[currentLanguage]}
              </Text>
              <Text style={styles.infoText}>{description}</Text>
            </View>

            {/* Action Buttons */}
            <View style={styles.actions}>
              <TouchableOpacity style={styles.iconBtn}>
                <Ionicons name="heart-outline" style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconBtn}>
                <Ionicons name="link" style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    marginBottom: 10,
    paddingHorizontal: 10,
    gap: 12,
    position: "relative",
  },
  backButton: {
    backgroundColor: "#ffffff22",
    borderWidth: 1,
    borderColor: "#ffffff44",
    borderRadius: 24,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 20,
    zIndex: 1,
  },
  headerText: {
    color: "#fff",
    backgroundColor: "#ffffff22",
    borderWidth: 1,
    borderColor: "#ffffff44",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 6,
    overflow: "hidden",
    fontSize: 16,
    fontWeight: "600",
    maxWidth: "70%",
    textAlign: "center",
  },
  back: {
    color: "#fff",
    marginTop: 50,
    paddingLeft: 20,
    fontSize: 16,
  },
  title: {
    color: "#fff",
    paddingTop: 50,
    paddingLeft: 30,
    fontSize: 24,
    fontWeight: "600",
  },
  cardWrapper: {
    alignItems: "center",
    marginTop: 10,
  },
  blurCard: {
    width: width - 60,
    height: CARD_HEIGHT,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "#ffffff44",
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "150%", // Adjusted height to ensure image covers the blur card properly
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 20,
  },
  name: {
    fontSize: 28,
    color: "#fff",
    textAlign: "center",
  },
  pillText: {
    flexWrap: "wrap",
    backgroundColor: "#ffffff22",
    padding: 10,
    borderRadius: 16,
    marginTop: 30,
    marginHorizontal: 20,
    gap: 8,
    borderWidth: 1,
    borderColor: "#ffffff44",
  },
  nameTag: {
    color: "#fff",
    backgroundColor: "#ffffff22",
    maxWidth: "60%",
    padding: 5,
    borderRadius: 24,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ffffff44",
  },
  tags: {
    flexDirection: "row",
    gap: 10,
  },
  tag: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    fontSize: 15,
    overflow: "hidden",
  },
  infoSection: {
    marginTop: 30,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#ffffff22",
    marginHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ffffff44",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  infoText: {
    color: "#ccc",
    fontSize: 16,
    lineHeight: 22,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 40,
    paddingHorizontal: 40,
  },
  iconBtn: {
    backgroundColor: "#ffffff22",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    height: 60,
    width: 60,
    borderWidth: 1,
    borderColor: "#ffffff44",
  },
  icon: {
    fontSize: 24,
    color: "#fff",
  },
});

export default CharacterDetailScreen;
