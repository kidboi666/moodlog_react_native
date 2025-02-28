import '../../tamagui-web.css';
import { Stack } from 'expo-router';
import { RootProvider } from '@/providers/RootProvider';
import { useFonts } from 'expo-font';
import { useEffect, useMemo } from 'react';
import { StatusBar } from '@/components/StatusBar';
import { useAppTheme } from '@/store/hooks/useAppTheme';
import { StyleSheet } from 'react-native';
import { useTheme } from 'tamagui';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { CurrentToast } from '@/components/CurrentToast';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import '../i18n';
import { useUser } from '@/store/hooks/useUser';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(drawer)',
};

const FONTS = {
  'Pretendard-Bold': require('../../public/fonts/Pretendard-Bold.ttf'),
  'Pretendard-Medium': require('../../public/fonts/Pretendard-Medium.ttf'),
  'Pretendard-Regular': require('../../public/fonts/Pretendard-Regular.ttf'),
  'Pretendard-SemiBold': require('../../public/fonts/Pretendard-SemiBold.ttf'),
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontLoaded, fontError] = useFonts(FONTS);

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
  const { resolvedTheme } = useAppTheme();
  const theme = useTheme();
  const { isLoading } = useUser();

  const backgroundStyle = useMemo(
    () => ({
      backgroundColor: theme.background.val,
    }),
    [theme.background.val, resolvedTheme],
  );

  const screenOptions = useMemo(
    () => ({
      headerShown: false,
      contentStyle: backgroundStyle,
      headerStyle: backgroundStyle,
    }),
    [backgroundStyle],
  );

  if (isLoading) return null;

  return (
    <GestureHandlerRootView style={[styles.container, backgroundStyle]}>
      <BottomSheetModalProvider>
        <ThemeProvider
          value={resolvedTheme === 'dark' ? DarkTheme : DefaultTheme}
        >
          <StatusBar />
          <Stack screenOptions={screenOptions}>
            <Stack.Screen name="(drawer)" />
            <Stack.Screen name="(onboarding)" />
            <Stack.Screen name="(modal)" />
            <Stack.Screen name="(record)" />
            <Stack.Screen name="+not-found" />
          </Stack>
          <CurrentToast />
        </ThemeProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
