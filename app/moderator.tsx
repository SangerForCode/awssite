import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import Animated, {
  FadeInUp,
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { ThemedText } from '@/components/ThemedText';
import { globalStyles, COLORS } from '@/styles/globalStyles';
import { useRouter } from 'expo-router';

type Blog = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  authorName: string;
  publishDate: string;
  createdAt?: string;
  readTime?: string;
  category?: string;
};

const FIREBASE_URL = 'https://aws-site-personal-default-rtdb.firebaseio.com/blogs';

export default function ModeratorPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const router = useRouter();

  // Fetch all blogs
  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${FIREBASE_URL}.json`);
      
      if (response.data && Object.keys(response.data).length > 0) {
        const blogsList: Blog[] = Object.keys(response.data).map(id => ({
          id,
          ...response.data[id],
        }));
        
        // Sort by newest first
        blogsList.sort(
          (a, b) =>
            new Date(b.createdAt || b.publishDate).getTime() -
            new Date(a.createdAt || a.publishDate).getTime()
        );
        setBlogs(blogsList);
      } else {
        setBlogs([]);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      Alert.alert('Error', 'Failed to fetch blogs');
      setBlogs([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Delete specific blog
  const deleteBlog = async (blogId: string, blogTitle: string) => {
    Alert.alert(
      'Confirm Delete',
      `Are you sure you want to delete "${blogTitle}"?\n\nThis action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => performDelete(blogId),
        },
      ]
    );
  };

  const performDelete = async (blogId: string) => {
    setDeleting(blogId);
    try {
      // Delete request to Firebase
      await axios.delete(`${FIREBASE_URL}/${blogId}.json`);
      
      // Remove from local state
      setBlogs(prev => prev.filter(blog => blog.id !== blogId));
      
      Alert.alert('Success', 'Blog deleted successfully!');
    } catch (error) {
      console.error('Error deleting blog:', error);
      Alert.alert('Error', 'Failed to delete blog. Please try again.');
    } finally {
      setDeleting(null);
    }
  };

  // Delete ALL blogs
  const deleteAllBlogs = async () => {
    Alert.alert(
      '⚠️ DELETE ALL BLOGS',
      'This will permanently delete ALL blogs from the database!\n\nThis action CANNOT be undone!',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'DELETE ALL',
          style: 'destructive',
          onPress: () => performDeleteAll(),
        },
      ]
    );
  };

  const performDeleteAll = async () => {
    setLoading(true);
    try {
      // Delete entire blogs collection
      await axios.delete(`${FIREBASE_URL}.json`);
      
      setBlogs([]);
      Alert.alert('Success', 'All blogs have been deleted!');
    } catch (error) {
      console.error('Error deleting all blogs:', error);
      Alert.alert('Error', 'Failed to delete all blogs');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchBlogs();
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={globalStyles.container}
        contentContainerStyle={{ paddingBottom: 40 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.accent} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View entering={FadeInUp.springify()} style={globalStyles.header}>
          <ThemedText style={globalStyles.headerTitle}>Moderator Panel</ThemedText>
          <ThemedText style={globalStyles.headerSubtitle}>
            Manage and moderate all blog posts
          </ThemedText>
        </Animated.View>

        {/* Stats */}
        <Animated.View entering={FadeInDown.delay(200).springify()} style={globalStyles.statsContainer}>
          <View style={globalStyles.statItem}>
            <ThemedText style={globalStyles.statValue}>{blogs.length}</ThemedText>
            <ThemedText style={globalStyles.statLabel}>Total Blogs</ThemedText>
          </View>
          <View style={globalStyles.statItem}>
            <ThemedText style={globalStyles.statValue}>
              {blogs.filter(blog => blog.createdAt).length}
            </ThemedText>
            <ThemedText style={globalStyles.statLabel}>User Posts</ThemedText>
          </View>
          <View style={globalStyles.statItem}>
            <ThemedText style={globalStyles.statValue}>
              {deleting ? '🗑️' : '✅'}
            </ThemedText>
            <ThemedText style={globalStyles.statLabel}>Status</ThemedText>
          </View>
        </Animated.View>

        {/* Danger Zone */}
        <Animated.View entering={FadeInUp.delay(400).springify()} style={styles.dangerZone}>
          <ThemedText style={styles.dangerTitle}>⚠️ Danger Zone</ThemedText>
          <TouchableOpacity onPress={deleteAllBlogs} style={styles.deleteAllButton}>
            <ThemedText style={styles.deleteAllText}>🗑️ Delete All Blogs</ThemedText>
          </TouchableOpacity>
        </Animated.View>

        {/* Blog List */}
        <View style={globalStyles.section}>
          <Animated.View entering={FadeInUp.delay(600).springify()}>
            <ThemedText style={globalStyles.sectionTitle}>All Blogs</ThemedText>
          </Animated.View>

          {loading ? (
            <ThemedText style={[globalStyles.cardText, { textAlign: 'center' }]}>
              Loading blogs...
            </ThemedText>
          ) : blogs.length > 0 ? (
            blogs.map((blog, index) => (
              <BlogModeratorCard
                key={blog.id}
                blog={blog}
                onDelete={() => deleteBlog(blog.id, blog.title)}
                isDeleting={deleting === blog.id}
                delay={800 + index * 100}
              />
            ))
          ) : (
            <Animated.View entering={FadeInUp.delay(800).springify()} style={globalStyles.card}>
              <ThemedText style={[globalStyles.cardTitle, { textAlign: 'center' }]}>
                No blogs found
              </ThemedText>
              <ThemedText style={[globalStyles.cardText, { textAlign: 'center' }]}>
                All blogs have been deleted or none exist yet.
              </ThemedText>
            </Animated.View>
          )}
        </View>

        {/* Back Button */}
        <Animated.View entering={FadeInUp.delay(1000).springify()} style={globalStyles.section}>
          <TouchableOpacity onPress={() => router.back()} style={globalStyles.button}>
            <ThemedText style={globalStyles.buttonText}>← Back to App</ThemedText>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

// Blog Card for Moderator
interface BlogModeratorCardProps {
  blog: Blog;
  onDelete: () => void;
  isDeleting: boolean;
  delay: number;
}

const BlogModeratorCard: React.FC<BlogModeratorCardProps> = ({
  blog,
  onDelete,
  isDeleting,
  delay,
}) => {
  const [expanded, setExpanded] = useState(false);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSpring(0.98, {}, () => (scale.value = withSpring(1)));
    setExpanded(!expanded);
  };

  return (
    <Animated.View entering={FadeInUp.delay(delay).springify()} style={animatedStyle}>
      <View style={globalStyles.animatedCard}>
        <View style={globalStyles.cardContent}>
          {/* Header with Delete Button */}
          <View style={styles.cardHeader}>
            <View style={{ flex: 1 }}>
              <ThemedText style={globalStyles.cardTitle}>{blog.title}</ThemedText>
              <ThemedText style={[globalStyles.badgeText, { color: COLORS.accent }]}>
                By: {blog.authorName} • {blog.publishDate}
              </ThemedText>
            </View>
            <TouchableOpacity
              onPress={onDelete}
              disabled={isDeleting}
              style={[styles.deleteButton, isDeleting && styles.deletingButton]}
            >
              <ThemedText style={styles.deleteButtonText}>
                {isDeleting ? '⏳' : '🗑️'}
              </ThemedText>
            </TouchableOpacity>
          </View>

          {/* Content Preview */}
          <TouchableOpacity onPress={handlePress}>
            <ThemedText style={globalStyles.cardDescription}>
              {expanded ? blog.content : blog.excerpt}
            </ThemedText>
            <ThemedText style={[globalStyles.badgeText, { color: COLORS.text, marginTop: 8 }]}>
              {expanded ? 'Tap to collapse' : 'Tap to expand'} • ID: {blog.id.substring(0, 8)}...
            </ThemedText>
          </TouchableOpacity>

          {/* Blog Info */}
          <View style={styles.blogInfo}>
            <View style={[globalStyles.badge, { backgroundColor: COLORS.gray }]}>
              <ThemedText style={[globalStyles.badgeText, { color: COLORS.textLight }]}>
                {blog.category || 'General'}
              </ThemedText>
            </View>
            <View style={[globalStyles.badge, { backgroundColor: COLORS.gray }]}>
              <ThemedText style={[globalStyles.badgeText, { color: COLORS.textLight }]}>
                {blog.readTime || '1 min'}
              </ThemedText>
            </View>
            {blog.createdAt && (
              <View style={[globalStyles.badge, { backgroundColor: COLORS.green }]}>
                <ThemedText style={[globalStyles.badgeText, { color: COLORS.white }]}>
                  User Post
                </ThemedText>
              </View>
            )}
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  dangerZone: {
    marginHorizontal: 24,
    marginBottom: 24,
    backgroundColor: '#FF000015',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#FF000030',
  },
  dangerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF4444',
    marginBottom: 12,
    textAlign: 'center',
  },
  deleteAllButton: {
    backgroundColor: '#FF4444',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteAllText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  deleteButton: {
    backgroundColor: '#FF444420',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  deletingButton: {
    backgroundColor: COLORS.gray,
  },
  deleteButtonText: {
    fontSize: 18,
  },
  blogInfo: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 8,
  },
});
