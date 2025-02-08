import '../../tamagui-web.css';

import { useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { RootProvider } from '@/providers/RootProvider';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontLoaded, fontError] = useFonts({
    'goorm-sans-regular': require('../assets/fonts/goorm-sans-regular.ttf'),
    'goorm-sans-medium': require('../assets/fonts/goorm-sans-medium.ttf'),
    'goorm-sans-bold': require('../assets/fonts/goorm-sans-bold.ttf'),
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
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </RootProvider>
  );
}
