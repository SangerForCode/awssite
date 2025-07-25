import { ThemedText } from '@/components/ThemedText';
import { COLORS, globalStyles } from '@/styles/globalStyles';
import React from 'react';
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Animated, {
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Import logos from local assets
const FitSocLogo = require('../../assets/Photos/fitsoc.jpg');
const SportsBoardLogo = require('../../assets/Photos/sportsboard.jpg');
const StudentStoreLogo = require('../../assets/Photos/studentstore.jpg');

// Timeline Card Component
interface TimelineCardProps {
  year: string;
  title: string;
  description: string;
  logo?: any;
  delay?: number;
  isLast?: boolean;
}

const TimelineCard: React.FC<TimelineCardProps> = ({
  year,
  title,
  description,
  logo,
  delay = 0,
  isLast = false,
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
        {!isLast && <View style={styles.timelineLine} />}
        <View style={styles.timelineDot} />

        <Animated.View style={[styles.timelineCard, animatedStyle]}>
          <Pressable onPress={handlePress} style={styles.cardPressable}>
            <View style={styles.cardContentContainer}>
              {/* Left Content */}
              <View style={styles.leftContent}>
                <View style={styles.cardHeader}>
                  <ThemedText style={styles.yearText}>{year}</ThemedText>
                </View>
                <ThemedText style={styles.titleText}>{title}</ThemedText>
                <ThemedText style={styles.descriptionText}>{description}</ThemedText>
              </View>

              {/* Right Logo */}
              {logo && (
                <View style={styles.rightLogoContainer}>
                  <Image source={logo} style={styles.logoImageLarge} resizeMode="contain" />
                </View>
              )}
            </View>
          </Pressable>
        </Animated.View>
      </View>
    </Animated.View>
  );
};

// Stats Component
const Stats: React.FC = () => {
  const stats = [
    { label: 'CGPA', value: '8+' },
    { label: 'Leadership Roles', value: '12+' },
    { label: 'Major Projects', value: '8' },
    { label: 'Campus', value: 'GOA' },
  ];

  return (
    <Animated.View entering={FadeInDown.delay(200).springify()} style={styles.statsContainer}>
      {stats.map((stat, idx) => (
        <View key={idx} style={styles.statItem}>
          <ThemedText style={styles.statValue}>{stat.value}</ThemedText>
          <ThemedText style={styles.statLabel}>{stat.label}</ThemedText>
        </View>
      ))}
    </Animated.View>
  );
};

// Main Screen
export default function AyushJourneyScreen() {
  const timelineData: TimelineCardProps[] = [
    {
      year: '2020',
      title: 'Academic Foundation',
      description:
        'Achieved exceptional academic performance in CBSE Class 10th Board Exam from Cambridge School Noida.',
      delay: 600,
    },
    {
      year: '2022',
      title: 'Pre-University Excellence',
      description:
        'Secured outstanding results in Class 12th with specialization in Physics, Chemistry, Mathematics, and Biology.',
      delay: 700,
    },
    {
      year: '2023',
      title: 'BITS Journey Begins',
      description:
        'Started dual-degree program at BITS Pilani Goa Campus combining M.Sc. Chemistry with B.E. Mathematics and Computing.',
      delay: 800,
    },
    {
      year: '2024',
      title: 'Leadership Development',
      description:
        'Advanced to core positions while developing technical expertise through research projects and internships.',
      delay: 900,
    },
    {
      year: '2025',
      title: 'Chief Coordinator - FitSoc',
      description:
        'Leading the premier fitness society of BITS Goa, managing comprehensive fitness programs and wellness initiatives for the entire campus community.',
      logo: FitSocLogo,
      delay: 1000,
    },
    {
      year: '2025',
      title: 'Chief of Sports Board - BITS Goa',
      description:
        'Overseeing sports activities and athletic programs across BITS Goa campus, coordinating intra-college competitions and promoting sports culture.',
      logo: SportsBoardLogo,
      delay: 1100,
    },
    {
      year: '2025',
      title: 'Co-Founder - BITS Student Store',
      description:
        'Pioneered innovative online resale platform (bits-pilani.store) serving 4000+ active users across BITS campuses, promoting sustainable peer-to-peer transactions.',
      logo: StudentStoreLogo,
      delay: 1200,
      isLast: true,
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Animated.View entering={FadeInUp.springify()} style={styles.header}>
        <ThemedText style={styles.headerTitle}>Journey & Achievements</ThemedText>
        <ThemedText style={styles.headerSubtitle}>A Timeline of Growth and Leadership</ThemedText>
        <ThemedText style={styles.headerDescription}>
          BITS Pilani Goa Campus • Dual Degree Program
        </ThemedText>
      </Animated.View>

      {/* Stats */}
      <Stats />

      {/* About */}
      <Animated.View entering={FadeInUp.delay(400).springify()} style={styles.aboutCard}>
        <View style={styles.aboutContent}>
          <ThemedText style={styles.aboutTitle}>Dual Degree Program</ThemedText>
          <ThemedText style={styles.aboutText}>
            <ThemedText style={styles.boldText}>M.Sc. Chemistry</ThemedText> +{' '}
            <ThemedText style={styles.boldText}>B.E. Mathematics & Computing</ThemedText>
            {'\n'}Expected Graduation: <ThemedText style={styles.boldText}>August 2028</ThemedText>
          </ThemedText>
        </View>
      </Animated.View>

      {/* Timeline */}
      <View style={styles.timelineContainer}>
        {timelineData.map((item, idx) => (
          <TimelineCard key={idx} {...item} />
        ))}
      </View>

      {/* Footer */}
      <Animated.View entering={FadeInUp.delay(1400).springify()} style={styles.footer}>
        <View style={styles.footerContent}>
          <ThemedText style={styles.footerEmoji}>🚀</ThemedText>
          <ThemedText style={styles.footerText}>
            Bridging analytical thinking with computational innovation to create meaningful impact across multiple domains.
          </ThemedText>
        </View>
      </Animated.View>

      <View style={{ height: 80 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ...globalStyles,

  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 30,
  },

  headerTitle: {
    fontSize: 36,
    fontWeight: '900',
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: 12,
  },

  headerSubtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.accent,
    textAlign: 'center',
    marginBottom: 6,
  },

  headerDescription: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
  },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 24,
    paddingVertical: 25,
    marginBottom: 25,
  },

  statItem: {
    alignItems: 'center',
  },

  statValue: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.accent,
    marginBottom: 6,
  },

  statLabel: {
    fontSize: 13,
    color: COLORS.textLight,
    textAlign: 'center',
  },

  aboutCard: {
    backgroundColor: COLORS.gray,
    borderRadius: 20,
    padding: 28,
    marginHorizontal: 24,
    marginBottom: 30,
  },

  aboutContent: {
    flexDirection: 'column',
  },

  aboutTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 16,
  },

  aboutText: {
    fontSize: 16,
    color: COLORS.textLight,
    lineHeight: 24,
  },

  boldText: {
    fontWeight: '700',
    color: COLORS.accent,
  },

  timelineContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },

  timelineItem: {
    position: 'relative',
    paddingLeft: 45,
    marginBottom: 30,
  },

  timelineCard: {
    backgroundColor: COLORS.gray,
    borderRadius: 16,
    overflow: 'hidden',
  },

  cardPressable: {
    padding: 24,
  },

  // New layout styles for logo positioning
  cardContentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  leftContent: {
    flex: 1,
    paddingRight: 16,
  },

  rightLogoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
  },

  logoImageLarge: {
    width: 80,
    height: 80,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.accent,
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  yearText: {
    fontSize: 16,
    color: COLORS.accent,
    fontWeight: '700',
    marginRight: 12,
  },

  titleText: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 8,
  },

  descriptionText: {
    fontSize: 16,
    color: COLORS.textLight,
    lineHeight: 22,
  },

  timelineLine: {
    position: 'absolute',
    left: 18,
    top: 35,
    bottom: -30,
    width: 3,
    backgroundColor: COLORS.accent,
  },

  timelineDot: {
    position: 'absolute',
    left: 13,
    top: 20,
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: COLORS.accent,
    borderWidth: 3,
    borderColor: COLORS.background,
  },

  footer: {
    paddingHorizontal: 24,
    paddingVertical: 35,
  },

  footerContent: {
    alignItems: 'center',
    backgroundColor: COLORS.gray,
    borderRadius: 20,
    padding: 28,
  },

  footerEmoji: {
    fontSize: 36,
    marginBottom: 15,
  },

  footerText: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 22,
    fontStyle: 'italic',
  },
});
