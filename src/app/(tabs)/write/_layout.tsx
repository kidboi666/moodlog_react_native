import { Stack } from 'expo-router';
import { useTheme } from 'tamagui';
import { Platform } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';

export default function WriteLayout() {
  const theme = useTheme();

  if (Platform.OS === 'android') {
    NavigationBar.setBackgroundColorAsync(theme.background.val);
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.background.val,
        },
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="mood_select" />
      <Stack.Screen name="journal_write" />
    </Stack>
  );
}
