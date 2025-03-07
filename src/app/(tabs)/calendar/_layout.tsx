import { Stack } from 'expo-router';
import { useTheme } from 'tamagui';
import { CalendarHeader } from '@/components/layouts/headers/CalendarHeader';

export default function CalendarLayout() {
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        header: () => <CalendarHeader />,
        contentStyle: {
          backgroundColor: theme.background.val,
        },
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
