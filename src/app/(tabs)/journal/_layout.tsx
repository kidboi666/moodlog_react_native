import { Stack } from 'expo-router';
import { useTheme } from 'tamagui';

export default function JournalLayout() {
  const theme = useTheme();

  return (
    <Stack>
      <Stack.Screen
        name="[journalId]"
        options={{
          headerShown: false,
          contentStyle: {
            backgroundColor: theme.background.val,
          },
          gestureEnabled: true,
        }}
      />
    </Stack>
  );
}
