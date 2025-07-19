import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

export function AboutMe() {
  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.content}>
        <ThemedText style={styles.heading}>About Me</ThemedText>
        
        <ThemedText style={styles.paragraph}>
          Hi! I'm Ayush Sanger, a dual-degree student at BITS Pilani, pursuing Chemistry and Mathematics & Computing. 
          I'm passionate about building meaningful things — whether it's software products, machine learning models, 
          or a healthier, more productive life.
        </ThemedText>

        <ThemedText style={styles.paragraph}>
          Over the last few years, I've explored a wide range of interests across technology, fitness, 
          entrepreneurship, and mental wellness. I've co-founded apps like BITS Pawn Shop and contributed 
          to platforms like FITSOC, where I combine tech with physical and mental well-being.
        </ThemedText>

        <ThemedText style={styles.paragraph}>
          My academic journey started with research in electrocatalysis and surface chemistry, where I 
          applied machine learning to accelerate catalyst discovery. Later, I shifted focus to full-stack 
          development, cross-platform app building, and startup ideation.
        </ThemedText>

        <ThemedText style={styles.heading2}>My Mission</ThemedText>
        <ThemedText style={styles.paragraph}>
          Beyond tech, I care deeply about personal growth — mentally, physically, and emotionally. 
          I actively trade, work out daily, and create content to share what I've learned along the way. 
          My goal is simple:
        </ThemedText>

        <ThemedText style={styles.quote}>
          "To help people — especially those like me — get better, live healthier, and stay real."
        </ThemedText>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'SpaceMono',
  },
  heading2: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    fontFamily: 'SpaceMono',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
    fontFamily: 'SpaceMono',
  },
  quote: {
    fontSize: 18,
    fontStyle: 'italic',
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 20,
    fontFamily: 'SpaceMono',
  },
});
