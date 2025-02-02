import { useTheme } from '@/store/context/useTheme';
import React from 'react';
import { StatusBar } from 'react-native';

export const ThemedStatusBar = () => {
  const { isDark, colors } = useTheme();

  return (
    <StatusBar
      backgroundColor={colors.background.primary}
      barStyle={isDark ? 'light-content' : 'dark-content'}
      translucent={true}
    />
  );
};
