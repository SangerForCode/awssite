import React, { useState } from 'react';
import { StyleSheet, Dimensions, Pressable, ScrollView, View } from 'react-native';
import Animated, {
  FadeInDown,
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { globalStyles, COLORS } from '@/styles/globalStyles';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Timeline Card Component
interface TimelineCardProps {
  year: string;
  title: string;
  description: string;
  delay?: number;
  isLast?: boolean;
}

const TimelineCard: React.FC<TimelineCardProps> = ({ 
  year, 
  title, 
  description, 
  delay = 0,
  isLast = false 
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSpring(0.95, {}, () => {
      scale.value = withSpring(1);
    });
  };

  return (
    <Animated.View entering={FadeInUp.delay(delay).springify()}>
      <View style={styles.timelineItem}>
        {/* Timeline Line */}
        {!isLast && <View style={styles.timelineLine} />}
        
        {/* Timeline Dot */}
        <View style={styles.timelineDot} />
        
        {/* Content Card */}
        <Animated.View style={[styles.timelineCard, animatedStyle]}>
          <Pressable onPress={handlePress} style={styles.cardPressable}>
            <View style={styles.cardHeader}>
              <ThemedText style={styles.yearText}>{year}</ThemedText>
              <View style={styles.yearBadge}>
                <ThemedText style={styles.yearBadgeText}>•</ThemedText>
              </View>
            </View>
            <ThemedText style={styles.titleText}>{title}</ThemedText>
            <ThemedText style={styles.descriptionText}>{description}</ThemedText>
          </Pressable>
        </Animated.View>
      </View>
    </Animated.View>
  );
};

// Stats Component
const Stats = () => {
  const stats = [
    { label: 'Years', value: '5' },
    { label: 'Degrees', value: '2' },
    { label: 'Campus', value: 'GOA' },
  ];

  return (
    <Animated.View entering={FadeInDown.delay(200).springify()} style={styles.statsContainer}>
      {stats.map((stat, index) => (
        <View key={index} style={styles.statItem}>
          <ThemedText style={styles.statValue}>{stat.value}</ThemedText>
          <ThemedText style={styles.statLabel}>{stat.label}</ThemedText>
        </View>
      ))}
    </Animated.View>
  );
};

// Main Component
export default function ExploreScreen() {
  const timelineData = [
    {
      year: '2021',
      title: 'Started Journey',
      description: 'Joined BITS Pilani Goa with Chemistry. New beginnings in paradise.',
    },
    {
      year: '2022', 
      title: 'Dual Degree',
      description: 'Added Math & Computing. Discovered the beauty of code and algorithms.',
    },
    {
      year: '2023',
      title: 'Research Phase',
      description: 'Applied ML to chemistry research. Published papers on electrocatalysis.',
    },
    {
      year: '2024',
      title: 'Building Things',
      description: 'Co-founded ventures, built apps, started creating content.',
    },
    {
      year: '2025',
      title: 'Current Focus',
      description: 'Mental health apps, trading, fitness. The journey continues.',
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Animated.View entering={FadeInUp.springify()} style={styles.header}>
        <ThemedText style={styles.headerTitle}>Journey</ThemedText>
        <ThemedText style={styles.headerSubtitle}>BITS Pilani • Goa Campus</ThemedText>
      </Animated.View>

      {/* Stats */}
      <Stats />

      {/* About Card */}
      <Animated.View entering={FadeInUp.delay(400).springify()} style={styles.aboutCard}>
        <View style={styles.aboutContent}>
          <ThemedText style={styles.aboutTitle}>Dual Degree Student</ThemedText>
          <ThemedText style={styles.aboutText}>
            Chemistry + Mathematics & Computing{'\n'}
            Combining molecular science with computational thinking
          </ThemedText>
          <View style={styles.tagContainer}>
            <View style={styles.tag}>
              <ThemedText style={styles.tagText}>Research</ThemedText>
            </View>
            <View style={styles.tag}>
              <ThemedText style={styles.tagText}>Development</ThemedText>
            </View>
            <View style={styles.tag}>
              <ThemedText style={styles.tagText}>Innovation</ThemedText>
            </View>
          </View>
        </View>
      </Animated.View>

      {/* Timeline */}
      <View style={styles.timelineContainer}>
        {timelineData.map((item, index) => (
          <TimelineCard
            key={index}
            {...item}
            delay={600 + index * 100}
            isLast={index === timelineData.length - 1}
          />
        ))}
      </View>

      {/* Footer */}
      <Animated.View entering={FadeInUp.delay(1200).springify()} style={styles.footer}>
        <View style={styles.footerContent}>
          <ThemedText style={styles.footerEmoji}>🚀</ThemedText>
          <ThemedText style={styles.footerText}>
            Building the future, one line of code at a time
          </ThemedText>
        </View>
      </Animated.View>

      {/* Bottom Spacer */}
      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ...globalStyles,

  // Page-specific styles
  timelineContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  timelineItem: {
    position: 'relative',
    paddingLeft: 40,
    marginBottom: 24,
  },
  timelineCard: {
    backgroundColor: COLORS.gray,
    borderRadius: 12,
    overflow: 'hidden',
  },
  aboutCard: {
    ...globalStyles.card,
    marginBottom: 40,
  },
  aboutContent: {
    flex: 1,
  },
  aboutTitle: {
    ...globalStyles.cardTitle,
  },
  aboutText: {
    ...globalStyles.cardText,
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 14,
    color: COLORS.textLight,
    lineHeight: 20,
  },
  timelineLine: {
    position: 'absolute',
    left: 15,
    top: 32,
    bottom: -24,
    width: 2,
    backgroundColor: COLORS.gray,
  },
  timelineDot: {
    position: 'absolute',
    left: 11,
    top: 16,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.accent,
  },
  yearText: {
    fontSize: 14,
    color: COLORS.accent,
    fontWeight: '600',
    marginRight: 8,
  },
  yearBadge: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.text,
    justifyContent: 'center',
    alignItems: 'center',
  },
  yearBadgeText: {
    fontSize: 8,
    color: COLORS.text,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.white,
    marginBottom: 6,
  },
  cardPressable: {
    padding: 20,
  },
});
