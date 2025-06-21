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
import { createTextStyles } from "../utils";
import { useLanguage } from "../contexts";

const { width } = Dimensions.get("window");
const CARD_HEIGHT = 450;

const CharacterDetailScreen = ({ route }) => {
  const { currentLanguage } = useLanguage();
  const textStyles = createTextStyles(currentLanguage);
  console.log(route.params);

  const { name } = route.params;

  const [gradientColors, setGradientColors] = useState(["#3B0B54", "#631E38"]); // Default dark gradient
  const fadeAnim = useSharedValue(0);

  const character = {
    name: "Arjuna",
    image:
      "https://res.cloudinary.com/dar7hn3v1/image/upload/v1749979707/GitaVaani-Verses/new-char/arjuna.png",
    relationship: "Krishna",
    role: "Pandava",
    info: "A skilled archer and key figure in the Kurukshetra War.",
  };

  useEffect(() => {
    fadeAnim.value = withTiming(1, { duration: 500 });
  }, [gradientColors]); // Trigger fade animation when gradientColors change

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
  }));

  return (
    <Animated.View style={[{ flex: 1 }, animatedStyle]}>
      <LinearGradient colors={gradientColors} style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
          {/* Header */}
          <Text style={styles.back}>← Back</Text>
          <Text style={styles.title}>Character Details</Text>

          {/* Image Card */}
          <View style={styles.cardWrapper}>
            <BlurView intensity={100} tint="dark" style={styles.blurCard}>
              <Image
                source={{ uri: character.image }}
                style={styles.image}
                resizeMode="cover"
              />

              <View style={styles.overlay}>
                <Text
                  style={[styles.name, { color: "#fff" }, textStyles.heading1]}
                >
                  {name}
                </Text>
                <View style={styles.tags}>
                  <Text style={styles.tag}>{character.relationship}</Text>
                  <Text style={styles.tag}>{character.role}</Text>
                </View>
              </View>
            </BlurView>
          </View>

          {/* Info Section */}
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Info</Text>
            <Text style={styles.infoText}>{character.info}</Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.iconBtn}>
              <Text style={styles.icon}>＋</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <Text style={styles.icon}>📤</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <Text style={styles.icon}>🔖</Text>
            </TouchableOpacity>
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
  back: {
    color: "#fff",
    marginTop: 50,
    paddingLeft: 20,
    fontSize: 16,
  },
  title: {
    color: "#fff",
    paddingLeft: 20,
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 10,
  },
  cardWrapper: {
    alignItems: "center",
    marginTop: 20,
  },
  blurCard: {
    width: width - 60,
    height: CARD_HEIGHT,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
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
    fontWeight: "700",
    marginBottom: 8,
  },
  tags: {
    flexDirection: "row",
    gap: 10,
  },
  tag: {
    backgroundColor: "#ffffff22",
    color: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    fontSize: 14,
  },
  infoSection: {
    marginTop: 30,
    paddingHorizontal: 20,
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
    padding: 16,
    borderRadius: 50,
  },
  icon: {
    fontSize: 24,
    color: "#fff",
  },
});

export default CharacterDetailScreen;
