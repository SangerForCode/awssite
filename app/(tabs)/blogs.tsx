import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import Animated, {
  FadeInDown,
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { ThemedText } from '@/components/ThemedText';
import { globalStyles, COLORS } from '@/styles/globalStyles';

// Blog Post Interface
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  publishDate: string;
  tags: string[];
  featured?: boolean;
}

// Blog Category Component
interface CategoryChipProps {
  category: string;
  isActive: boolean;
  onPress: () => void;
  delay?: number;
}

const CategoryChip: React.FC<CategoryChipProps> = ({ category, isActive, onPress, delay = 0 }) => {
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
    <Animated.View entering={FadeInUp.delay(delay).springify()} style={animatedStyle}>
      <TouchableOpacity
        onPress={handlePress}
        style={[
          globalStyles.tag,
          { backgroundColor: isActive ? COLORS.accent : COLORS.gray, marginRight: 8 }
        ]}
      >
        <ThemedText style={[
          globalStyles.tagText,
          !isActive && { color: COLORS.textLight }
        ]}>
          {category}
        </ThemedText>
      </TouchableOpacity>
    </Animated.View>
  );
};

// Featured Blog Card Component
interface FeaturedBlogCardProps {
  post: BlogPost;
  onPress: () => void;
  delay?: number;
}

