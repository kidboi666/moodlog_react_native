import { Stack } from 'expo-router';
import JournalHeader from '@/components/layouts/headers/JournalHeader';
import { useTheme } from 'tamagui';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';

export default function JournalLayout() {
  const theme = useTheme();

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync(theme.background.val);
    }
  }, [theme.background.val]);
  return (
    <Stack>
      <Stack.Screen
        name="[journalId]"
        options={{
          headerShown: true,
          header: () => <JournalHeader />,
          contentStyle: {
            backgroundColor: theme.background.val,
          },
        }}
      />
    </Stack>
  );
}
