import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import tw from "twrnc";

import { useLanguage, useTheme } from "../contexts";
import { createTextStyles } from "../utils";

const LanguageSelectModal = ({ visible, onClose }) => {
  const { colors } = useTheme();
  const { currentLanguage, changeLanguage } = useLanguage();
  const textStyles = createTextStyles(currentLanguage);

  const languages = [
    { code: "en", name: "English", native: "English" },
    { code: "hi", name: "Hindi", native: "हिन्दी" },
    { code: "mr", name: "Marathi", native: "मराठी" },
    { code: "gu", name: "Gujarati", native: "ગુજરાતી" },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPressOut={onClose}
      >
        <View style={[styles.modalContent, { backgroundColor: colors.cardBg }]}>
          <Text style={[styles.modalTitle, { color: colors.text }]}>
            Select Language
          </Text>

          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              style={[
                styles.languageItem,
                {
                  backgroundColor:
                    lang.code === currentLanguage
                      ? colors.primary + "20"
                      : "transparent",
                },
              ]}
              onPress={() => {
                changeLanguage(lang.code);
                onClose();
              }}
            >
              <Text style={[styles.languageText, { color: colors.text }, textStyles.body]}>
                {lang.native}
              </Text>
              <Text style={[styles.languageSubtext, { color: colors.primary }, textStyles.body]}>
                {lang.name}
              </Text>
              {lang.code === currentLanguage && (
                <Icon
                  name="check"
                  size={20}
                  color={colors.primary}
                  style={tw`ml-auto`}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  languageItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    marginVertical: 4,
  },
  languageText: {
    fontSize: 16,
    flex: 1,
  },
  languageSubtext: {
    fontSize: 14,
    marginLeft: 8,
  },
});

export default LanguageSelectModal;
