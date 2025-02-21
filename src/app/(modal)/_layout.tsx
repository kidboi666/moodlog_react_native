import { Stack } from 'expo-router';
import { WriteHeader } from '@/components/headers/WriteHeader';
import JournalHeader from '@/components/headers/JournalHeader';

export default function ModalLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        presentation: 'card',
        animation: 'default',
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}
    >
      <Stack.Screen
        name="write"
        options={{
          header: () => <WriteHeader />,
        }}
      />
      <Stack.Screen
        name="[journalId]/index"
        options={{
          header: ({ route }) => <JournalHeader route={route} />,
        }}
      />
    </Stack>
  );
}
