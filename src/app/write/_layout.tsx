import { Stack } from 'expo-router';
import { useTheme } from 'tamagui';
import { WriteHeader } from '@/components/layouts/headers/WriteHeader';

export default function WriteLayout() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        header: () => <WriteHeader />,
        contentStyle: {
          backgroundColor: theme.background.val,
        },
        gestureEnabled: false,
      }}
    >
      <Stack.Screen name="mood_select" />
      <Stack.Screen name="journal_write" />
    </Stack>
  );
}
