import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function PortfolioScreen() {
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
        <ThemedText type="title">Portfolio</ThemedText>
        
        <ThemedView style={styles.projectContainer}>
          <ThemedText type="subtitle">BITS Pawn Shop</ThemedText>
          <ThemedText>
            A platform that revolutionizes how students buy and sell items within the BITS Pilani community.
            Built with React Native and Firebase.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.projectContainer}>
          <ThemedText type="subtitle">FITSOC Platform</ThemedText>
          <ThemedText>
            Contributed to developing a fitness and wellness platform that combines social networking
            with health tracking features.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.projectContainer}>
          <ThemedText type="subtitle">ML for Catalyst Discovery</ThemedText>
          <ThemedText>
            Research project applying machine learning algorithms to accelerate the discovery of new
            catalysts for chemical reactions.
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
  projectContainer: {
    marginVertical: 15,
  },
  headerImage: {
    width: 100,
    height: 100,
  }
});
