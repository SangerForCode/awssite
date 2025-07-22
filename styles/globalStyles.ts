import { StyleSheet } from 'react-native';

// Global color palette
export const COLORS = {
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

// Global styles that can be shared across components
export const globalStyles = StyleSheet.create({
  // Container and layout styles
  container: {
    flex: 1,
    backgroundColor: COLORS.dark,
  },

  // Header styles
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

  // Stats styles
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

  // Card styles
  card: {
    backgroundColor: COLORS.gray,
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 24,
    marginBottom: 32,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.white,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    color: COLORS.textLight,
    lineHeight: 24,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  cardContent: {
    padding: 20,
  },
  cardIcon: {
    fontSize: 24,
    marginRight: 16,
    marginTop: 2,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardDescription: {
    fontSize: 14,
    color: COLORS.textLight,
    lineHeight: 20,
  },

  // Animated card styles
  animatedCard: {
    backgroundColor: COLORS.gray,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },

  // Interactive elements
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
  },

  // Button styles
  button: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.white,
  },

  // Action button styles
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

  // Section styles
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.white,
    marginBottom: 16,
  },

  // Tag and badge styles
  tag: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    color: COLORS.white,
    fontWeight: '500',
  },
  tagContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
  },

  // List styles
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.accent,
    marginRight: 8,
  },
  listText: {
    fontSize: 14,
    color: COLORS.textLight,
  },

  // Social styles
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
  socialButton: {
    backgroundColor: COLORS.gray,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
  },

  // Footer styles
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

  // Floating element styles
  floatingElement: {
    position: 'absolute',
    zIndex: -1,
  },
  floatingEmoji: {
    fontSize: 50,
    opacity: 0.15,
  }
});

// Helper function to merge styles
export const mergeStyles = (...styles: any[]) => {
  return styles.reduce((merged, style) => ({ ...merged, ...style }), {});
};
