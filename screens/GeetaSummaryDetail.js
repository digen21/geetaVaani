import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLanguage } from '../contexts';

const SectionCard = ({ heading, content }) => (
  <View style={styles.sectionCard}>
    <Text style={styles.sectionHeading}>{heading}</Text>
    {Array.isArray(content) ? (
      content.map((item, index) => (
        <Text key={index} style={styles.sectionContent}>• {item}</Text>
      ))
    ) : (
      <Text style={styles.sectionContent}>{content}</Text>
    )}
  </View>
);

const GeetaSummaryDetail = () => {
  const { currentLanguage } = useLanguage();
  const summaryData = require('../data/whole-summary.json')[0][currentLanguage];

  return (
    <LinearGradient
      colors={['#FFF8E1', '#FFE0B2']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.mainTitle}>{summaryData.title}</Text>
        
        {summaryData.sections.map((section, index) => (
          <SectionCard
            key={index}
            heading={section.heading}
            content={section.content}
          />
        ))}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#4A4A4A',
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  sectionContent: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    marginBottom: 8,
  },
});

export default GeetaSummaryDetail;