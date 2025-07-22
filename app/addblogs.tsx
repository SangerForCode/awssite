import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import axios from 'axios';
import { ThemedText } from '@/components/ThemedText';
import { globalStyles, COLORS } from '@/styles/globalStyles';
import { useRouter } from 'expo-router';

const FIREBASE_URL =
  'https://aws-site-personal-default-rtdb.firebaseio.com/blogs.json';

export default function AddBlogScreen() {
  const [title,   setTitle]   = useState('');
  const [content, setContent] = useState('');
  const [author,  setAuthor]  = useState('');
  const [loading, setLoad]    = useState(false);
  const [posted,  setPosted]  = useState(false); // NEW: track posted state
  const router = useRouter();

  const submit = async () => {
    setLoad(true);
    try {
      const blog = {
        title: title || 'Untitled',
        content: content || 'No content',
        authorName: author || 'Anonymous',
        publishDate: new Date().toLocaleDateString(),
        createdAt: new Date().toISOString(),
        category: 'General',
        tags: [],
        readTime: '1 min',
        excerpt: (content || 'No content').substring(0, 100) + '...',
      };

      await axios.post(FIREBASE_URL, blog);

      // Instead of alert, just show success state
      setPosted(true);
      
      /* reset form fields */
      setTitle(''); 
      setContent(''); 
      setAuthor('');
    } catch {
      Alert.alert('Error', 'Failed to post blog');
    } finally {
      setLoad(false);
    }
  };

  const goToBlogPage = () => {
    // Navigate to blog page (assuming it's a tab)
    router.push('/(tabs)/blogs'); // or just router.back() if coming from blogs
  };

  return (
    <ScrollView
      style={globalStyles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={globalStyles.header}>
        <ThemedText style={globalStyles.headerTitle}>Add Blog</ThemedText>
      </View>

      <View style={globalStyles.card}>
        <ThemedText style={globalStyles.cardTitle}>Author</ThemedText>
        <TextInput
          style={inputStyle}
          placeholder="Your name"
          placeholderTextColor={COLORS.text}
          value={author}
          onChangeText={setAuthor}
          editable={!posted} // Disable when posted
        />

        <ThemedText style={globalStyles.cardTitle}>Title</ThemedText>
        <TextInput
          style={inputStyle}
          placeholder="Blog title"
          placeholderTextColor={COLORS.text}
          value={title}
          onChangeText={setTitle}
          editable={!posted} // Disable when posted
        />

        <ThemedText style={globalStyles.cardTitle}>Content</ThemedText>
        <TextInput
          style={[inputStyle, { height: 150 }]}
          placeholder="Write your blog..."
          placeholderTextColor={COLORS.text}
          multiline
          value={content}
          onChangeText={setContent}
          editable={!posted} // Disable when posted
        />

        {/* Conditional Button */}
        {!posted ? (
          <TouchableOpacity
            onPress={submit}
            disabled={loading}
            style={[
              globalStyles.button,
              { backgroundColor: loading ? COLORS.gray : COLORS.accent, marginTop: 10 },
            ]}
          >
            <ThemedText style={globalStyles.buttonText}>
              {loading ? 'Posting…' : 'Post Blog'}
            </ThemedText>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={goToBlogPage}
            style={[
              globalStyles.button,
              { backgroundColor: COLORS.green, marginTop: 10 },
            ]}
          >
            <ThemedText style={globalStyles.buttonText}>
              ✅ Blog Posted! Go Check It Out
            </ThemedText>
          </TouchableOpacity>
        )}

        {/* Reset Button (only show after posting) */}
        {posted && (
          <TouchableOpacity
            onPress={() => setPosted(false)}
            style={[
              globalStyles.button,
              { backgroundColor: COLORS.gray, marginTop: 10 },
            ]}
          >
            <ThemedText style={globalStyles.buttonText}>
              Write Another Blog
            </ThemedText>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const inputStyle = {
  ...globalStyles.cardText,
  backgroundColor: COLORS.dark,
  padding: 12,
  borderRadius: 8,
  color: COLORS.white,
  marginBottom: 20,
};
