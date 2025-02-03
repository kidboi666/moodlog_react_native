import { useTheme } from '@/store/context/useTheme';
import { getToken } from '@tamagui/core';
import React from 'react';
import { StatusBar } from 'react-native';

export const ThemedStatusBar = () => {
  const { theme } = useTheme();

  return (
    <StatusBar
      backgroundColor={
        theme === 'dark'
          ? getToken('$color.grey900')
          : getToken('$color.grey100')
      }
      barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
      translucent={true}
    />
  );
};

ThemedStatusBar.displayName = 'ThemedStatusBar';
