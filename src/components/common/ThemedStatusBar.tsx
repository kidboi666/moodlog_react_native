import { useTheme } from '@/store/context/useTheme';
import React from 'react';
import { StatusBar } from 'react-native';

export const ThemedStatusBar = () => {
  const { theme } = useTheme();

  return (
    <StatusBar
      backgroundColor="$backgroundPrimary"
      barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
      translucent={true}
    />
  );
};

ThemedStatusBar.displayName = 'ThemedStatusBar';
