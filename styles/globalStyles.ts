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
  },
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

  // Home page specific styles
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

  // Current work section
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

  // Cards grid
  cardsGrid: {
    paddingHorizontal: 24,
    gap: 16,
    marginBottom: 32,
  },
  detailsContainer: {
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: COLORS.textLight,
    flex: 1,
  },
  bullet: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginRight: 12,
  },

  // Social section styles
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

  // Project specific styles
  projectsSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  projectCard: {
    backgroundColor: COLORS.gray,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
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
  projectTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.white,
    marginBottom: 8,
  },
  projectDescription: {
    fontSize: 14,
    color: COLORS.textLight,
    lineHeight: 20,
    marginBottom: 16,
  },

  // Tech styles
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

  // About styles
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

  // Skills styles
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

  // CTA styles
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
  }
});

// Helper function to merge styles
export const mergeStyles = (...styles: any[]) => {
  return styles.reduce((merged, style) => ({ ...merged, ...style }), {});
};
