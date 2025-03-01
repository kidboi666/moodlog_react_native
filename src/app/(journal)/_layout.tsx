import { WriteHeader } from '@/components/layouts/headers/WriteHeader';
import JournalHeader from '@/components/layouts/headers/JournalHeader';
import { useTheme } from 'tamagui';
import { JsStack } from '@/components/layouts/JsStack';

export default function ModalLayout() {
  const theme = useTheme();
  return (
    <JsStack
      screenOptions={{
        headerShown: true,
        cardStyle: {
          backgroundColor: theme.background.val,
        },
      }}
    >
      <JsStack.Screen
        name="write"
        options={{
          header: () => <WriteHeader />,
        }}
      />
      <JsStack.Screen
        name="[journalId]"
        options={{
          header: () => <JournalHeader />,
        }}
      />
    </JsStack>
  );
}
