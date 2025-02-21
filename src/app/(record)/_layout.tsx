import { Stack } from 'expo-router';
import { RecordHeader } from '@/components/headers/RecordHeader';

export default function RecordLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
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
