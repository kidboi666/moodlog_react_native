import { Button, Text, XStack, YStack } from 'tamagui';
import { FileQuestion, Plus } from '@tamagui/lucide-icons';
import {
  ENTER_STYLE,
  ENTER_STYLE_KEY,
  PRESS_STYLE,
  PRESS_STYLE_KEY,
} from '@/constants/styles';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';
import { ISODateString } from '@/types/dtos/date';
import { CalendarUtils } from 'react-native-calendars';
import { useToastController } from '@tamagui/toast';

interface Props {
  date: ISODateString;
}

export const EmptyJournal = ({ date }: Props) => {
  const { t } = useTranslation();
  const toast = useToastController();
  const isToday = CalendarUtils.getCalendarDateString(new Date()) === date;

  return (
    <YStack
      key={date}
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
      {isToday ? (
        <>
          <Text fontWeight="800" fontSize="$9" text="center">
            {t('common.fallback.today')} ✏️
          </Text>
          <Button
            unstyled
            animation="quick"
            animateOnly={PRESS_STYLE_KEY}
            bg="$gray12"
            p="$4"
            rounded="$4"
            color="$gray1"
            icon={<Plus size="$1" />}
            onPress={() => router.push('/(tabs)/write/mood_select')}
            pressStyle={PRESS_STYLE}
          />
        </>
      ) : (
        <XStack items="center">
          <Text fontWeight="800" fontSize="$8">
            {t('common.fallback.empty')}
          </Text>
          <Button
            unstyled
            animation="quick"
            animateOnly={PRESS_STYLE_KEY}
            p="$4"
            rounded="$4"
            icon={<FileQuestion size="$1" />}
            pressStyle={PRESS_STYLE}
            onPress={() => toast.show('일기는 당일에만 작성할 수 있습니다.')}
          />
        </XStack>
      )}
    </YStack>
  );
};
