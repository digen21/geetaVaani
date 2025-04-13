// components/BurgerMenu.js
import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import tw from "twrnc";

import { languages } from "../configs";
import { useLanguage, useTheme } from "../contexts";

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 60,
    alignItems: "flex-end",
  },
  modalContainer: {
    width: 250,
    padding: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  langModalContainer: {
    width: "80%",
    marginTop: 100,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 12,
    padding: 20,
  },
  langItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    marginVertical: 4,
  },
  langText: {
    fontSize: 16,
    flex: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
});

const BurgerMenu = ({ navigation, style }) => {
  const { colors } = useTheme();
  const { changeLanguage } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [showLangModal, setShowLangModal] = useState(false);

  const handleLanguageSelect = (langCode) => {
    changeLanguage(langCode);
    setShowLangModal(false);
  };

  const menuItems = [
    {
      name: "Home",
      icon: "home",
      action: () => navigation.navigate("Chapters"),
    },
    {
      name: "Favorites",
      icon: "favorite",
      action: () => navigation.navigate("Favorites"),
    },
    {
      name: "Settings",
      icon: "settings",
      action: () => navigation.navigate("Settings"),
    },
    {
      name: "About",
      icon: "info",
      action: () => navigation.navigate("About"),
    },
    {
      name: "Language",
      icon: "language",
      action: () => {
        setVisible(false);
        setShowLangModal(true);
      },
    },
    {
      name: "Characters",
      icon: "people",
      action: () => navigation.navigate("Characters"),
    },
    {
      name: "Summary",
      icon: "people",
      action: () => navigation.navigate("GeetaSummaryDetail"),
    },
  ];

  return (
    <>
      <TouchableOpacity
        style={style}
        onPress={() => setVisible(true)}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Icon name="menu" size={24} color={colors.primary} />
      </TouchableOpacity>

      {/* Burger Menu Modal */}
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View
            style={[
              styles.modalBackground,
              { backgroundColor: "rgba(0,0,0,0.5)" },
            ]}
          >
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <View
                style={[
                  styles.modalContainer,
                  { backgroundColor: colors.cardBg },
                ]}
              >
                {menuItems.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.menuItem}
                    onPress={() => {
                      if (item.action) {
                        item.action();
                        setVisible(false);
                      }
                    }}
                  >
                    <Icon name={item.icon} size={24} color={colors.primary} />
                    <Text style={[tw`ml-4 text-lg`, { color: colors.text }]}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Language Selection Modal */}
      <Modal
        visible={showLangModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLangModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowLangModal(false)}>
          <View
            style={[
              tw`flex-1 justify-center items-center`,
              { backgroundColor: "rgba(0,0,0,0.5)" },
            ]}
          >
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <View
                style={[
                  tw`w-80 p-6 rounded-xl`,
                  { backgroundColor: colors.cardBg },
                ]}
              >
                <Text
                  style={[tw`text-2xl font-bold mb-4`, { color: colors.text }]}
                >
                  Select Language
                </Text>

                {languages.map((lang) => (
                  <TouchableOpacity
                    key={lang.code}
                    style={[
                      tw`p-3 my-1 rounded-lg flex-row justify-between items-center`,
                      { backgroundColor: colors.background },
                    ]}
                    onPress={() => handleLanguageSelect(lang.code)}
                  >
                    <Text style={[tw`text-lg`, { color: colors.text }]}>
                      {lang.native}
                    </Text>

                    <Text style={[tw`text-sm`, { color: colors.primary }]}>
                      {lang.name}
                    </Text>
                  </TouchableOpacity>
                ))}

                <TouchableOpacity
                  style={tw`mt-4 p-2 items-center`}
                  onPress={() => setShowLangModal(false)}
                >
                  <Text style={{ color: colors.primary }}>Close</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default BurgerMenu;
