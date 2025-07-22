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
import { globalStyles, COLORS } from '@/styles/globalStyles';

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

      {/* Bottom Spacer */}
      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

// Page-specific styles extending global styles
const styles = StyleSheet.create({
  ...globalStyles,
  
  // Specific styles for the contact page
  introCard: {
    ...globalStyles.card,
  },
  introTitle: {
    ...globalStyles.cardTitle,
  },
  introText: {
    ...globalStyles.cardText,
  },

  contactSection: {
    ...globalStyles.section,
    gap: 16,
  },
  contactCard: {
    ...globalStyles.interactiveCard,
  },

  // Specific card description style
  cardDescription: {
    fontSize: 14,
    color: COLORS.textLight,
    lineHeight: 20,
  },

  quickLinksSection: {
    ...globalStyles.section,
  }
});
