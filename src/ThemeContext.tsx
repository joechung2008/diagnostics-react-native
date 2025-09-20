import React, { createContext, useContext, useEffect, useState } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';

export type ThemeType = 'light' | 'dark' | 'system';

export interface ThemeColors {
  // Background colors
  background: string;
  surface: string;
  surfaceSecondary: string;

  // Text colors
  text: string;
  textSecondary: string;
  textTertiary: string;

  // Border colors
  border: string;
  borderSecondary: string;

  // Interactive colors
  primary: string;
  primaryText: string;
  accent: string;

  // Status colors
  error: string;
  success: string;
  warning: string;

  // Table specific
  tableBorder: string;
  tableHeaderBg: string;
  tableRowBg: string;
  tableRowAltBg: string;
}

export const lightTheme: ThemeColors = {
  background: '#ffffff',
  surface: '#f8f9fa',
  surfaceSecondary: '#e9ecef',

  text: '#212529',
  textSecondary: '#6c757d',
  textTertiary: '#adb5bd',

  border: '#dee2e6',
  borderSecondary: '#e9ecef',

  primary: '#007bff',
  primaryText: '#ffffff',
  accent: '#28a745',

  error: '#dc3545',
  success: '#28a745',
  warning: '#ffc107',

  tableBorder: '#dee2e6',
  tableHeaderBg: '#f8f9fa',
  tableRowBg: '#ffffff',
  tableRowAltBg: '#f8f9fa',
};

export const darkTheme: ThemeColors = {
  background: '#121212',
  surface: '#1e1e1e',
  surfaceSecondary: '#2d2d2d',

  text: '#ffffff',
  textSecondary: '#b0b0b0',
  textTertiary: '#808080',

  border: '#404040',
  borderSecondary: '#333333',

  primary: '#0d6efd',
  primaryText: '#ffffff',
  accent: '#198754',

  error: '#dc3545',
  success: '#198754',
  warning: '#ffc107',

  tableBorder: '#404040',
  tableHeaderBg: '#2d2d2d',
  tableRowBg: '#1e1e1e',
  tableRowAltBg: '#252525',
};

export interface ThemeContextType {
  theme: ThemeType;
  colors: ThemeColors;
  setTheme: (theme: ThemeType) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<ThemeType>('system');
  const [systemTheme, setSystemTheme] = useState<ColorSchemeName>(
    Appearance.getColorScheme(),
  );

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemTheme(colorScheme);
    });

    return () => subscription?.remove();
  }, []);

  const isDark =
    theme === 'dark' || (theme === 'system' && systemTheme === 'dark');
  const colors = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, colors, setTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};
