import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

type Blog = {
  id: string;
  title: string;
  content: string;
  authorName: string;
};

const FIREBASE_URL = 'https://aws-site-personal-default-rtdb.firebaseio.com/blogs';

export default function BlogManager() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [editBlog, setEditBlog] = useState<Blog | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  // Fetch blogs from Firebase
  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${FIREBASE_URL}.json`);
      if (response.data) {
        const blogsList = Object.keys(response.data).map(id => ({
          id,
          ...response.data[id],
        }));
        setBlogs(blogsList);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Delete blog
  const deleteBlog = async (id: string, title: string) => {
    Alert.alert(
      'Delete Blog',
      `Delete "${title}"?`,
      [
        { text: 'Cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await axios.delete(`${FIREBASE_URL}/${id}.json`);
              setBlogs(prev => prev.filter(blog => blog.id !== id));
              Alert.alert('Success', 'Blog deleted');
            } catch (error) {
              Alert.alert('Error', 'Delete failed');
            }
          },
        },
      ]
    );
  };

  // Open edit modal
  const openEdit = (blog: Blog) => {
    setEditBlog(blog);
    setTitle(blog.title);
    setContent(blog.content);
    setAuthor(blog.authorName);
  };

  // Save changes
  const saveChanges = async () => {
    if (!editBlog) return;

    try {
      const updatedBlog = {
        ...editBlog,
        title,
        content,
        authorName: author,
      };

      await axios.put(`${FIREBASE_URL}/${editBlog.id}.json`, updatedBlog);
      
      setBlogs(prev => prev.map(blog => 
        blog.id === editBlog.id ? updatedBlog : blog
      ));
      
      closeEdit();
      Alert.alert('Success', 'Blog updated');
    } catch (error) {
      Alert.alert('Error', 'Update failed');
    }
  };

  // Close edit modal
  const closeEdit = () => {
    setEditBlog(null);
    setTitle('');
    setContent('');
    setAuthor('');
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const renderBlog = ({ item }: { item: Blog }) => (
    <View style={styles.blogCard}>
      <Text style={styles.blogTitle}>{item.title}</Text>
      <Text style={styles.blogAuthor}>By: {item.authorName}</Text>
      <Text style={styles.blogContent} numberOfLines={2}>
        {item.content}
      </Text>
      
      <View style={styles.actions}>
        <TouchableOpacity 
          style={[styles.button, styles.editButton]} 
          onPress={() => openEdit(item)}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.deleteButton]} 
          onPress={() => deleteBlog(item.id, item.title)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
        <Text>Loading blogs...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Blog Manager</Text>
      
      <FlatList
        data={blogs}
        renderItem={renderBlog}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />

      {/* Edit Modal */}
      <Modal visible={!!editBlog} animationType="slide">
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Edit Blog</Text>
          
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Blog title"
          />
          
          <Text style={styles.label}>Author</Text>
          <TextInput
            style={styles.input}
            value={author}
            onChangeText={setAuthor}
            placeholder="Author name"
          />
          
          <Text style={styles.label}>Content</Text>
          <TextInput
            style={[styles.input, styles.contentInput]}
            value={content}
            onChangeText={setContent}
            placeholder="Blog content"
            multiline
          />
          
          <View style={styles.modalActions}>
            <TouchableOpacity style={styles.cancelButton} onPress={closeEdit}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blogCard: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  blogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  blogAuthor: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  blogContent: {
    fontSize: 14,
    color: '#444',
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    flex: 1,
    marginHorizontal: 4,
  },
  editButton: {
    backgroundColor: '#4CAF50',
  },
  deleteButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
  },
  modal: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  contentInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#757575',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    flex: 1,
    marginRight: 8,
  },
  saveButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    flex: 1,
    marginLeft: 8,
  },
});