const FeaturedBlogCard: React.FC<FeaturedBlogCardProps> = ({ post, onPress, delay = 0 }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSpring(0.98, {}, () => {
      scale.value = withSpring(1);
    });
    onPress();
  };

  const getCategoryColor = (category: string): string => {
    const colors: { [key: string]: string } = {
      'Tech': COLORS.blue,
      'Research': COLORS.purple,
      'Personal Growth': COLORS.green,
      'Entrepreneurship': COLORS.orange,
      'Mental Health': COLORS.accent,
    };
    return colors[category] || COLORS.accent;
  };

  return (
    <Animated.View entering={FadeInUp.delay(delay).springify()} style={animatedStyle}>
      <TouchableOpacity onPress={handlePress} style={[globalStyles.card, { borderWidth: 2, borderColor: COLORS.accent, position: 'relative' }]}>
        <View style={[globalStyles.badge, { backgroundColor: COLORS.accent, position: 'absolute', top: -12, right: 0, zIndex: 1 }]}>
          <ThemedText style={[globalStyles.badgeText, { color: COLORS.white }]}>Featured</ThemedText>
        </View>
        
        <View style={globalStyles.cardHeader}>
          <View style={[globalStyles.badge, { backgroundColor: getCategoryColor(post.category) }]}>
            <ThemedText style={[globalStyles.badgeText, { color: COLORS.white }]}>{post.category}</ThemedText>
          </View>
          <ThemedText style={[globalStyles.badgeText, { color: COLORS.text }]}>{post.readTime} read</ThemedText>
        </View>

        <ThemedText style={[globalStyles.cardTitle, { fontSize: 22, lineHeight: 28 }]}>{post.title}</ThemedText>
        <ThemedText style={[globalStyles.cardText, { marginBottom: 20 }]}>{post.excerpt}</ThemedText>
        
        <View style={globalStyles.tagContainer}>
          {post.tags.slice(0, 4).map((tag, index) => (
            <View key={index} style={[globalStyles.badge, { backgroundColor: `${COLORS.text}30` }]}>
              <ThemedText style={[globalStyles.badgeText, { color: COLORS.textLight }]}>#{tag}</ThemedText>
            </View>
          ))}
        </View>

        <View style={[globalStyles.cardHeader, { marginTop: 16, marginBottom: 0 }]}>
          <ThemedText style={[globalStyles.badgeText, { color: COLORS.text }]}>{post.publishDate}</ThemedText>
          <View style={globalStyles.actionButton}>
            <ThemedText style={globalStyles.actionText}>Read More</ThemedText>
            <ThemedText style={globalStyles.arrow}>→</ThemedText>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

// Regular Blog Card Component
interface BlogCardProps {
  post: BlogPost;
  onPress: () => void;
  delay?: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, onPress, delay = 0 }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSpring(0.98, {}, () => {
      scale.value = withSpring(1);
    });
    onPress();
  };

  const getCategoryColor = (category: string): string => {
    const colors: { [key: string]: string } = {
      'Tech': COLORS.blue,
      'Research': COLORS.purple,
      'Personal Growth': COLORS.green,
      'Entrepreneurship': COLORS.orange,
      'Mental Health': COLORS.accent,
    };
    return colors[category] || COLORS.accent;
  };

  return (
    <Animated.View entering={FadeInUp.delay(delay).springify()} style={animatedStyle}>
      <TouchableOpacity onPress={handlePress} style={globalStyles.animatedCard}>
        <View style={globalStyles.cardContent}>
          <View style={globalStyles.cardHeader}>
            <View style={[globalStyles.badge, { backgroundColor: getCategoryColor(post.category) }]}>
              <ThemedText style={[globalStyles.badgeText, { color: COLORS.white }]}>{post.category}</ThemedText>
            </View>
            <ThemedText style={[globalStyles.badgeText, { color: COLORS.text }]}>{post.readTime} read</ThemedText>
          </View>

          <ThemedText style={globalStyles.cardTitle}>{post.title}</ThemedText>
          <ThemedText style={globalStyles.cardDescription}>{post.excerpt}</ThemedText>
          
          <View style={globalStyles.tagContainer}>
            {post.tags.slice(0, 3).map((tag, index) => (
              <View key={index} style={[globalStyles.badge, { backgroundColor: `${COLORS.text}20` }]}>
                <ThemedText style={[globalStyles.badgeText, { color: COLORS.textLight }]}>#{tag}</ThemedText>
              </View>
            ))}
          </View>

          <View style={[globalStyles.cardHeader, { marginTop: 16, marginBottom: 0 }]}>
            <ThemedText style={[globalStyles.badgeText, { color: COLORS.text }]}>{post.publishDate}</ThemedText>
            <ThemedText style={[globalStyles.buttonText, { color: COLORS.accent }]}>Read →</ThemedText>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

// Main Blog Component
export default function BlogScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample blog posts data
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Building BITS Pawn Shop: From Idea to 3.5K Users',
      excerpt: 'The journey of creating a campus resale platform and scaling it across multiple BITS campuses.',
      content: 'Full blog content here...',
      category: 'Entrepreneurship',
      readTime: '8 min',
      publishDate: 'Jan 15, 2025',
      tags: ['startup', 'react', 'django', 'scaling'],
      featured: true,
    },
    {
      id: '2',
      title: 'Applying ML to Chemistry: Electrocatalyst Discovery',
      excerpt: 'How machine learning is revolutionizing the way we discover and design new catalysts.',
      content: 'Full blog content here...',
      category: 'Research',
      readTime: '12 min',
      publishDate: 'Jan 10, 2025',
      tags: ['machine-learning', 'chemistry', 'research', 'python'],
    },
    {
      id: '3',
      title: 'Mental Health in Tech: Breaking the Silence',
      excerpt: 'Why we need to talk more openly about mental health challenges in the tech industry.',
      content: 'Full blog content here...',
      category: 'Mental Health',
      readTime: '6 min',
      publishDate: 'Jan 8, 2025',
      tags: ['mental-health', 'tech-culture', 'wellness'],
    },
    {
      id: '4',
      title: 'React Native vs Flutter: A Developer\'s Perspective',
      excerpt: 'Comparing two popular cross-platform frameworks from real-world development experience.',
      content: 'Full blog content here...',
      category: 'Tech',
      readTime: '10 min',
      publishDate: 'Jan 5, 2025',
      tags: ['react-native', 'flutter', 'mobile-dev', 'comparison'],
    },
    {
      id: '5',
      title: 'The Art of Algorithmic Trading: Lessons Learned',
      excerpt: 'Key insights and strategies from building automated trading systems.',
      content: 'Full blog content here...',
      category: 'Tech',
      readTime: '15 min',
      publishDate: 'Jan 2, 2025',
      tags: ['trading', 'algorithms', 'python', 'finance'],
    },
    {
      id: '6',
      title: 'From Chemistry Lab to Code: My Dual Degree Journey',
      excerpt: 'How studying both Chemistry and Computer Science shaped my unique perspective on problem-solving.',
      content: 'Full blog content here...',
      category: 'Personal Growth',
      readTime: '7 min',
      publishDate: 'Dec 28, 2024',
      tags: ['education', 'bits-pilani', 'dual-degree', 'journey'],
    },
  ];

  const categories = ['All', 'Tech', 'Research', 'Personal Growth', 'Entrepreneurship', 'Mental Health'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const handlePostPress = (post: BlogPost) => {
    Alert.alert(post.title, 'Blog post would open here');
  };

  return (
    <ScrollView style={globalStyles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Animated.View entering={FadeInUp.springify()} style={globalStyles.header}>
        <ThemedText style={globalStyles.headerTitle}>Blog</ThemedText>
        <ThemedText style={globalStyles.headerSubtitle}>
          Thoughts on tech, research, and personal growth
        </ThemedText>
      </Animated.View>

      {/* Search Bar */}
      <Animated.View entering={FadeInUp.delay(200).springify()} style={[globalStyles.card, { marginBottom: 24, position: 'relative' }]}>
        <TextInput
          style={[globalStyles.cardText, { paddingRight: 50, color: COLORS.white }]}
          placeholder="Search posts..."
          placeholderTextColor={COLORS.text}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <View style={[globalStyles.iconContainer, { position: 'absolute', right: 24, top: 24 }]}>
          <ThemedText style={{ fontSize: 16 }}>🔍</ThemedText>
        </View>
      </Animated.View>

      {/* Categories */}
      <View style={globalStyles.section}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={[globalStyles.tagContainer, { paddingHorizontal: 24 }]}>
            {categories.map((category, index) => (
              <CategoryChip
                key={category}
                category={category}
                isActive={selectedCategory === category}
                onPress={() => setSelectedCategory(category)}
                delay={400 + index * 50}
              />
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Featured Post */}
      {featuredPost && selectedCategory === 'All' && (
        <View style={globalStyles.section}>
          <FeaturedBlogCard
            post={featuredPost}
            onPress={() => handlePostPress(featuredPost)}
            delay={600}
          />
        </View>
      )}

      {/* Blog Posts Grid */}
      <View style={globalStyles.section}>
        <Animated.View entering={FadeInUp.delay(800).springify()}>
          <ThemedText style={globalStyles.sectionTitle}>
            {selectedCategory === 'All' ? 'Latest Posts' : `${selectedCategory} Posts`}
          </ThemedText>
        </Animated.View>
        
        {regularPosts.length > 0 ? (
          <View style={globalStyles.cardsGrid}>
            {regularPosts.map((post, index) => (
              <BlogCard
                key={post.id}
                post={post}
                onPress={() => handlePostPress(post)}
                delay={1000 + index * 100}
              />
            ))}
          </View>
        ) : (
          <Animated.View entering={FadeInUp.delay(1000).springify()} style={globalStyles.footerContent}>
            <ThemedText style={globalStyles.footerEmoji}>📝</ThemedText>
            <ThemedText style={globalStyles.cardTitle}>No posts found</ThemedText>
            <ThemedText style={globalStyles.footerText}>
              Try adjusting your search or category filter
            </ThemedText>
          </Animated.View>
        )}
      </View>

      {/* Newsletter Signup */}
      <Animated.View entering={FadeInUp.delay(1200).springify()} style={globalStyles.ctaSection}>
        <View style={globalStyles.ctaContent}>
          <ThemedText style={globalStyles.ctaEmoji}>📬</ThemedText>
          <ThemedText style={globalStyles.ctaTitle}>Stay Updated</ThemedText>
          <ThemedText style={globalStyles.ctaText}>
            Get notified when I publish new posts about tech, research, and personal growth
          </ThemedText>
          <TouchableOpacity 
            style={globalStyles.ctaButton}
            onPress={() => Alert.alert('Newsletter', 'Newsletter signup coming soon!')}
          >
            <ThemedText style={globalStyles.ctaButtonText}>Subscribe</ThemedText>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Footer */}
      <View style={globalStyles.footer}>
        <View style={globalStyles.footerContent}>
          <ThemedText style={globalStyles.footerEmoji}>✍️</ThemedText>
          <ThemedText style={globalStyles.footerText}>
            "Sharing knowledge is the best way to learn" ✨
          </ThemedText>
        </View>
      </View>
      {/* Extra space so content can scroll behind the tab bar */}
      <View style={{ height: 100 }} />
    </ScrollView>
  );
}
