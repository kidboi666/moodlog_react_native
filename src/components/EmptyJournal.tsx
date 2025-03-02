import { Button, Text, YStack } from 'tamagui';
import { Plus } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import {
  ENTER_STYLE,
  ENTER_STYLE_KEY,
  PRESS_STYLE,
  PRESS_STYLE_KEY,
} from '@/constants/styles';
import { useTranslation } from 'react-i18next';

export const EmptyJournal = () => {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <YStack
      animation="quick"
      animateOnly={ENTER_STYLE_KEY}
      p="$6"
      justify="center"
      items="center"
      bg="$gray5"
      rounded="$8"
      gap="$4"
      enterStyle={ENTER_STYLE}
    >
      <Text fontWeight="800" fontSize="$9" text="center">
        {t('common.fallback.journal')} ✏️
      </Text>
      <Button
        unstyled
        animation="quick"
        animateOnly={PRESS_STYLE_KEY}
        bg="$gray12"
        py="$3"
        px="$4"
        rounded="$4"
        color="$gray1"
        icon={<Plus size="$1" />}
        onPress={() => router.push('/(tabs)/write')}
        pressStyle={PRESS_STYLE}
      />
    </YStack>
  );
};
