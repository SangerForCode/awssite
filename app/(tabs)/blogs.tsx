import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  RefreshControl,
} from 'react-native';
import axios from 'axios';
import Animated, {
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useFocusEffect } from '@react-navigation/native';
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
};

const FIREBASE_URL =
  'https://aws-site-personal-default-rtdb.firebaseio.com/blogs.json';

export default function Blogs() {
  const [blogs, setBlogs]   = useState<Blog[]>([]);
  const [loading, setLoad]  = useState(true);
  const [pulling, setPull]  = useState(false);
  const router = useRouter();

  /* -------- FETCH - ONLY FIREBASE DATA -------- */
  const fetchBlogs = async () => {
    try {
      const res = await axios.get(FIREBASE_URL);
      
      // FIXED: Only show blogs that actually exist in Firebase
      if (res.data && Object.keys(res.data).length > 0) {
        const list: Blog[] = Object.keys(res.data).map(id => ({
          id,
          ...res.data[id],
        }));
        
        /* newest first by createdAt then publishDate */
        list.sort(
          (a, b) =>
            new Date(b.createdAt || b.publishDate).getTime() -
            new Date(a.createdAt || a.publishDate).getTime()
        );
        setBlogs(list);
      } else {
        // If Firebase is empty or null, show empty array
        setBlogs([]);
      }
    } catch (error) {
      console.log('Error fetching blogs:', error);
      Alert.alert('Error', 'Could not load blogs');
      setBlogs([]); // Set empty on error
    } finally {
      setLoad(false);
      setPull(false);
    }
  };

  useEffect(() => { fetchBlogs(); }, []);

  /* auto-refresh when coming back from AddBlog */
  useFocusEffect(
    useCallback(() => { fetchBlogs(); }, [])
  );

  const onRefresh = () => {
    setPull(true);
    fetchBlogs();
  };

  /* navigate to writer screen */
  const toWriter = () => router.push('/addblogs');

  /* -------- UI -------- */
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={globalStyles.container}
        contentContainerStyle={{ paddingBottom: 120 /* keeps above tab */ }}
        refreshControl={
          <RefreshControl
            refreshing={pulling}
            onRefresh={onRefresh}
            tintColor={COLORS.accent}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={globalStyles.header}>
          <ThemedText style={globalStyles.headerTitle}>Blog</ThemedText>
          <ThemedText style={globalStyles.headerSubtitle}>
            Community-powered thoughts & stories
          </ThemedText>
        </View>

        {loading ? (
          <ThemedText style={[globalStyles.cardText, { textAlign: 'center' }]}>
            Loading…
          </ThemedText>
        ) : blogs.length > 0 ? (
          blogs.map((post, i) => (
            <BlogCard key={post.id} post={post} delay={200 + i * 70} />
          ))
        ) : (
          // Show empty state when no blogs
          <View style={globalStyles.card}>
            <ThemedText style={[globalStyles.cardTitle, { textAlign: 'center' }]}>
              No blogs yet
            </ThemedText>
            <ThemedText style={[globalStyles.cardText, { textAlign: 'center' }]}>
              Be the first to write a blog!
            </ThemedText>
          </View>
        )}
      </ScrollView>

      {/* Floating "Write" FAB with gentle pulse */}
      <FloatingFab onPress={toWriter} />
    </View>
  );
}

/* ---------- Single card ---------- */
function BlogCard({ post, delay }: { post: Blog; delay: number }) {
  const [open, setOpen] = useState(false);
  const scale = useSharedValue(1);
  const style = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const press = () => {
    scale.value = withSpring(0.95, {}, () => (scale.value = withSpring(1)));
    setOpen(!open);
  };

  return (
    <Animated.View entering={FadeInUp.delay(delay).springify()} style={style}>
      <TouchableOpacity onPress={press} style={globalStyles.animatedCard}>
        <View style={globalStyles.cardContent}>
          <ThemedText style={globalStyles.cardTitle}>{post.title}</ThemedText>
          <ThemedText
            style={[
              globalStyles.badgeText,
              { color: COLORS.accent, marginBottom: 6 },
            ]}
          >
            {post.authorName} • {post.publishDate}
          </ThemedText>

          <ThemedText style={globalStyles.cardDescription}>
            {open ? post.content : post.excerpt}
          </ThemedText>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

/* ---------- Floating Action Button ---------- */
function FloatingFab({ onPress }: { onPress: () => void }) {
  /* pulse animation */
  const pulse = useSharedValue(1);
  pulse.value = withRepeat(
    withTiming(1.08, { duration: 800, easing: Easing.inOut(Easing.ease) }),
    -1,
    true
  );
  const style = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

  return (
    <Animated.View style={[styles.fab, style]}>
      <TouchableOpacity style={{ flex: 1 }} onPress={onPress}>
        <View style={styles.center}>
          <ThemedText style={styles.fabIcon}>✍️</ThemedText>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 100, // distance from bottom tab
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.accent,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 },
  },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  fabIcon: { fontSize: 24, color: COLORS.white },
});
