import '../../tamagui-web.css';
import { Stack, useRouter } from 'expo-router';
import { RootProvider } from '@/providers/RootProvider';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { StatusBar } from '@/components/StatusBar';
import * as NavigationBar from 'expo-navigation-bar';
import { useAppTheme } from '@/store/hooks/useAppTheme';
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
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useUser } from '@/store/hooks/useUser';
import '../i18n';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(drawer)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontLoaded, fontError] = useFonts({
    'Pretendard-Bold': require('../../public/fonts/Pretendard-Bold.ttf'),
    'Pretendard-Medium': require('../../public/fonts/Pretendard-Medium.ttf'),
    'Pretendard-Regular': require('../../public/fonts/Pretendard-Regular.ttf'),
    'Pretendard-SemiBold': require('../../public/fonts/Pretendard-SemiBold.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      try {
        if (fontLoaded || fontError) {
          await new Promise(resolve => setTimeout(resolve, 100));
          await SplashScreen.hideAsync();
        }
      } catch (e) {
        console.warn(e);
      }
    }

    prepare();
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
  const { currentTheme, resolvedTheme } = useAppTheme();
  const theme = useTheme();
  const { isInitialUser, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync(theme.background.val);
      NavigationBar.setButtonStyleAsync(
        resolvedTheme === 'dark' ? 'light' : 'dark',
      );
    }
  }, [currentTheme]);

  useEffect(() => {
    if (isInitialUser) {
      router.replace('/(drawer)');
    } else {
      router.replace('/(onboarding)');
    }
  }, [isInitialUser]);

  if (isLoading) return null;

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
              headerShown: false,
              contentStyle: {
                backgroundColor: theme.background.val,
              },
              headerStyle: {
                backgroundColor: theme.background.val,
              },
            }}
          >
            <Stack.Screen name="(onboarding)" />
            <Stack.Screen name="(drawer)" />
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
