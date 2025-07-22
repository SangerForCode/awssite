import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colorScheme === 'dark' ? '#ffffff' : '#000000',
        tabBarInactiveTintColor: colorScheme === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarShowLabel: false,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            bottom: 34,
            left: 16,
            right: 16,
            height: 84,
            backgroundColor: 'transparent', // Make completely transparent
            borderRadius: 28,
            borderTopWidth: 0,
            shadowColor: colorScheme === 'dark' ? '#000' : '#000',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: colorScheme === 'dark' ? 0.4 : 0.1,
            shadowRadius: 20,
            elevation: 0, // Remove elevation for transparency
            paddingBottom: 20,
            paddingTop: 12,
            paddingHorizontal: 12,
            borderWidth: 0.5, // Thinner border
            borderColor: colorScheme === 'dark' 
              ? 'rgba(255,255,255,0.1)' 
              : 'rgba(0,0,0,0.05)',
            overflow: 'visible', // Allow content to show through
          },
          android: {
            position: 'absolute',
            bottom: 20,
            left: 16,
            right: 16,
            height: 72,
            backgroundColor: 'transparent', // Make completely transparent
            borderRadius: 28,
            borderTopWidth: 0,
            elevation: 0, // Remove elevation for transparency
            shadowColor: 'transparent', // Remove shadow for transparency
            paddingBottom: 8,
            paddingTop: 8,
            paddingHorizontal: 12,
            borderWidth: 0.5,
            borderColor: colorScheme === 'dark' 
              ? 'rgba(255,255,255,0.08)' 
              : 'rgba(0,0,0,0.03)',
            overflow: 'visible',
          },
          default: {
            position: 'absolute',
            bottom: 20,
            left: 16,
            right: 16,
            height: 72,
            backgroundColor: 'transparent',
            borderRadius: 28,
            borderTopWidth: 0,
            elevation: 0,
            shadowColor: 'transparent',
            paddingBottom: 8,
            paddingTop: 8,
            paddingHorizontal: 12,
            borderWidth: 0.5,
            borderColor: colorScheme === 'dark' 
              ? 'rgba(255,255,255,0.08)' 
              : 'rgba(0,0,0,0.03)',
            overflow: 'visible',
          },
        }),
        tabBarItemStyle: {
          flex: 1,
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 20,
          marginHorizontal: 2,
          backgroundColor: 'transparent', // Ensure tab items are transparent
        },
        tabBarBackground: () => (
          <BlurView
            intensity={Platform.OS === 'ios' ? 40 : 30} // Reduced intensity for more transparency
            tint={colorScheme === 'dark' ? 'dark' : 'light'}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              borderRadius: 28,
              backgroundColor: colorScheme === 'dark' 
                ? 'rgba(0,0,0,0.15)' // Very light background overlay
                : 'rgba(255,255,255,0.25)',
              overflow: 'hidden',
            }}
          />
        ),
        animation: 'shift',
        animationEnabled: true,
        tabBarHideOnKeyboard: true,
      }}>
      
      <Tabs.Screen
        name="index"
        options={{
          title: 'About Me',
          tabBarIcon: ({ color, focused }) => (
            <View style={{
              width: 52,
              height: 52,
              backgroundColor: focused 
                ? (colorScheme === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.06)')
                : 'rgba(255,255,255,0.05)', // Slight background even when unfocused
              borderRadius: 16,
              justifyContent: 'center',
              alignItems: 'center',
              transform: [{ scale: focused ? 1.05 : 1 }],
              borderWidth: focused ? 0.5 : 0,
              borderColor: colorScheme === 'dark' 
                ? 'rgba(255,255,255,0.2)' 
                : 'rgba(0,0,0,0.1)',
            }}>
              <Ionicons 
                size={focused ? 28 : 26} 
                name={focused ? "home" : "home-outline"} 
                color={focused 
                  ? (colorScheme === 'dark' ? '#ffffff' : '#000000')
                  : color
                }
                style={{
                  opacity: focused ? 1 : 0.7,
                }}
              />
            </View>
          ),
        }}
      />
      
      <Tabs.Screen
        name="explore"
        options={{
          title: 'My History',
          tabBarIcon: ({ color, focused }) => (
            <View style={{
              width: 52,
              height: 52,
              backgroundColor: focused 
                ? (colorScheme === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.06)')
                : 'rgba(255,255,255,0.05)',
              borderRadius: 16,
              justifyContent: 'center',
              alignItems: 'center',
              transform: [{ scale: focused ? 1.05 : 1 }],
              borderWidth: focused ? 0.5 : 0,
              borderColor: colorScheme === 'dark' 
                ? 'rgba(255,255,255,0.2)' 
                : 'rgba(0,0,0,0.1)',
            }}>
              <Ionicons 
                size={focused ? 28 : 26} 
                name={focused ? "time" : "time-outline"} 
                color={focused 
                  ? (colorScheme === 'dark' ? '#ffffff' : '#000000')
                  : color
                }
                style={{
                  opacity: focused ? 1 : 0.7,
                }}
              />
            </View>
          ),
        }}
      />
      
      <Tabs.Screen
        name="blogs"
        options={{
          title: 'Blogs',
          tabBarIcon: ({ color, focused }) => (
            <View style={{
              width: 52,
              height: 52,
              backgroundColor: focused 
                ? (colorScheme === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.06)')
                : 'rgba(255,255,255,0.05)',
              borderRadius: 16,
              justifyContent: 'center',
              alignItems: 'center',
              transform: [{ scale: focused ? 1.05 : 1 }],
              borderWidth: focused ? 0.5 : 0,
              borderColor: colorScheme === 'dark' 
                ? 'rgba(255,255,255,0.2)' 
                : 'rgba(0,0,0,0.1)',
            }}>
              <Ionicons 
                size={focused ? 28 : 26} 
                name={focused ? "chatbubbles" : "chatbubbles-outline"} 
                color={focused 
                  ? (colorScheme === 'dark' ? '#ffffff' : '#000000')
                  : color
                }
                style={{
                  opacity: focused ? 1 : 0.7,
                }}
              />
            </View>
          ),
        }}
      />
      
      <Tabs.Screen
        name="portfolio"
        options={{
          title: 'Portfolio',
          tabBarIcon: ({ color, focused }) => (
            <View style={{
              width: 52,
              height: 52,
              backgroundColor: focused 
                ? (colorScheme === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.06)')
                : 'rgba(255,255,255,0.05)',
              borderRadius: 16,
              justifyContent: 'center',
              alignItems: 'center',
              transform: [{ scale: focused ? 1.05 : 1 }],
              borderWidth: focused ? 0.5 : 0,
              borderColor: colorScheme === 'dark' 
                ? 'rgba(255,255,255,0.2)' 
                : 'rgba(0,0,0,0.1)',
            }}>
              <Ionicons 
                size={focused ? 28 : 26} 
                name={focused ? "briefcase" : "briefcase-outline"} 
                color={focused 
                  ? (colorScheme === 'dark' ? '#ffffff' : '#000000')
                  : color
                }
                style={{
                  opacity: focused ? 1 : 0.7,
                }}
              />
            </View>
          ),
        }}
      />
      
      <Tabs.Screen
        name="contact"
        options={{
          title: 'Contact',
          tabBarIcon: ({ color, focused }) => (
            <View style={{
              width: 52,
              height: 52,
              backgroundColor: focused 
                ? (colorScheme === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.06)')
                : 'rgba(255,255,255,0.05)',
              borderRadius: 16,
              justifyContent: 'center',
              alignItems: 'center',
              transform: [{ scale: focused ? 1.05 : 1 }],
              borderWidth: focused ? 0.5 : 0,
              borderColor: colorScheme === 'dark' 
                ? 'rgba(255,255,255,0.2)' 
                : 'rgba(0,0,0,0.1)',
            }}>
              <Ionicons 
                size={focused ? 28 : 26} 
                name={focused ? "mail" : "mail-outline"} 
                color={focused 
                  ? (colorScheme === 'dark' ? '#ffffff' : '#000000')
                  : color
                }
                style={{
                  opacity: focused ? 1 : 0.7,
                }}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
