import { Button, Text, YStack } from 'tamagui';
import { Plus } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';

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
      enterStyle={{
        scale: 0.85,
        opacity: 0,
      }}
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
        pressStyle={{
          scale: 0.9,
          opacity: 0.5,
        }}
      />
    </YStack>
  );
};
