import { Stack } from 'expo-router';
import { AboutMe } from '@/components/AboutMe';

export default function AboutScreen() {
  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'About Me',
          headerStyle: {
            backgroundColor: 'transparent',
          },
        }} 
      />
      <AboutMe />
    </>
  );
}
