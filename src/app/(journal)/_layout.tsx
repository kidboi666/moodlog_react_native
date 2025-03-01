import { Stack } from 'expo-router';
import JournalHeader from '@/components/layouts/headers/JournalHeader';
import { useTheme } from 'tamagui';

export default function JournalLayout() {
  const theme = useTheme();
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
