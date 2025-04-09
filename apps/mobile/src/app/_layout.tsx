import * as NavigationBar from 'expo-navigation-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { useEffect, useMemo } from 'react';
import { Platform } from 'react-native';
import { useTheme } from 'tamagui';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';

import { BottomSheet } from '@/core/components/modals/BottomSheet';
import { StatusBar } from '@/core/components/shared/StatusBar';
import { RootProvider } from '@/core/providers/RootProvider';
import { useAuth } from '@/core/store/auth.store';
import { useAppTheme } from '@/core/store/theme.store';

import '@/lib/i18n/index.js';

import '../../tamagui-web.css';

const FONTS = {
  'Pretendard-Bold': require('assets/fonts/Pretendard-Bold.ttf'),
  'Pretendard-Medium': require('assets/fonts/Pretendard-Medium.ttf'),
  'Pretendard-Regular': require('assets/fonts/Pretendard-Regular.ttf'),
  'Pretendard-SemiBold': require('assets/fonts/Pretendard-SemiBold.ttf'),
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontLoaded, fontError] = useFonts(FONTS);
  const isAuthenticated = useAuth(state => state.isAuthenticated);

  // Handle splash screen
  useEffect(() => {
    async function hideSplashScreen() {
      try {
        if (fontLoaded || fontError) {
          await SplashScreen.hideAsync();
        }
      } catch (err) {
        console.warn('Error hiding splash screen:', err);
      }
    }
    hideSplashScreen();
  }, [fontLoaded, fontError]);

  // Wait for fonts to load
  if (!fontLoaded && !fontError) {
    return null;
  }

  return (
    <RootProvider>
      <RootLayoutNav isAuthenticated={isAuthenticated} />
    </RootProvider>
  );
}

type RootLayoutNavProps = {
  isAuthenticated: boolean;
};

const RootLayoutNav = ({ isAuthenticated }: RootLayoutNavProps) => {
  const { resolvedTheme } = useAppTheme();
  const theme = useTheme();

  // Background style based on theme
  const backgroundStyle = useMemo(
    () => ({
      flex: 1,
      backgroundColor: theme.background.val,
    }),
    [theme.background.val, resolvedTheme],
  );

  // Screen options for all routes
  const screenOptions = useMemo(
    () => ({
      headerShown: false,
      contentStyle: backgroundStyle,
      headerStyle: backgroundStyle,
    }),
    [backgroundStyle],
  );

  // Handle Android navigation bar
  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setButtonStyleAsync(
        resolvedTheme === 'dark' ? 'light' : 'dark',
      );
    }
  }, [resolvedTheme]);

  return (
    <GestureHandlerRootView style={backgroundStyle}>
      <ThemeProvider
        value={resolvedTheme === 'dark' ? DarkTheme : DefaultTheme}
      >
        <StatusBar resolvedTheme={resolvedTheme} />
        {isAuthenticated ? (
          <Stack screenOptions={screenOptions}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="+not-found" />
          </Stack>
        ) : (
          <Stack screenOptions={screenOptions}>
            <Stack.Screen name="(onboarding)" />
            <Stack.Screen name="login" />
          </Stack>
        )}
        <BottomSheet />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};
