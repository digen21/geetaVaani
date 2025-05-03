import React from "react";
import { View } from "react-native";

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

  return (
    <View>
      {sections.map((section) => (
        <AccordionItem
          key={section.key}
          title={<SectionTitle section={section.titleKey} />}
          content={translations[section.contentKey]}
          isOpen={openSections[section.key]}
          onPress={() => toggleSection(section.key)}
          colors={colors}
          fontStyle={textStyles.heading3}
        />
      ))}
    </View>
  );
};

export default SectionAccordion;
