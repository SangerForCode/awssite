import React, { useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Linking,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';
import Animated, {
  FadeInDown,
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const { width } = Dimensions.get('window');

// Minimal Color Palette
const COLORS = {
  dark: '#0A0A0A',
  gray: '#1A1A1A', 
  light: '#F5F5F5',
  white: '#FFFFFF',
  accent: '#6366F1',
  text: '#888888',
  textLight: '#CCCCCC',
  green: '#10B981',
  orange: '#F59E0B',
  purple: '#8B5CF6',
  blue: '#3B82F6',
};

// Animated Card Component
interface AnimatedCardProps {
  title: string;
  description: string;
  details: string[];
  icon: string;
  color: string;
  delay?: number;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  title,
  description,
  details,
  icon,
  color,
  delay = 0,
}) => {
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotateY: `${rotation.value}deg` },
    ],
  }));

  const handlePress = () => {
    scale.value = withSpring(0.95, {}, () => {
      scale.value = withSpring(1);
    });
    rotation.value = withTiming(5, { duration: 100 }, () => {
      rotation.value = withTiming(0, { duration: 100 });
    });
  };

  return (
    <Animated.View 
      entering={FadeInUp.delay(delay).springify()}
      style={[styles.card, animatedStyle]}
    >
      <TouchableOpacity onPress={handlePress} style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <View style={[styles.iconContainer, { backgroundColor: `${color}20` }]}>
            <ThemedText style={styles.cardIcon}>{icon}</ThemedText>
          </View>
          <View style={styles.titleContainer}>
            <ThemedText style={[styles.cardTitle, { color }]}>{title}</ThemedText>
            <ThemedText style={styles.cardDescription}>{description}</ThemedText>
          </View>
        </View>
        
        <View style={styles.detailsContainer}>
          {details.map((detail, index) => (
            <View key={index} style={styles.detailItem}>
              <View style={[styles.bullet, { backgroundColor: color }]} />
              <ThemedText style={styles.detailText}>{detail}</ThemedText>
            </View>
          ))}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

// Floating Element Component
interface FloatingElementProps {
  emoji: string;
  style: any;
}

const FloatingElement: React.FC<FloatingElementProps> = ({ emoji, style }) => {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withRepeat(
      withTiming(-10, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[style, animatedStyle]}>
      <ThemedText style={styles.floatingEmoji}>{emoji}</ThemedText>
    </Animated.View>
  );
};

// Stats Component
const Stats = () => {
  const stats = [
    { label: 'CGPA', value: '8.0' },
    { label: 'Projects', value: '8+' },
    { label: 'Users', value: '3.5K+' },
    { label: 'Year', value: '2025' },
  ];

  return (
    <Animated.View entering={FadeInDown.delay(600).springify()} style={styles.statsContainer}>
      {stats.map((stat, index) => (
        <View key={index} style={styles.statItem}>
          <ThemedText style={styles.statValue}>{stat.value}</ThemedText>
          <ThemedText style={styles.statLabel}>{stat.label}</ThemedText>
        </View>
      ))}
    </Animated.View>
  );
};

// Social Button Component
interface SocialButtonProps {
  label: string;
  url: string;
  delay?: number;
}

const SocialButton: React.FC<SocialButtonProps> = ({ label, url, delay = 0 }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSpring(0.9, {}, () => {
      scale.value = withSpring(1);
    });
    
    if (url) {
      Linking.openURL(url).catch(() => {
        Alert.alert('Error', 'Could not open link');
      });
    } else {
      Alert.alert('Coming Soon', `${label} link will be available soon`);
    }
  };

  return (
    <Animated.View entering={FadeInUp.delay(delay).springify()} style={animatedStyle}>
      <TouchableOpacity onPress={handlePress} style={styles.socialButton}>
        <ThemedText style={styles.socialButtonText}>{label}</ThemedText>
      </TouchableOpacity>
    </Animated.View>
  );
};

