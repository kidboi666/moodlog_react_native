import { RecordHeader } from '@/components/layouts/headers/RecordHeader';
import { useTheme } from 'tamagui';
import { Stack } from 'expo-router';

export default function RecordLayout() {
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        header: ({ navigation }) => <RecordHeader navigation={navigation} />,
        contentStyle: {
          backgroundColor: theme.background.val,
        },
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
