import '../../tamagui-web.css';
import { SplashScreen, Stack } from 'expo-router';
import { RootProvider } from '@/providers/RootProvider';
import { useFonts } from 'expo-font';
import React, { useEffect } from 'react';
import { StatusBar } from '@/components/StatusBar';
import * as NavigationBar from 'expo-navigation-bar';
import { useThemeContext } from '@/store/hooks/useThemeContext';
import { Platform } from 'react-native';
import { useTheme } from 'tamagui';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { CurrentToast } from '@/components/CurrentToast';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { WriteHeader } from '@/components/WriteHeader';
import JournalHeader from '@/components/JournalHeader';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(drawer)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontLoaded, fontError] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  useEffect(() => {
    if (fontLoaded || fontError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync();
    }
  }, [fontLoaded, fontError]);

  if (!fontLoaded && !fontError) {
    return null;
  }
  return (
    <RootProvider>
      <RootLayoutNav />
    </RootProvider>
  );
}

function RootLayoutNav() {
  const { currentTheme } = useThemeContext();
  const theme = useTheme();

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync(theme.background.val);
      NavigationBar.setButtonStyleAsync(
        currentTheme === 'dark' ? 'light' : 'dark',
      );
    }
  }, [currentTheme]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={currentTheme === 'dark' ? DarkTheme : DefaultTheme}>
        <StatusBar />
        <Stack
          screenOptions={{
            contentStyle: {
              backgroundColor: theme.background.val,
            },
          }}
        >
          <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(modal)/write"
            options={{
              headerShown: true,
              header: () => <WriteHeader />,
              presentation: 'card',
              animation: 'slide_from_bottom',
              gestureEnabled: true,
              gestureDirection: 'vertical',
            }}
          />
          <Stack.Screen
            name="(modal)/[journalId]"
            options={{
              headerShown: true,
              header: ({ route }) => <JournalHeader route={route} />,
              presentation: 'modal',
              animation: 'slide_from_bottom',
              gestureEnabled: true,
              gestureDirection: 'vertical',
            }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
        <CurrentToast />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
