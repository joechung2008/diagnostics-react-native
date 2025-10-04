import React from 'react';
import { View, ViewProps } from 'react-native';

// Web-compatible SafeAreaView that just renders a View
export const SafeAreaView: React.FC<ViewProps> = props => {
  return <View {...props} />;
};

// SafeAreaProvider that just renders its children
export const SafeAreaProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <>{children}</>;
};

// Mock insets for web
export const useSafeAreaInsets = () => ({
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
});

// Mock frame for web
export const useSafeAreaFrame = () => ({
  x: 0,
  y: 0,
  width: typeof window !== 'undefined' ? window.innerWidth : 0,
  height: typeof window !== 'undefined' ? window.innerHeight : 0,
});
