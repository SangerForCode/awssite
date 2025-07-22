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
import { globalStyles, COLORS } from '@/styles/globalStyles';
import { useRouter } from 'expo-router'; // Added router import


const { width } = Dimensions.get('window');


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
            <View key={index} style={styles.listItem}>
              <View style={[styles.bullet, { backgroundColor: color }]} />
              <ThemedText style={styles.listText}>{detail}</ThemedText>
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
  const router = useRouter(); // Added router hook


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


  // Function to handle moderator page navigation
  const handleModeratorNavigation = () => {
    router.push('/moderator');
  };


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
        <TouchableOpacity 
          onPress={() => {
            const { router } = require('expo-router');
            router.push('/love');
          }}
        >
          <ThemedText style={styles.aboutTitle}>About Me</ThemedText>
          <ThemedText style={styles.aboutText}>
            Third-year dual degree student at BITS Goa with an 8.0 CGPA, combining chemistry research with 
            cutting-edge technology. Building solutions that bridge the gap between science 
            and software, with a focus on mental health, sustainability, and innovation.
          </ThemedText>
        </TouchableOpacity>
        
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


      {/* Footer - Made Clickable */}
      <Animated.View entering={FadeInUp.delay(2500).springify()} style={styles.footer}>
        <TouchableOpacity onPress={handleModeratorNavigation}>
          <ThemedText style={[styles.footerText, styles.clickableFooter]}>
            "Building the future, one line of code at a time" ✨
          </ThemedText>
        </TouchableOpacity>
      </Animated.View>


      {/* Bottom Spacer */}
      <View style={{ height: 100 }} />
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  ...globalStyles,
  // Only index-specific overrides where necessary
  header: {
    ...globalStyles.header,
    alignItems: 'center' as const,
    paddingBottom: 40,
  },
  // Added style for clickable footer
  clickableFooter: {
    textDecorationLine: 'underline' as const,
    opacity: 0.8,
  },
});
