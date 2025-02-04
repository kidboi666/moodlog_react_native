import { useThemeCtx } from '@/store/context/useThemeCtx';
import React from 'react';
import { StatusBar } from 'react-native';
import { styled } from 'tamagui';

const StyledStatusBar = styled(StatusBar, {
  bg: '$bgPrimary',
});

export const ThemedStatusBar = () => {
  const { theme } = useThemeCtx();

  return (
    <StatusBar
      backgroundColor="transparent"
      barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
      translucent
    />
  );
};

ThemedStatusBar.displayName = 'ThemedStatusBar';
