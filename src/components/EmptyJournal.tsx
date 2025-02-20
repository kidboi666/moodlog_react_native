import { Button, Text, YStack } from 'tamagui';
import { Plus } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { ENTER_STYLE, PRESS_STYLE } from '@/constants/styles';
import { useTranslation } from 'react-i18next';

export const EmptyJournal = () => {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <YStack
      animation="quick"
      p="$6"
      justify="center"
      items="center"
      bg="$gray5"
      rounded="$8"
      gap="$4"
      enterStyle={ENTER_STYLE}
    >
      <Text fontWeight="800" fontSize="$9" text="center">
        {t('fallback.journal')} ✏️
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
