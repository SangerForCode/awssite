import { StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Image } from 'expo-image';

export default function ContactScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Get in Touch</ThemedText>
        
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Connect With Me</ThemedText>
          <ThemedText>
            Feel free to reach out for collaborations, questions, or just to say hello!
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Contact Information</ThemedText>
          <ThemedText>
            Email: your.email@example.com{'\n'}
            LinkedIn: linkedin.com/in/ayushsanger{'\n'}
            GitHub: github.com/SangerForCode
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Location</ThemedText>
          <ThemedText>
            BITS Pilani{'\n'}
            Pilani, Rajasthan{'\n'}
            India
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  section: {
    marginVertical: 15,
  },
  headerImage: {
    width: 100,
    height: 100,
  }
});
