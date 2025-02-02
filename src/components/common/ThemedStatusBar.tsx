import { useTheme } from '@/store/context/useTheme';
import React from 'react';
import { StatusBar } from 'react-native';

export const ThemedStatusBar = () => {
  const { barStyle } = useTheme();

  return <StatusBar barStyle={barStyle} />;
};
