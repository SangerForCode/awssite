import { ThemedText } from '@/components/ThemedText';
import { COLORS, globalStyles } from '@/styles/globalStyles';
import { FontAwesome } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { Alert, Linking, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

// Contact Card Component
interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionText: string;
  onPress: () => void;
  delay?: number;
  info?: React.ReactNode;
}

const ContactCard: React.FC<ContactCardProps> = ({
  icon,
  title,
  description,
  actionText,
  onPress,
  delay = 0,
  info,
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
      {info && <View style={styles.cardInfo}>{info}</View>}
      <TouchableOpacity onPress={handlePress} style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <View style={styles.cardIcon}>{icon}</View>
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
      icon: <MaterialIcons name="email" size={32} color={COLORS.accent} />, // Gmail
      title: 'Contact by Email',
      description: 'Send me an email directly',
      actionText: 'Draft Email',
      onPress: () => {
        Linking.openURL('mailto:ayush@ayushsanger.info?subject=Hello%20Ayush').catch(() => {
          Alert.alert('Error', 'Could not open the mail client.');
        });
      },
      info: (
        <View style={styles.infoRow}>
          <MaterialIcons name="email" size={18} color={COLORS.accent} />
          <ThemedText style={styles.infoText}>ayush@ayushsanger.info</ThemedText>
        </View>
      ),
    },
    {
      icon: <FontAwesome name="calendar" size={32} color={COLORS.accent} />, // Calendar
      title: 'Schedule a Meeting',
      description: 'Book a time that works for both of us',
      actionText: 'Open Calendar',
      onPress: () => handleSocialLink('https://calendly.com/f20230742-goa'),
    },
    {
      icon: <FontAwesome name="linkedin-square" size={32} color={COLORS.accent} />, // LinkedIn
      title: 'Professional Network',
      description: 'Connect with me on LinkedIn',
      actionText: 'View Profile',
      onPress: () => handleSocialLink('https://www.linkedin.com/in/ayushsanger/'),
      info: (
        <View style={styles.infoRow}>
          <FontAwesome name="linkedin-square" size={18} color={COLORS.accent} />
          <ThemedText style={styles.infoText}>@ayushsanger</ThemedText>
        </View>
      ),
    },
    {
      icon: <FontAwesome name="instagram" size={32} color={COLORS.accent} />, // Instagram
      title: 'Behind the Scenes',
      description: 'Follow my journey on Instagram',
      actionText: 'Follow Me',
      onPress: () => handleSocialLink('https://www.instagram.com/sanger_ayush'),
      info: (
        <View style={styles.infoRow}>
          <FontAwesome name="instagram" size={18} color={COLORS.accent} />
          <ThemedText style={styles.infoText}>@sanger_ayush</ThemedText>
        </View>
      ),
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
    ...globalStyles.animatedCard,
  },

  // Specific card description style
  cardDescription: {
    fontSize: 14,
    color: COLORS.textLight,
    lineHeight: 20,
  },

  quickLinksSection: {
    ...globalStyles.section,
  },
  profileSection: {
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 10,
    backgroundColor: COLORS.gray,
    borderRadius: 16,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 6,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  profileDetail: {
    fontSize: 15,
    color: COLORS.textLight,
    marginLeft: 8,
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginLeft: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 15,
    color: COLORS.textLight,
    marginLeft: 8,
  },
});
