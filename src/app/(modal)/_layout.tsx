import { Stack } from 'expo-router';
import { WriteHeader } from '@/components/headers/WriteHeader';
import JournalHeader from '@/components/headers/JournalHeader';
import { useTheme } from 'tamagui';

export default function ModalLayout() {
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        presentation: 'card',
        animation: 'default',
        gestureEnabled: true,
        gestureDirection: 'horizontal',
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