// Main Component
export default function IndexScreen() {
  const waveAnimation = useSharedValue(0);

  useEffect(() => {
    waveAnimation.value = withRepeat(
      withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const waveStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${waveAnimation.value * 20 - 10}deg`,
      },
    ],
  }));

  const cardData = [
    {
      title: 'Student & Developer',
      description: 'Dual degree at BITS Pilani Goa',
      details: [
        'M.Sc. Chemistry, B.E. Math & Computing',
        'Third-year integrated program',
        'Research in electrocatalysis & ML',
      ],
      icon: '🎓',
      color: COLORS.accent,
    },
    {
      title: 'Entrepreneur',
      description: 'Building solutions that matter',
      details: [
        'Co-founder of BITS Pawn Shop',
        '3.5K+ active users across campuses',
        'Expanding to multiple BITS locations',
      ],
      icon: '🚀',
      color: COLORS.green,
    },
    {
      title: 'Researcher',
      description: 'Chemistry meets machine learning',
      details: [
        'ML models for electrocatalyst discovery',
        'Co-authoring research papers',
        'Combining chemistry with AI',
      ],
      icon: '🔬',
      color: COLORS.purple,
    },
    {
      title: 'Creator',
      description: 'Content, fitness & trading',
      details: [
        'Mental health advocacy',
        'Algorithmic trading systems',
        'Fitness app development',
      ],
      icon: '💪',
      color: COLORS.blue,
    },
  ];

  const socialLinks = [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/ayushsanger/' },
    { label: 'Instagram', url: 'https://www.instagram.com/sanger_ayush' },
    { label: 'GitHub', url: 'https://github.com/SangerForCode' },
    { label: 'Schedule', url: 'https://calendly.com/f20230742-goa' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Floating Elements */}
      <FloatingElement emoji="💻" style={styles.float1} />
      <FloatingElement emoji="🧪" style={styles.float2} />
      <FloatingElement emoji="🚀" style={styles.float3} />

      {/* Header */}
      <Animated.View entering={FadeInUp.springify()} style={styles.header}>
        <View style={styles.nameContainer}>
          <ThemedText style={styles.firstName}>Ayush</ThemedText>
          <ThemedText style={styles.lastName}>Sanger</ThemedText>
          <Animated.View style={[styles.waveContainer, waveStyle]}>
            <ThemedText style={styles.wave}>👋</ThemedText>
          </Animated.View>
        </View>
        <ThemedText style={styles.tagline}>
          Creating impact through technology & innovation
        </ThemedText>
        <ThemedText style={styles.location}>📍 BITS Pilani, Goa Campus</ThemedText>
      </Animated.View>

      {/* Stats */}
      <Stats />

      {/* About Card */}
      <Animated.View entering={FadeInUp.delay(800).springify()} style={styles.aboutCard}>
        <ThemedText style={styles.aboutTitle}>About Me</ThemedText>
        <ThemedText style={styles.aboutText}>
          Third-year dual degree student at BITS Pilani with an 8.0 CGPA, combining chemistry research with 
          cutting-edge technology. Building solutions that bridge the gap between science 
          and software, with a focus on mental health, sustainability, and innovation.
        </ThemedText>
        
        <View style={styles.currentlyContainer}>
          <ThemedText style={styles.currentlyTitle}>Currently Working On:</ThemedText>
          <View style={styles.currentItems}>
            <View style={styles.currentItem}>
              <ThemedText style={styles.currentDot}>•</ThemedText>
              <ThemedText style={styles.currentText}>BITS Pawn Shop expansion</ThemedText>
            </View>
            <View style={styles.currentItem}>
              <ThemedText style={styles.currentDot}>•</ThemedText>
              <ThemedText style={styles.currentText}>FITSOC fitness app</ThemedText>
            </View>
            <View style={styles.currentItem}>
              <ThemedText style={styles.currentDot}>•</ThemedText>
              <ThemedText style={styles.currentText}>Algorithmic trading systems</ThemedText>
            </View>
          </View>
        </View>
      </Animated.View>

      {/* Cards Grid */}
      <View style={styles.cardsGrid}>
        {cardData.map((card, index) => (
          <AnimatedCard
            key={index}
            {...card}
            delay={1000 + index * 150}
          />
        ))}
      </View>

      {/* Social Section */}
      <Animated.View entering={FadeInUp.delay(1800).springify()} style={styles.socialSection}>
        <ThemedText style={styles.socialTitle}>Let's Connect</ThemedText>
        <ThemedText style={styles.socialSubtitle}>
          Always open to discussing new opportunities, collaborations, 
          or just having a chat about tech and innovation
        </ThemedText>
        
        <View style={styles.socialButtons}>
          {socialLinks.map((link, index) => (
            <SocialButton
              key={index}
              {...link}
              delay={2000 + index * 100}
            />
          ))}
        </View>
      </Animated.View>

      {/* Footer */}
      <Animated.View entering={FadeInUp.delay(2500).springify()} style={styles.footer}>
        <ThemedText style={styles.footerText}>
          "Building the future, one line of code at a time" ✨
        </ThemedText>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark,
  },

  // Floating Elements
  float1: {
    position: 'absolute',
    top: '12%',
    left: '8%',
    opacity: 0.15,
    zIndex: -1,
  },
  float2: {
    position: 'absolute',
    top: '45%',
    right: '15%',
    opacity: 0.1,
    zIndex: -1,
  },
  float3: {
    position: 'absolute',
    bottom: '25%',
    left: '15%',
    opacity: 0.1,
    zIndex: -1,
  },
  floatingEmoji: {
    fontSize: 50,
  },

  // Header
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  firstName: {
    fontSize: 40,
    fontWeight: '300',
    color: COLORS.white,
    marginRight: 8,
  },
  lastName: {
    fontSize: 40,
    fontWeight: '700',
    color: COLORS.white,
    marginRight: 16,
  },
  waveContainer: {
    marginLeft: 8,
  },
  wave: {
    fontSize: 32,
  },
  tagline: {
    fontSize: 18,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '300',
  },
  location: {
    fontSize: 14,
    color: COLORS.text,
  },

  // Stats
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.text,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  // About Card
  aboutCard: {
    marginHorizontal: 24,
    marginBottom: 32,
    backgroundColor: COLORS.gray,
    borderRadius: 16,
    padding: 24,
  },
  aboutTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.white,
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 16,
    color: COLORS.textLight,
    lineHeight: 24,
    marginBottom: 20,
  },
  currentlyContainer: {
    marginTop: 8,
  },
  currentlyTitle: {
    fontSize: 16,
    color: COLORS.accent,
    fontWeight: '600',
    marginBottom: 12,
  },
  currentItems: {
    gap: 8,
  },
  currentItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentDot: {
    color: COLORS.accent,
    marginRight: 12,
    fontSize: 16,
  },
  currentText: {
    fontSize: 14,
    color: COLORS.textLight,
  },

  // Cards
  cardsGrid: {
    paddingHorizontal: 24,
    gap: 16,
    marginBottom: 32,
  },
  card: {
    backgroundColor: COLORS.gray,
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardContent: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardIcon: {
    fontSize: 24,
  },
  titleContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: COLORS.text,
  },
  detailsContainer: {
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bullet: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginRight: 12,
  },
  detailText: {
    fontSize: 14,
    color: COLORS.textLight,
    flex: 1,
  },

  // Social Section
  socialSection: {
    marginHorizontal: 24,
    backgroundColor: COLORS.gray,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 32,
  },
  socialTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.white,
    marginBottom: 8,
  },
  socialSubtitle: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  socialButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  socialButton: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    minWidth: 100,
    alignItems: 'center',
  },
  socialButtonText: {
    fontSize: 14,
    color: COLORS.white,
    fontWeight: '600',
  },

  // Footer
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: COLORS.text,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
