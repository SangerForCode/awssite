import React, { useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Linking,
  Alert,
  ScrollView,
  Dimensions,
  Image,
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
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

// Enhanced Project Card Component
interface ProjectCardProps {
  title: string;
  description: string;
  metric: string;
  icon: string;
  color: string;
  delay?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  metric,
  icon,
  color,
  delay = 0,
}) => {
  const scale = useSharedValue(1);
  const rotateY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotateY: `${rotateY.value}deg` },
    ],
  }));

  const handlePress = () => {
    scale.value = withSpring(0.95, {}, () => {
      scale.value = withSpring(1);
    });
    rotateY.value = withTiming(10, { duration: 150 }, () => {
      rotateY.value = withTiming(0, { duration: 150 });
    });
  };

  return (
    <Animated.View 
      entering={FadeInUp.delay(delay).springify()}
      style={[styles.projectCard, animatedStyle]}
    >
      <TouchableOpacity onPress={handlePress} style={styles.projectContent}>
        <View style={styles.projectHeader}>
          <View style={[styles.iconContainer, { backgroundColor: `${color}20`, borderColor: color }]}>
            <ThemedText style={styles.projectIcon}>{icon}</ThemedText>
          </View>
          <View style={styles.projectInfo}>
            <ThemedText style={[styles.projectTitle, { color }]}>{title}</ThemedText>
            <ThemedText style={styles.projectDescription}>{description}</ThemedText>
          </View>
        </View>
        <View style={[styles.metricContainer, { backgroundColor: `${color}10` }]}>
          <ThemedText style={[styles.projectMetric, { color }]}>{metric}</ThemedText>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

// Photo Gallery Component
const PhotoGallery = () => {
  const photos = [
    require('../../assets/Photos/1.jpg'),
    require('../../assets/Photos/2.jpg'),
    require('../../assets/Photos/3.jpg'),
  ];

  return (
    <Animated.View entering={FadeInUp.delay(500).springify()} style={styles.photoGallery}>
      {/* <ThemedText style={styles.photoTitle}>Meet Ayush</ThemedText> */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.photoScrollContainer}
      >
        {/* {photos.map((photo, index) => (
          <Animated.View 
            key={index}
            entering={FadeInUp.delay(600 + index * 100).springify()}
            style={styles.photoWrapper}
          >
            <Image source={photo} style={styles.profilePhoto} resizeMode="cover" />
          </Animated.View>
        ))} */}
      </ScrollView>
    </Animated.View>
  );
};

// Enhanced Floating Element Component
interface FloatingElementProps {
  emoji: string;
  style: any;
}

const FloatingElement: React.FC<FloatingElementProps> = ({ emoji, style }) => {
  const translateY = useSharedValue(0);
  const rotate = useSharedValue(0);

  useEffect(() => {
    translateY.value = withRepeat(
      withTiming(-12, { duration: 3500, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
    rotate.value = withRepeat(
      withTiming(360, { duration: 8000, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { rotate: `${rotate.value}deg` }
    ],
  }));

  return (
    <Animated.View style={[style, animatedStyle]}>
      <ThemedText style={styles.floatingEmoji}>{emoji}</ThemedText>
    </Animated.View>
  );
};

// Enhanced Stats Component with Gradient
const Stats = () => {
  const stats = [
    { label: 'CGPA', value: '8+', color: COLORS.accent },
    { label: 'Users', value: '4K+', color: COLORS.green },
    { label: 'Research', value: 'M.A.C+CHEM', color: COLORS.purple },
    { label: 'Year', value: '3rd', color: COLORS.blue },
  ];

  return (
    <Animated.View entering={FadeInDown.delay(400).springify()} style={styles.statsContainer}>
      {stats.map((stat, index) => (
        <Animated.View 
          key={index}
          entering={FadeInUp.delay(500 + index * 100).springify()}
          style={[styles.statItem, { borderLeftColor: stat.color }]}
        >
          <ThemedText style={[styles.statValue, { color: stat.color }]}>{stat.value}</ThemedText>
          <ThemedText style={styles.statLabel}>{stat.label}</ThemedText>
        </Animated.View>
      ))}
    </Animated.View>
  );
};

// Enhanced Social Button Component
interface SocialButtonProps {
  label: string;
  url: string;
  icon: string;
  delay?: number;
}

const SocialButton: React.FC<SocialButtonProps> = ({ label, url, icon, delay = 0 }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSpring(0.9, {}, () => {
      scale.value = withSpring(1);
    });
    
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Could not open link');
    });
  };

  return (
    <Animated.View entering={FadeInUp.delay(delay).springify()} style={animatedStyle}>
      <TouchableOpacity onPress={handlePress} style={styles.socialButton}>
        <ThemedText style={styles.socialIcon}>{icon}</ThemedText>
        <ThemedText style={styles.socialButtonText}>{label}</ThemedText>
      </TouchableOpacity>
    </Animated.View>
  );
};

// Main Component
export default function IndexScreen() {
  const waveAnimation = useSharedValue(0);
  const router = useRouter();

  useEffect(() => {
    waveAnimation.value = withRepeat(
      withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const waveStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${waveAnimation.value * 20 - 10}deg` }],
  }));

  const handleModeratorNavigation = () => {
    router.push('/moderator');
  };

  const projectData = [
    {
      title: 'BITS Student Store',
      description: 'Campus marketplace revolutionizing student trading. Present in all 4 campuses.',
      metric: '4000+ active users',
      icon: '🛒',
      color: COLORS.accent,
    },
    {
      title: 'ML Research',
      description: 'Electrocatalyst discovery with Chemistry HOD',
      metric: 'Co-authoring paper',
      icon: '🧬',
      color: COLORS.purple,
    },
    {
      title: 'Leadership Excellence',
      description: 'Chief Coordinator FitSoc & Sports Board Head',
      metric: '80+ team members',
      icon: '👑',
      color: COLORS.green,
    },
    
  ];

  const socialLinks = [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/ayushsanger/', icon: '💼' },
    { label: 'GitHub', url: 'https://github.com/SangerForCode', icon: '⚡' },
    { label: 'Schedule', url: 'https://calendly.com/f20230742-goa', icon: '📅' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Enhanced Floating Elements */}
      <FloatingElement emoji="⚗️" style={styles.float1} />
      <FloatingElement emoji="💻" style={styles.float2} />
      <FloatingElement emoji="🚀" style={styles.float3} />
      <FloatingElement emoji="📱" style={styles.float4} />

      {/* Header with Gradient Effect */}
      <Animated.View entering={FadeInUp.springify()} style={styles.header}>
        <View style={styles.headerGradient}>
          <View style={styles.nameContainer}>
            <ThemedText style={styles.firstName}>Ayush</ThemedText>
            <ThemedText style={styles.lastName}>Sanger</ThemedText>
            <Animated.View style={[styles.waveContainer, waveStyle]}>
              <ThemedText style={styles.wave}>👋</ThemedText>
            </Animated.View>
          </View>
          <ThemedText style={styles.tagline}>
            🧬 Chemistry • 💻 Code • 🚀 Innovation
          </ThemedText>
          <ThemedText style={styles.location}>📍 BITS Pilani, Goa Campus</ThemedText>
        </View>
      </Animated.View>

      {/* Photo Gallery */}
      <PhotoGallery />

      {/* Enhanced Stats */}
      <Stats />

      {/* About Section with Better Design */}
      <Animated.View entering={FadeInUp.delay(700).springify()} style={styles.aboutCard}>
        <View style={styles.aboutHeader}>
          <ThemedText style={styles.aboutTitle}>Dual Degree Scholar</ThemedText>
          <ThemedText style={styles.aboutEmoji}>🎓</ThemedText>
        </View>
        <ThemedText style={styles.aboutText}>
          <ThemedText style={styles.highlight}>M.Sc. Chemistry</ThemedText> + <ThemedText style={styles.highlight}>B.E. Mathematics & Computing</ThemedText>
          {'\n\n'}
          Building solutions at the intersection of molecular science and machine learning, 
          with focus on sustainable technology and campus innovation.
        </ThemedText>
      </Animated.View>

      {/* Enhanced Projects Grid */}
      <View style={styles.projectsSection}>
        <ThemedText style={styles.sectionTitle}>🌟 Key Projects</ThemedText>
        {projectData.map((project, index) => (
          <ProjectCard
            key={index}
            {...project}
            delay={900 + index * 100}
          />
        ))}
      </View>

      {/* Enhanced Tech Stack */}
      <Animated.View entering={FadeInUp.delay(1300).springify()} style={styles.techStackCard}>
        <View style={styles.techHeader}>
          <ThemedText onPress={handleModeratorNavigation} style={styles.techTitle}>💻 Tech Arsenal</ThemedText>
        </View>
        <View style={styles.techGrid}>
          <View style={styles.techCategory}>
            <ThemedText style={styles.techCategoryTitle}>🔥 Frontend</ThemedText>
            <View style={styles.techTags}>
              <View style={styles.techTag}><ThemedText style={styles.techTagText}>React.js</ThemedText></View>
              <View style={styles.techTag}><ThemedText style={styles.techTagText}>React Native</ThemedText></View>
              <View style={styles.techTag}><ThemedText style={styles.techTagText}>JavaScript</ThemedText></View>
            </View>
          </View>
          <View style={styles.techCategory}>
            <ThemedText style={styles.techCategoryTitle}>⚡ Backend</ThemedText>
            <View style={styles.techTags}>
              <View style={styles.techTag}><ThemedText style={styles.techTagText}>Python</ThemedText></View>
              <View style={styles.techTag}><ThemedText style={styles.techTagText}>Django</ThemedText></View>
              <View style={styles.techTag}><ThemedText style={styles.techTagText}>Flask</ThemedText></View>
            </View>
          </View>
          <View style={styles.techCategory}>
            <ThemedText style={styles.techCategoryTitle}>🤖 AI/ML</ThemedText>
            <View style={styles.techTags}>
              <View style={styles.techTag}><ThemedText style={styles.techTagText}>TensorFlow</ThemedText></View>
              <View style={styles.techTag}><ThemedText style={styles.techTagText}>Scikit-learn</ThemedText></View>
              <View style={styles.techTag}><ThemedText style={styles.techTagText}>Pandas</ThemedText></View>
            </View>
          </View>
        </View>
      </Animated.View>

      {/* Enhanced Social Section */}
      <Animated.View entering={FadeInUp.delay(1500).springify()} style={styles.socialSection}>
        <ThemedText style={styles.socialTitle}>🤝 Let's Connect</ThemedText>
        <View style={styles.socialButtons}>
          {socialLinks.map((link, index) => (
            <SocialButton
              key={index}
              {...link}
              delay={1700 + index * 100}
            />
          ))}
        </View>
      </Animated.View>

      {/* Enhanced Footer */}
      <Animated.View entering={FadeInUp.delay(1900).springify()} style={styles.footer}>
  <TouchableOpacity style={styles.footerButton} onPress={() => {
    const instaUrl = 'https://www.instagram.com/sanger_ayush';
    Linking.openURL(instaUrl).catch(() => {
      Alert.alert('Error', 'Could not open Instagram profile.');
    });
  }}>
    <ThemedText style={styles.footerEmail}>📸 @sanger_ayush</ThemedText>
    <ThemedText style={styles.footerSubtext}>Tap to connect on Instagram</ThemedText>
  </TouchableOpacity>
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

  // Enhanced Header Styles
  header: {
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 60,
    paddingBottom: 20,
  },

  headerGradient: {
    alignItems: 'center',
    padding: 24,
    borderRadius: 20,
    backgroundColor: `${COLORS.accent}05`,
    borderWidth: 1,
    borderColor: `${COLORS.accent}20`,
  },

  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  firstName: {
    fontSize: 38,
    fontWeight: '300',
    color: COLORS.white,
    marginRight: 8,
  },

  lastName: {
    fontSize: 38,
    fontWeight: '700',
    color: COLORS.accent,
    marginRight: 12,
  },

  waveContainer: {
    marginLeft: 8,
  },

  wave: {
    fontSize: 34,
  },

  tagline: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 0.5,
  },

  location: {
    fontSize: 14,
    color: COLORS.textLight,
    opacity: 0.8,
  },

  // Photo Gallery Styles
  photoGallery: {
    paddingVertical: 20,
    marginBottom: 20,
  },

  photoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: 16,
  },

  photoScrollContainer: {
    paddingHorizontal: 32,
    gap: 16,
  },

  photoWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: COLORS.accent,
  },

  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 14,
  },

  // Enhanced Stats
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 32,
    paddingVertical: 20,
    marginBottom: 30,
  },

  statItem: {
    alignItems: 'center',
    paddingLeft: 12,
    borderLeftWidth: 3,
  },

  statValue: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },

  statLabel: {
    fontSize: 11,
    color: COLORS.textLight,
    textAlign: 'center',
  },

  // Enhanced About Card
  aboutCard: {
    backgroundColor: COLORS.gray,
    borderRadius: 20,
    padding: 28,
    marginHorizontal: 32,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: `${COLORS.accent}20`,
  },

  aboutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },

  aboutTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: COLORS.white,
    marginRight: 8,
  },

  aboutEmoji: {
    fontSize: 24,
  },

  aboutText: {
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.textLight,
    textAlign: 'center',
  },

  highlight: {
    color: COLORS.accent,
    fontWeight: '600',
  },

  // Enhanced Projects
  projectsSection: {
    paddingHorizontal: 32,
    marginBottom: 30,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.white,
    marginBottom: 20,
    textAlign: 'center',
  },

  projectCard: {
    backgroundColor: COLORS.gray,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: `${COLORS.accent}10`,
  },

  projectContent: {
    padding: 20,
  },

  projectHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 2,
  },

  projectIcon: {
    fontSize: 26,
  },

  projectInfo: {
    flex: 1,
  },

  projectTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },

  projectDescription: {
    fontSize: 13,
    color: COLORS.textLight,
    lineHeight: 18,
  },

  metricContainer: {
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },

  projectMetric: {
    fontSize: 14,
    fontWeight: '600',
  },

  // Enhanced Tech Stack
  techStackCard: {
    backgroundColor: COLORS.gray,
    borderRadius: 20,
    padding: 28,
    marginHorizontal: 32,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: `${COLORS.accent}20`,
  },

  techHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },

  techTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.white,
  },

  techGrid: {
    gap: 16,
  },

  techCategory: {
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: `${COLORS.accent}10`,
  },

  techCategoryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.accent,
    marginBottom: 12,
  },

  techTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  techTag: {
    backgroundColor: `${COLORS.accent}15`,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: `${COLORS.accent}30`,
  },

  techTagText: {
    fontSize: 12,
    color: COLORS.accent,
    fontWeight: '500',
  },

  // Enhanced Social Section
  socialSection: {
    paddingHorizontal: 32,
    marginBottom: 30,
  },

  socialTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.white,
    marginBottom: 20,
    textAlign: 'center',
  },

  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 12,
  },

  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: COLORS.accent,
  },

  socialIcon: {
    fontSize: 16,
    marginRight: 8,
  },

  socialButtonText: {
    fontSize: 14,
    color: COLORS.accent,
    fontWeight: '500',
  },

  // Enhanced Footer
  footer: {
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 20,
  },

  footerButton: {
    alignItems: 'center',
    backgroundColor: COLORS.gray,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: `${COLORS.accent}20`,
  },

  footerEmail: {
    fontSize: 14,
    color: COLORS.accent,
    fontWeight: '600',
    marginBottom: 4,
  },

  footerSubtext: {
    fontSize: 11,
    color: COLORS.textLight,
    opacity: 0.7,
  },

  // Enhanced Floating Elements
  float1: {
    position: 'absolute',
    top: 140,
    left: 20,
    zIndex: 0,
  },

  float2: {
    position: 'absolute',
    top: 220,
    right: 30,
    zIndex: 0,
  },

  float3: {
    position: 'absolute',
    top: 400,
    left: 40,
    zIndex: 0,
  },

  float4: {
    position: 'absolute',
    top: 600,
    right: 20,
    zIndex: 0,
  },

  floatingEmoji: {
    fontSize: 28,
    opacity: 0.4,
  },
});
