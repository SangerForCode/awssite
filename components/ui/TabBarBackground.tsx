import { StyleSheet, Platform } from 'react-native';
import { BlurView } from 'expo-blur';

import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';

export function TabBarBackground() {
  if (Platform.OS === 'ios') {
    return (
      <BlurView
        intensity={80}
        tint="light"
        style={[StyleSheet.absoluteFill, styles.tabBar]}
      />
    );
  }

  return <ThemedView style={[StyleSheet.absoluteFill, styles.tabBar]} />;
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Platform.select({
      ios: 'rgba(255, 255, 255, 0.8)',
      android: Colors.light.backgroundAlt,
      default: Colors.light.backgroundAlt,
    }),
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    shadowColor: Colors.light.text,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 8,
  },
});

export function useBottomTabOverflow() {
  return Platform.OS === 'ios' ? -1 : 0;
}
