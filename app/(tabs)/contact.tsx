import React from 'react';
import { StyleSheet, TouchableOpacity, Linking, Alert, ScrollView, View } from 'react-native';
import Animated, {
  FadeInDown,
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Minimal Color Palette
const COLORS = {
  dark: '#0A0A0A',
  gray: '#1A1A1A', 
  light: '#F5F5F5',
  white: '#FFFFFF',
  accent: '#6366F1',
  text: '#888888',
  textLight: '#CCCCCC',
};

// Contact Card Component
interface ContactCardProps {
  icon: string;
  title: string;
  description: string;
  actionText: string;
  onPress: () => void;
  delay?: number;
}

const ContactCard: React.FC<ContactCardProps> = ({
  icon,
  title,
  description,
  actionText,
  onPress,
  delay = 0,
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSpring(0.95, {}, () => {
      scale.value = withSpring(1);
    });
    onPress();
  };

  return (
    <Animated.View 
      entering={FadeInUp.delay(delay).springify()}
      style={[styles.contactCard, animatedStyle]}
    >
      <TouchableOpacity onPress={handlePress} style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <ThemedText style={styles.cardIcon}>{icon}</ThemedText>
          <View style={styles.cardTextContainer}>
            <ThemedText style={styles.cardTitle}>{title}</ThemedText>
            <ThemedText style={styles.cardDescription}>{description}</ThemedText>
          </View>
        </View>
        <View style={styles.actionButton}>
          <ThemedText style={styles.actionText}>{actionText}</ThemedText>
          <ThemedText style={styles.arrow}>→</ThemedText>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

// Social Link Component
interface SocialLinkProps {
  platform: string;
  handle: string;
  url: string;
  delay?: number;
}

const SocialLink: React.FC<SocialLinkProps> = ({
  platform,
  handle,
  url,
  delay = 0,
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSpring(0.95, {}, () => {
      scale.value = withSpring(1);
    });
    
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Could not open link');
    });
  };

  return (
    <Animated.View 
      entering={FadeInDown.delay(delay).springify()}
      style={[styles.socialLink, animatedStyle]}
    >
      <TouchableOpacity onPress={handlePress} style={styles.socialContent}>
        <ThemedText style={styles.socialPlatform}>{platform}</ThemedText>
        <ThemedText style={styles.socialHandle}>{handle}</ThemedText>
      </TouchableOpacity>
    </Animated.View>
  );
};

// Main Component
export default function ContactScreen() {
  const handleSocialLink = (url: string) => {
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Could not open link');
    });
  };

  const contactMethods = [
    {
      icon: '📅',
      title: 'Schedule a Meeting',
      description: 'Book a time that works for both of us',
      actionText: 'Open Calendar',
      onPress: () => handleSocialLink('https://calendly.com/f20230742-goa'),
    },
    {
      icon: '💼',
      title: 'Professional Network',
      description: 'Connect with me on LinkedIn',
      actionText: 'View Profile',
      onPress: () => handleSocialLink('https://www.linkedin.com/in/ayushsanger/'),
    },
    {
      icon: '📸',
      title: 'Behind the Scenes',
      description: 'Follow my journey on Instagram',
      actionText: 'Follow Me',
      onPress: () => handleSocialLink('https://www.instagram.com/sanger_ayush'),
    },
  ];

  const socialLinks = [
    {
      platform: 'LinkedIn',
      handle: '@ayushsanger',
      url: 'https://www.linkedin.com/in/ayushsanger/',
    },
    {
      platform: 'Instagram',
      handle: '@sanger_ayush',
      url: 'https://www.instagram.com/sanger_ayush',
    },
    {
      platform: 'Calendly',
      handle: 'Schedule Meeting',
      url: 'https://calendly.com/f20230742-goa',
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Animated.View entering={FadeInUp.springify()} style={styles.header}>
        <ThemedText style={styles.headerTitle}>Contact</ThemedText>
        <ThemedText style={styles.headerSubtitle}>Let's build something together</ThemedText>
      </Animated.View>

      {/* Intro Card */}
      <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.introCard}>
        <ThemedText style={styles.introTitle}>Always open to connect</ThemedText>
        <ThemedText style={styles.introText}>
          Whether it's about tech, research, entrepreneurship, or just a friendly chat about life and growth.
        </ThemedText>
      </Animated.View>

      {/* Contact Methods */}
      <View style={styles.contactSection}>
        {contactMethods.map((method, index) => (
          <ContactCard
            key={index}
            {...method}
            delay={400 + index * 100}
          />
        ))}
      </View>

      {/* Quick Links */}
      <Animated.View entering={FadeInUp.delay(800).springify()} style={styles.quickLinksSection}>
        <ThemedText style={styles.sectionTitle}>Quick Links</ThemedText>
        <View style={styles.socialLinksContainer}>
          {socialLinks.map((social, index) => (
            <SocialLink
              key={index}
              {...social}
              delay={900 + index * 100}
            />
          ))}
        </View>
      </Animated.View>

      {/* Footer */}
      <Animated.View entering={FadeInUp.delay(1200).springify()} style={styles.footer}>
        <View style={styles.footerContent}>
          <ThemedText style={styles.footerEmoji}>✨</ThemedText>
          <ThemedText style={styles.footerText}>
            Looking forward to hearing from you!
          </ThemedText>
        </View>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark,
  },

  // Header
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 32,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: COLORS.text,
  },

  // Intro Card
  introCard: {
    marginHorizontal: 24,
    marginBottom: 32,
    backgroundColor: COLORS.gray,
    borderRadius: 16,
    padding: 24,
  },
  introTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.white,
    marginBottom: 8,
  },
  introText: {
    fontSize: 16,
    color: COLORS.textLight,
    lineHeight: 24,
  },

  // Contact Methods
  contactSection: {
    paddingHorizontal: 24,
    gap: 16,
    marginBottom: 32,
  },
  contactCard: {
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
  cardIcon: {
    fontSize: 24,
    marginRight: 16,
    marginTop: 2,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.white,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: COLORS.textLight,
    lineHeight: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.accent,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.white,
  },
  arrow: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: 'bold',
  },

  // Quick Links Section
  quickLinksSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.white,
    marginBottom: 16,
  },
  socialLinksContainer: {
    gap: 12,
  },
  socialLink: {
    backgroundColor: COLORS.gray,
    borderRadius: 12,
    overflow: 'hidden',
  },
  socialContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  socialPlatform: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
  },
  socialHandle: {
    fontSize: 14,
    color: COLORS.text,
  },

  // Footer
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  footerContent: {
    alignItems: 'center',
    backgroundColor: COLORS.gray,
    borderRadius: 16,
    padding: 24,
  },
  footerEmoji: {
    fontSize: 32,
    marginBottom: 12,
  },
  footerText: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
  },
});
