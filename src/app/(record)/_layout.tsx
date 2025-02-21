import { Stack } from 'expo-router';
import { RecordHeader } from '@/components/headers/RecordHeader';
import { useTheme } from 'tamagui';

export default function RecordLayout() {
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
        name="index"
        options={{
          header: ({ navigation }) => <RecordHeader navigation={navigation} />,
        }}
      />
    </Stack>
  );
}
