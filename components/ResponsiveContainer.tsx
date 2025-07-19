import { StyleSheet, ViewProps, useWindowDimensions } from 'react-native';
import { ThemedView } from './ThemedView';

interface ResponsiveContainerProps extends ViewProps {
  maxWidth?: number;
}

export function ResponsiveContainer({ children, style, maxWidth = 768, ...props }: ResponsiveContainerProps) {
  const { width } = useWindowDimensions();
  const shouldConstrainWidth = width > maxWidth;

  return (
    <ThemedView 
      style={[
        styles.container,
        shouldConstrainWidth && { maxWidth, alignSelf: 'center' },
        style
      ]} 
      {...props}
    >
      {children}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
});
