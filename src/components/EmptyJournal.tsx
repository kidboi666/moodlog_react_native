import { Button, Text, YStack } from 'tamagui';
import { Plus } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { ENTER_STYLE, PRESS_STYLE } from '@/constants/styles';

export const EmptyJournal = () => {
  const router = useRouter();
  return (
    <YStack
      animation="quick"
      py="$6"
      px="$4"
      justify="center"
      items="center"
      bg="$gray5"
      rounded="$8"
      gap="$4"
      enterStyle={ENTER_STYLE}
    >
      <Text fontWeight="800" fontSize="$9" text="center">
        Your story is waiting to be told.
      </Text>
      <Button
        unstyled
        animation="quick"
        bg="$gray12"
        py="$3"
        px="$4"
        rounded="$4"
        color="$gray1"
        icon={<Plus size="$1" />}
        onPress={() => router.push('/(modal)/write')}
        pressStyle={PRESS_STYLE}
      />
    </YStack>
  );
};
