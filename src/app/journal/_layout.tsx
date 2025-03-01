import JournalHeader from '@/components/layouts/headers/JournalHeader';
import { Stack } from 'expo-router';
import { useTheme } from 'tamagui';

export default function JournalLayout() {
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        contentStyle: {
          backgroundColor: theme.background.val,
        },
        animation: 'fade',
      }}
    >
      <Stack.Screen
        name="write"
        options={{
          header: () => <JournalHeader />,
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
