import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PushNotificationButton, TopBar } from "../components";
import { profileTranslations, verseReminderTranslations } from "../configs";
import { useLanguage, useTheme } from "../contexts";
import chaptersData from "../data/sample-chapters.json";
import versesData from "../data/verses.json";
import { useReadVerses } from "../hooks";
import { createTextStyles } from "../utils";

const NotificationsScreen = () => {
  const { currentLanguage } = useLanguage();
  const textStyles = createTextStyles(currentLanguage);
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { getMostRecentRead } = useReadVerses();

  // State for morning reminder
  const [morningReminderTime, setMorningReminderTime] = useState(
    new Date(2000, 0, 1, 7, 0) // Default: 7:00 AM
  );
  const notificationTranslationText =
    profileTranslations[currentLanguage].notification;

  const verseReminderTranslationsText =
    verseReminderTranslations[currentLanguage].verseReminder;

  const morningReminderTranslationsText =
    verseReminderTranslations[currentLanguage].morningReminder;

  const eveningReminderTranslationsText =
    verseReminderTranslations[currentLanguage].eveningReminder;

  const [isMorningReminderEnabled, setIsMorningReminderEnabled] =
    useState(false);
  const [showMorningPicker, setShowMorningPicker] = useState(false);

  const [recentChapterAndVerse, setRecentChapterAndVerse] = useState(null);

  // State for evening reminder
  const [eveningReminderTime, setEveningReminderTime] = useState(
    new Date(2000, 0, 1, 19, 0) // Default: 7:00 PM
  );
  const [isEveningReminderEnabled, setIsEveningReminderEnabled] =
    useState(false);
  const [showEveningPicker, setShowEveningPicker] = useState(false);

  // Track if settings have been loaded from storage
  const [settingsLoaded, setSettingsLoaded] = useState(false);

  // Load saved settings from storage when component mounts
  useEffect(() => {
    loadSavedSettings();
  }, []);

  // Save all reminder settings to storage whenever any of them change
  useEffect(() => {
    if (settingsLoaded) {
      // Only save after initial load is complete
      saveAllSettings();
    }
  }, [
    morningReminderTime,
    isMorningReminderEnabled,
    eveningReminderTime,
    isEveningReminderEnabled,
    settingsLoaded,
  ]);

  const loadSavedSettings = async () => {
    try {
      // Load morning settings
      const savedMorningTime = await AsyncStorage.getItem(
        "morningReminderTime"
      );
      const savedMorningEnabled = await AsyncStorage.getItem(
        "isMorningReminderEnabled"
      );

      if (savedMorningTime) {
        setMorningReminderTime(new Date(savedMorningTime));
      }
      if (savedMorningEnabled !== null) {
        setIsMorningReminderEnabled(savedMorningEnabled === "true");
      }

      // Load evening settings
      const savedEveningTime = await AsyncStorage.getItem(
        "eveningReminderTime"
      );
      const savedEveningEnabled = await AsyncStorage.getItem(
        "isEveningReminderEnabled"
      );

      if (savedEveningTime) {
        setEveningReminderTime(new Date(savedEveningTime));
      }
      if (savedEveningEnabled !== null) {
        setIsEveningReminderEnabled(savedEveningEnabled === "true");
      }
    } catch (error) {
      console.error("Error loading notification settings:", error);
    } finally {
      setSettingsLoaded(true); // Mark that settings have been loaded
    }
  };

  const saveAllSettings = async () => {
    try {
      await AsyncStorage.setItem(
        "morningReminderTime",
        morningReminderTime.toISOString()
      );
      await AsyncStorage.setItem(
        "isMorningReminderEnabled",
        isMorningReminderEnabled.toString()
      );
      await AsyncStorage.setItem(
        "eveningReminderTime",
        eveningReminderTime.toISOString()
      );
      await AsyncStorage.setItem(
        "isEveningReminderEnabled",
        isEveningReminderEnabled.toString()
      );
    } catch (error) {
      console.error("Error saving notification settings:", error);
    }
  };

  // Function to format time for display
  const formatTime = (date) => {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
  };

  // Handle time change for morning
  const handleMorningTimeChange = (event, selectedTime) => {
    setShowMorningPicker(false);
    if (selectedTime) {
      // Preserve the date but update the time
      const newDate = new Date(morningReminderTime);
      newDate.setHours(selectedTime.getHours());
      newDate.setMinutes(selectedTime.getMinutes());
      setMorningReminderTime(newDate);
    }
  };

  // Handle time change for evening
  const handleEveningTimeChange = (event, selectedTime) => {
    setShowEveningPicker(false);
    if (selectedTime) {
      // Preserve the date but update the time
      const newDate = new Date(eveningReminderTime);
      newDate.setHours(selectedTime.getHours());
      newDate.setMinutes(selectedTime.getMinutes());
      setEveningReminderTime(newDate);
    }
  };

  // Don't render the UI until settings are loaded to prevent switch animations
  if (!settingsLoaded) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <TopBar
          title={notificationTranslationText}
          onBack={() => navigation.goBack()}
          textStyle={[{ color: colors.textPrimary }, textStyles.heading3]}
        />
        <View
          style={[
            styles.contentContainer,
            { justifyContent: "center", alignItems: "center" },
          ]}
        >
          <Text style={{ color: colors.textPrimary }}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const sectionStyle = {
    backgroundColor: colors.cardBg,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 10,
  };

  const sectionTitleStyle = {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 15,
  };

  const reminderLabelStyle = {
    fontSize: 16,
    color: colors.textPrimary,
    flex: 1,
  };

  const timePickerStyle = {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 10,
    backgroundColor: colors.cardBg,
    minWidth: 100,
    marginLeft: 10,
  };

  const timeTextStyle = {
    fontSize: 16,
    color: colors.textPrimary,
    textAlign: "center",
  };
  const recentVerse = getMostRecentRead();

  const handlePushNotificationTest = () => {
    const chapter = chaptersData.find(
      (chapter) => chapter.chapter === recentVerse.ch
    );

    const verse = versesData.find(
      (verse) =>
        verse.chapter === recentVerse.ch && verse.verse === recentVerse.verse
    );

    setRecentChapterAndVerse({
      chapter: chapter[currentLanguage].title,
      verse: verse.languages[currentLanguage].translation,
    });

    // You can customize this function to include verse details if needed
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <TopBar
        title={notificationTranslationText}
        onBack={() => navigation.goBack()}
        textStyle={[{ color: colors.textPrimary }, textStyles.heading3]}
      />

      <View style={styles.contentContainer}>
        {/* Instruction text */}
        <Text
          style={[
            styles.instructionText,
            { color: colors.textSecondary },
            textStyles.body,
          ]}
        >
          {verseReminderTranslations[currentLanguage].instruction}
        </Text>

        {/* Local Push Notification Test Section */}
        <View style={sectionStyle}>
          <Text style={sectionTitleStyle}>Test Notifications</Text>
          {/* On button click fetch the most recent verse using the useReadVerses hook */}
          <PushNotificationButton
            buttonText="Test it"
            onClick={handlePushNotificationTest}
            notificationBody={recentChapterAndVerse.verse}
            notificationTitle={recentChapterAndVerse.chapter}
          />
        </View>

        {/* Combined Reminder Section */}
        <View style={sectionStyle}>
          <Text style={sectionTitleStyle}>{verseReminderTranslationsText}</Text>

          {/* Morning Reminder Row */}
          <View style={styles.reminderRow}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={[reminderLabelStyle, textStyles.textMedium]}>
                {morningReminderTranslationsText}
              </Text>
              <Switch
                value={isMorningReminderEnabled}
                onValueChange={setIsMorningReminderEnabled}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={
                  isMorningReminderEnabled
                    ? colors.primary
                    : colors.textTertiary
                }
              />
            </View>
            {isMorningReminderEnabled && (
              <TouchableOpacity
                style={timePickerStyle}
                onPress={() => setShowMorningPicker(true)}
              >
                <Text style={timeTextStyle}>
                  {formatTime(morningReminderTime)}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Evening Reminder Row */}
          <View style={styles.reminderRow}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={[reminderLabelStyle, textStyles.textMedium]}>
                {eveningReminderTranslationsText}
              </Text>
              <Switch
                value={isEveningReminderEnabled}
                onValueChange={setIsEveningReminderEnabled}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={
                  isEveningReminderEnabled
                    ? colors.primary
                    : colors.textTertiary
                }
              />
            </View>
            {isEveningReminderEnabled && (
              <TouchableOpacity
                style={timePickerStyle}
                onPress={() => setShowEveningPicker(true)}
              >
                <Text style={timeTextStyle}>
                  {formatTime(eveningReminderTime)}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Time Pickers - Only one will show at a time */}
          {showMorningPicker && (
            <DateTimePicker
              value={morningReminderTime}
              mode="time"
              display="default"
              onChange={handleMorningTimeChange}
            />
          )}
          {showEveningPicker && (
            <DateTimePicker
              value={eveningReminderTime}
              mode="time"
              display="default"
              onChange={handleEveningTimeChange}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    flex: 1,
  },
  instructionText: {
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 24,
    textAlign: "center",
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 30,
    textAlign: "center",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  reminderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingRight: 10,
  },
});

export default NotificationsScreen;
