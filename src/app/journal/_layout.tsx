import JournalHeader from '@/components/layouts/headers/JournalHeader';
import { Stack } from 'expo-router';
import { useTheme } from 'tamagui';
import { WriteHeader } from '@/components/layouts/headers/WriteHeader';

export default function JournalLayout() {
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        contentStyle: {
          backgroundColor: theme.background.val,
        },
      }}
    >
      <Stack.Screen
        name="write"
        options={{
          header: () => <WriteHeader />,
        }}
      />
      <Stack.Screen
        name="[journalId]"
        options={{
          header: () => <JournalHeader />,
        }}
      />
    </Stack>
  );
}
