// Modern, soft color scheme with no pure white
const palette = {
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  indigo: {
    400: '#818cf8',
    500: '#6366f1',
    600: '#4f46e5',
    700: '#4338ca',
  },
  teal: {
    400: '#2dd4bf',
    500: '#14b8a6',
    600: '#0d9488',
  },
  rose: {
    400: '#fb7185',
    500: '#f43f5e',
    600: '#e11d48',
  },
  amber: {
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
  },
};

export type ColorScheme = typeof Colors.light;

export const Colors = {
  light: {
    text: palette.slate[900],
    textSecondary: palette.slate[600],
    background: palette.slate[100],
    backgroundAlt: palette.slate[200],
    tint: palette.indigo[600],
    icon: palette.indigo[500],
    tabIconDefault: palette.slate[400],
    tabIconSelected: palette.indigo[600],
    accent: palette.teal[500],
    secondary: palette.slate[200],
    success: palette.teal[500],
    warning: palette.amber[500],
    card: palette.slate[50],
    cardAlt: palette.slate[100],
    border: palette.slate[200],
    hover: palette.indigo[700],
  },
  dark: {
    text: palette.slate[100],
    textSecondary: palette.slate[300],
    background: palette.slate[900],
    backgroundAlt: palette.slate[800],
    tint: palette.indigo[500],
    icon: palette.indigo[400],
    tabIconDefault: palette.slate[500],
    tabIconSelected: palette.indigo[400],
    accent: palette.teal[400],
    secondary: palette.slate[800],
    success: palette.teal[400],
    warning: palette.amber[400],
    card: palette.slate[800],
    cardAlt: palette.slate[700],
    border: palette.slate[700],
    hover: palette.indigo[600],
  },
} as const;
