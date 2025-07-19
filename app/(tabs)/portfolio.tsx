import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Linking, Alert, ScrollView } from 'react-native';
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
  green: '#10B981',
  orange: '#F59E0B',
};

// Project Card Component
interface ProjectCardProps {
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  status: string;
  category: string;
  users?: string;
  demoUrl?: string;
  githubUrl?: string;
  delay?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  longDescription,
  technologies,
  status,
  category,
  users,
  demoUrl,
  githubUrl,
  delay = 0,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSpring(0.98, {}, () => {
      scale.value = withSpring(1);
    });
    setIsExpanded(!isExpanded);
  };

  const handleDemo = () => {
    if (demoUrl) {
      Linking.openURL(demoUrl).catch(() => {
        Alert.alert('Error', 'Could not open demo link');
      });
    } else {
      Alert.alert('Demo', 'Coming soon!');
    }
  };

  const handleGithub = () => {
    if (githubUrl) {
      Linking.openURL(githubUrl).catch(() => {
        Alert.alert('Error', 'Could not open GitHub link');
      });
    } else {
      Alert.alert('GitHub', 'Private repository');
    }
  };

  const getStatusColor = () => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'active':
        return COLORS.green;
      case 'in development':
      case 'ongoing':
        return COLORS.orange;
      default:
        return COLORS.accent;
    }
  };

  return (
    <Animated.View 
      entering={FadeInUp.delay(delay).springify()}
      style={[styles.projectCard, animatedStyle]}
    >
      <TouchableOpacity onPress={handlePress} style={styles.cardContent}>
        {/* Header */}
        <View style={styles.cardHeader}>
          <View style={styles.titleContainer}>
            <ThemedText style={styles.projectTitle}>{title}</ThemedText>
            <View style={styles.badgeContainer}>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
                <ThemedText style={styles.statusText}>{status}</ThemedText>
              </View>
              {users && (
                <View style={styles.usersBadge}>
                  <ThemedText style={styles.usersText}>{users}</ThemedText>
                </View>
              )}
            </View>
          </View>
          <View style={styles.expandIcon}>
            <ThemedText style={[styles.expandText, { color: COLORS.accent }]}>
              {isExpanded ? '−' : '+'}
            </ThemedText>
          </View>
        </View>

        {/* Description */}
        <ThemedText style={styles.projectDescription}>{description}</ThemedText>

        {/* Technologies */}
        <View style={styles.techContainer}>
          {technologies.slice(0, 3).map((tech, index) => (
            <View key={index} style={styles.techChip}>
              <ThemedText style={styles.techText}>{tech}</ThemedText>
            </View>
          ))}
          {technologies.length > 3 && (
            <View style={styles.techChip}>
              <ThemedText style={styles.techText}>+{technologies.length - 3}</ThemedText>
            </View>
          )}
        </View>

        {/* Expanded Content */}
        {isExpanded && (
          <Animated.View entering={FadeInDown.springify()} style={styles.expandedContent}>
            <ThemedText style={styles.longDescription}>{longDescription}</ThemedText>
            
            {/* All Technologies */}
            <View style={styles.allTechContainer}>
              <ThemedText style={styles.techTitle}>Technologies:</ThemedText>
              <View style={styles.allTechChips}>
                {technologies.map((tech, index) => (
                  <View key={index} style={styles.techChipSmall}>
                    <ThemedText style={styles.techTextSmall}>{tech}</ThemedText>
                  </View>
                ))}
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity onPress={handleDemo} style={[styles.actionButton, styles.demoButton]}>
                <ThemedText style={styles.actionButtonText}>Demo</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleGithub} style={[styles.actionButton, styles.githubButton]}>
                <ThemedText style={styles.actionButtonText}>Code</ThemedText>
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

// Stats Component
const Stats = () => {
  const stats = [
    { label: 'Projects', value: '8+' },
    { label: 'Users', value: '3.5K+' },
    { label: 'Tech Stack', value: '15+' },
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
export default function PortfolioScreen() {
  // Projects based on CV data
  const projects = [
    {
      title: 'BITS Pawn Shop',
      description: 'Campus resale platform connecting students across multiple BITS campuses.',
      longDescription: 'A comprehensive peer-to-peer trading platform built for BITS campuses. Features secure transactions, scalable architecture, and seamless UX. Expanded to Hyderabad, Pilani, and Dubai campuses.',
      technologies: ['Django', 'React', 'PostgreSQL', 'Cloud Hosting'],
      status: 'Active',
      category: 'Web Platform',
      users: '3.5K+ Users',
      demoUrl: 'https://bits-pilani.store/bypass',
      githubUrl: 'https://github.com/SangerForCode',
    },
    {
      title: 'Electrocatalysis ML Model',
      description: 'Machine learning model for evaluating transition metal complexes in catalyst discovery.',
      longDescription: 'Built a brute-force ML model to evaluate 18-electron rule compliance and predict stable transition metal complexes. Combines inorganic chemistry with regression and classification techniques.',
      technologies: ['Python', 'Scikit-learn', 'TensorFlow', 'Chempy'],
      status: 'Ongoing',
      category: 'Research',
      githubUrl: 'https://github.com/SangerForCode',
    },
    {
      title: 'FITSOC Fitness App',
      description: 'Application guiding users on proper gym equipment form to reduce injury risk.',
      longDescription: 'Developing a comprehensive fitness application that provides real-time guidance on proper gym equipment form. Focus on injury prevention and workout efficiency through proper technique guidance.',
      technologies: ['React Native', 'TensorFlow', 'Computer Vision', 'Firebase'],
      status: 'In Development',
      category: 'Mobile App',
    },
    {
      title: 'Algorithmic Trading System',
      description: 'Developing automated trading bots for stock market analysis and strategy execution.',
      longDescription: 'Building sophisticated trading algorithms for stock and forex markets. Implements quantitative finance strategies with real-time market analysis and automated execution.',
      technologies: ['Python', 'Algotest', 'NumPy', 'Pandas'],
      status: 'Active',
      category: 'FinTech',
    },
    {
      title: 'Samvardhan Greenfields Website',
      description: 'Full-stack web development and brand building for agricultural company.',
      longDescription: 'Improved and maintained company website with refreshed tech stack. Supported brand-building through content design and social media integration.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Adobe Suite'],
      status: 'Completed',
      category: 'Web Development',
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Animated.View entering={FadeInUp.springify()} style={styles.header}>
        <ThemedText style={styles.headerTitle}>Portfolio</ThemedText>
        <ThemedText style={styles.headerSubtitle}>Building at the intersection of chemistry and code</ThemedText>
      </Animated.View>

      {/* Stats */}
      <Stats />

      {/* About Card */}
      <Animated.View entering={FadeInUp.delay(400).springify()} style={styles.aboutCard}>
        <ThemedText style={styles.aboutTitle}>What I Build</ThemedText>
        <ThemedText style={styles.aboutText}>
          From campus platforms to research tools, I create solutions that combine scientific thinking with modern technology. Currently focused on mental health, trading systems, and ML applications in chemistry.
        </ThemedText>
        <View style={styles.skillsContainer}>
          <View style={styles.skillCategory}>
            <ThemedText style={styles.skillCategoryTitle}>Development</ThemedText>
            <ThemedText style={styles.skillCategoryText}>React • Django • React Native</ThemedText>
          </View>
          <View style={styles.skillCategory}>
            <ThemedText style={styles.skillCategoryTitle}>Data Science</ThemedText>
            <ThemedText style={styles.skillCategoryText}>Python • TensorFlow • ML</ThemedText>
          </View>
          <View style={styles.skillCategory}>
            <ThemedText style={styles.skillCategoryTitle}>Research</ThemedText>
            <ThemedText style={styles.skillCategoryText}>Chemistry • Publications • Innovation</ThemedText>
          </View>
        </View>
      </Animated.View>

      {/* Projects */}
      <View style={styles.projectsSection}>
        <Animated.View entering={FadeInUp.delay(600).springify()}>
          <ThemedText style={styles.sectionTitle}>Featured Projects</ThemedText>
        </Animated.View>
        
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            {...project}
            delay={800 + index * 100}
          />
        ))}
      </View>

      {/* CTA */}
      <Animated.View entering={FadeInUp.delay(1400).springify()} style={styles.ctaSection}>
        <View style={styles.ctaContent}>
          <ThemedText style={styles.ctaEmoji}>🚀</ThemedText>
          <ThemedText style={styles.ctaTitle}>Let's Build Together</ThemedText>
          <ThemedText style={styles.ctaText}>
            Got an idea? Let's turn it into reality with clean code and innovative solutions.
          </ThemedText>
          <TouchableOpacity 
            style={styles.ctaButton}
            onPress={() => {
              Linking.openURL('https://calendly.com/f20230742-goa').catch(() => {
                Alert.alert('Error', 'Could not open scheduling link');
              });
            }}
          >
            <ThemedText style={styles.ctaButtonText}>Schedule a Call</ThemedText>
          </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: '600',
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
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.white,
    marginBottom: 8,
  },
  aboutText: {
    fontSize: 16,
    color: COLORS.textLight,
    lineHeight: 24,
    marginBottom: 20,
  },
  skillsContainer: {
    gap: 12,
  },
  skillCategory: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skillCategoryTitle: {
    fontSize: 14,
    color: COLORS.accent,
    fontWeight: '600',
  },
  skillCategoryText: {
    fontSize: 12,
    color: COLORS.text,
  },

  // Projects Section
  projectsSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.white,
    marginBottom: 24,
  },

  // Project Cards
  projectCard: {
    backgroundColor: COLORS.gray,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  cardContent: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.white,
    marginBottom: 8,
  },
  badgeContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    color: COLORS.white,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  usersBadge: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  usersText: {
    fontSize: 10,
    color: COLORS.white,
    fontWeight: '600',
  },
  expandIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: `${COLORS.accent}20`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  expandText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  projectDescription: {
    fontSize: 14,
    color: COLORS.textLight,
    lineHeight: 20,
    marginBottom: 16,
  },

  // Tech Chips
  techContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  techChip: {
    backgroundColor: `${COLORS.accent}20`,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  techText: {
    fontSize: 12,
    color: COLORS.accent,
    fontWeight: '500',
  },

  // Expanded Content
  expandedContent: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: `${COLORS.text}20`,
  },
  longDescription: {
    fontSize: 14,
    color: COLORS.textLight,
    lineHeight: 20,
    marginBottom: 16,
  },
  allTechContainer: {
    marginBottom: 16,
  },
  techTitle: {
    fontSize: 14,
    color: COLORS.white,
    fontWeight: '600',
    marginBottom: 8,
  },
  allTechChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  techChipSmall: {
    backgroundColor: `${COLORS.text}20`,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
  },
  techTextSmall: {
    fontSize: 10,
    color: COLORS.textLight,
  },

  // Action Buttons
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  demoButton: {
    backgroundColor: COLORS.accent,
  },
  githubButton: {
    backgroundColor: COLORS.text,
  },
  actionButtonText: {
    fontSize: 14,
    color: COLORS.white,
    fontWeight: '600',
  },

  // CTA Section
  ctaSection: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  ctaContent: {
    alignItems: 'center',
    backgroundColor: COLORS.gray,
    borderRadius: 16,
    padding: 32,
  },
  ctaEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.white,
    marginBottom: 12,
  },
  ctaText: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  ctaButton: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  ctaButtonText: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: '600',
  },
});
