import { Platform, StatusBar as RNStatusBar } from 'react-native';
import { useAppTheme } from '@/store/hooks/useAppTheme';
import { useEffect } from 'react';
import * as NavigationBar from 'expo-navigation-bar';
import { useTheme } from 'tamagui';

export const StatusBar = () => {
  const { resolvedTheme } = useAppTheme();
  const theme = useTheme();

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setButtonStyleAsync(
        resolvedTheme === 'dark' ? 'light' : 'dark',
      );
    }
  }, [resolvedTheme, theme.background.val]);
  return (
    <RNStatusBar
      backgroundColor="transparent"
      translucent
      barStyle={resolvedTheme === 'dark' ? 'light-content' : 'dark-content'}
    />
  );
};
