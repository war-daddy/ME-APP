export const colors = {
  background: '#FFFFFF',
  surface: '#F5F5F7',
  primary: '#3478F6',
  text: '#111111',
  secondaryText: '#777777',
  border: '#E5E5EA',
  error: '#D92D20',
  white: '#FFFFFF',
};

const lightTheme = {
  ...colors,
  backgroundElement: colors.surface,
  backgroundSelected: '#E8F0FF',
  textSecondary: colors.secondaryText,
};

const darkTheme = {
  background: '#111111',
  backgroundElement: '#222226',
  backgroundSelected: '#263A5E',
  primary: '#78A9FF',
  text: '#FFFFFF',
  textSecondary: '#B0B0B8',
  secondaryText: '#B0B0B8',
  surface: '#222226',
  border: '#3A3A40',
  error: '#FF6B62',
  white: '#FFFFFF',
};

export const Colors = { light: lightTheme, dark: darkTheme };
export type ThemeColor = keyof typeof lightTheme;
export const Fonts = { regular: 'System', medium: 'System', semiBold: 'System', bold: 'System' };

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const Spacing = spacing;
export const BottomTabInset = 72;
export const MaxContentWidth = 720;

export const radius = {
  sm: 8,
  md: 14,
  lg: 20,
  pill: 999,
};
