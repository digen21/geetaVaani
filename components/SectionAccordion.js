import React, { memo } from "react";
import { FlatList, View } from "react-native";

import AccordionItem from "./AccordionItem";
import { useLanguage } from "../contexts";
import { detailsScreenTranslations } from "../configs";

const SectionAccordion = ({
  sections,
  openSections,
  toggleSection,
  translations,
  colors,
  textStyles,
}) => {
  const { currentLanguage } = useLanguage();

  const SectionTitle = ({ section }) => {
    const translations =
      detailsScreenTranslations[currentLanguage] ||
      detailsScreenTranslations.en;
    return translations[section];
  };

  const handleAccordionPress = (sectionKey) => {
    // For single-section-open behavior, update all sections at once to prevent multiple re-renders
    const currentlyOpen = openSections[sectionKey];

    if (currentlyOpen) {
      // Just close the currently open section
      toggleSection(sectionKey);
    } else {
      // Open only the selected section and close all others
      const newOpenSections = {};
      Object.keys(openSections).forEach(key => {
        newOpenSections[key] = (key === sectionKey);
      });
      toggleSection(sectionKey, newOpenSections);
    }
  };

  const renderItem = ({ item }) => (
    <AccordionItem
      key={item.key}
      title={<SectionTitle section={item.titleKey} />}
      content={translations[item.contentKey]}
      isOpen={openSections[item.key]}
      onPress={() => handleAccordionPress(item.key)}
      colors={colors}
      fontStyle={textStyles.textThin}
    />
  );

  return (
    <FlatList
      data={sections}
      renderItem={renderItem}
      keyExtractor={(item) => item.key}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews={false} // Changed to false to prevent layout shift issues
      keyboardShouldPersistTaps="handled"
      initialNumToRender={sections.length}
      maxToRenderPerBatch={sections.length}
      windowSize={sections.length + 1}
      contentContainerStyle={{ flexGrow: 1 }}
      nestedScrollEnabled={true} // Changed to true to properly handle nested scrolling
      bounces={false}
      overScrollMode="never"
    />
  );
};

export default memo(SectionAccordion);
