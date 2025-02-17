import '../../tamagui-web.css';
import { Stack } from 'expo-router';
import { RootProvider } from '@/providers/RootProvider';
import { useFonts } from 'expo-font';
import React, { useEffect } from 'react';
import { StatusBar } from '@/components/StatusBar';
import * as NavigationBar from 'expo-navigation-bar';
import { useThemeContext } from '@/store/hooks/useThemeContext';
import { Platform } from 'react-native';
import { useTheme } from 'tamagui';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { CurrentToast } from '@/components/CurrentToast';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { WriteHeader } from '@/components/headers/WriteHeader';
import JournalHeader from '@/components/headers/JournalHeader';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Floating } from '@/components/Floating';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(drawer)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

export default function RootLayout() {
  const [fontLoaded, fontError] = useFonts({
    'Pretendard-Bold': require('../../public/fonts/Pretendard-Bold.ttf'),
    'Pretendard-Medium': require('../../public/fonts/Pretendard-Medium.ttf'),
    'Pretendard-Regular': require('../../public/fonts/Pretendard-Regular.ttf'),
    'Pretendard-SemiBold': require('../../public/fonts/Pretendard-SemiBold.ttf'),
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
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: theme.background.val }}
    >
      <BottomSheetModalProvider>
        <ThemeProvider
          value={currentTheme === 'dark' ? DarkTheme : DefaultTheme}
        >
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
                animation: 'default',
                gestureEnabled: true,
                gestureDirection: 'horizontal',
              }}
            />
            <Stack.Screen
              name="(modal)/[journalId]/index"
              options={{
                headerShown: true,
                header: ({ route }) => <JournalHeader route={route} />,
                presentation: 'card',
                animation: 'default',
                gestureEnabled: true,
                gestureDirection: 'horizontal',
              }}
            />
            <Stack.Screen name="+not-found" />
          </Stack>
          <CurrentToast />
          <Floating />
        </ThemeProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
