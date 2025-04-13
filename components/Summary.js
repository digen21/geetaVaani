import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLanguage } from '../contexts';

const ComicPanel = ({ image, title, description }) => (
  <View style={styles.comicPanel}>
    <Image 
      source={{ uri: image }}
      style={styles.panelImage}
      resizeMode="cover"
    />
    <View style={styles.panelTextContainer}>
      <Text style={styles.panelTitle}>{title}</Text>
      <Text style={styles.panelDescription}>{description}</Text>
    </View>
  </View>
);

const GeetaSummaryComic = () => {
  const navigation = useNavigation();
  const { currentLanguage } = useLanguage();

  const comicPanels = [
    {
      image: 'https://res.cloudinary.com/your-cloud/kurukshetra.jpg',
      title: 'The Battlefield of Kurukshetra',
      description: 'As the war is about to begin, two mighty armies face each other.'
    },
    {
      image: 'https://res.cloudinary.com/your-cloud/arjuna-despair.jpg',
      title: 'Arjuna\'s Dilemma',
      description: 'Seeing his relatives in the opposing army, Arjuna is overcome with grief.'
    },
    {
      image: 'https://res.cloudinary.com/your-cloud/krishna-teaching.jpg',
      title: 'Divine Wisdom',
      description: 'Lord Krishna begins his immortal discourse - The Bhagavad Gita.'
    }
  ];

  const handleReadMore = () => {
    navigation.navigate('GeetaSummaryDetail');
  };

  return (
    <LinearGradient
      colors={['#FFF8E1', '#FFE0B2']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.mainTitle}>The Story Behind Bhagavad Gita</Text>
        
        {comicPanels.map((panel, index) => (
          <ComicPanel key={index} {...panel} />
        ))}

        <TouchableOpacity 
          style={styles.readMoreButton}
          onPress={handleReadMore}
        >
          <Text style={styles.readMoreText}>Read Full Summary</Text>
        </TouchableOpacity>
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
  comicPanel: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  panelImage: {
    width: '100%',
    height: 200,
  },
  panelTextContainer: {
    padding: 16,
  },
  panelTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  panelDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  readMoreButton: {
    backgroundColor: '#FF9800',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  readMoreText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GeetaSummaryComic;